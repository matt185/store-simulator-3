import {User} from "../entity/User";
// import {Item} from "../entity/Item";
import {Arg, Ctx, Field, ObjectType, Mutation, Query, Resolver} from "type-graphql";
import {MyContext} from "../utils/types";
import {partialAuth, FORGET_PASSWORD_PREFIX} from "../utils/constants";
import {
  RegisterInput,
  UpdateUserInput,
  UpdateUserInputManager,
} from "./inputType/RegisterInput"; 
import { validateRegister } from "../utils/validationRegister";
import argon2 from "argon2";
import { v4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";
import {isAuthMed} from "../utils/isAuth";
import { getConnection } from "typeorm";

// ANCHOR Create the input type for response
 
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];
  @Field(() => User, {nullable: true})
  user?: User;
}


//ANCHOR create the resolvers


@Resolver(User)
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hello";
  }

  @Query(() => Boolean)
  isLogged(@Ctx() {req}: MyContext): Boolean {
    if (!req.session.userId) {
      return false;
    }
    return true;
  }

  @Query(() => [User], {nullable: true})
  async users(@Ctx() {req}: MyContext): Promise<User[] | null> {
    if (req.session.userId) {
      let user = await User.findOne({where: {userId: req.session.userId}});
      let isAuth = partialAuth.includes(user!.role);
      if (isAuth) {
        return await User.find({
          order: {
            id: "DESC",
          },
        });
      }
    }
    return null;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input", () => RegisterInput) input: RegisterInput,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(input);
    if (errors) {
      return {errors};
    }

    const hashedPsw = await argon2.hash(input.password);

    const userId = v4();
    try {
      await User.create({
        userId: userId,
        username: input.username,
        email: input.email,
        password: hashedPsw,
        role: "customer",
        phone: input.phone,
        address: input.address,
      }).save();
    } catch (err) {
      if (err.code === "23505" || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already exist",
            },
          ],
        };
      }
    }
    const user = await User.findOne({username: input.username});
    req.session.userId = user!.userId;
    return {user: user};
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? {where: {email: usernameOrEmail}}
        : {where: {username: usernameOrEmail}}
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "user doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.userId;
    return {user};
  }
  
  @Mutation(() => Boolean)
  async logout(@Ctx() {req, res}: MyContext): Promise<Boolean> {
    return new Promise(resolve => {
      req.session.destroy(err => {
        res.clearCookie(process.env.COOKIE_NAME!);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() {req, res}: MyContext): Promise<boolean> {
    await User.delete({userId: req.session.userId});
    if (!req.session.userId) {
      return true;
    }

    new Promise(resolve => {
      req.session.destroy(err => {
        res.clearCookie(process.env.COOKIE_NAME!);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });

    return true;
  }

  @Mutation(() => Boolean)
  async deleteAccountManager(
    @Arg("userId") userId: string,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return true;
    }
    let user = await User.findOne({userId: req.session.userId!});
    if (!user) {
      return true;
    }

    let auth = isAuthMed(user!.role);

    if (!auth) {
      return true;
    }
    await User.delete({userId});

    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string, @Ctx() {redis}: MyContext) {
    const user = await User.findOne({email});

    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24
    );

    await sendEmail(
      email,
      `<a href="http://localhost:8080/change-password/${token}">reset password</a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() {redis, req}: MyContext
  ): Promise<UserResponse> {
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "invalid token",
          },
        ],
      };
    }

    const user = await User.findOne({where: {id: parseInt(userId)}});
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exist",
          },
        ],
      };
    }
    const hashedPsw = await argon2.hash(newPassword);

    user.password = hashedPsw;
    await User.save(user);
    req.session.userId = user.userId;
    await redis.del(key);
    return {user};
  }

  @Mutation(() => User, {nullable: true})
  async updateUser(
    @Arg("userId") userId: string,
    @Arg("newValue", () => UpdateUserInput) newValue: UpdateUserInput,
    @Ctx() {req}: MyContext
  ): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    // let user = await User.findOne({userId: req.session.userId!});

    // let auth = isAuthMed(user!.role);

    // if (!user) {
    //   return null;
    // }

    let userToUpdate = await User.findOne({userId});

    await User.update({userId: userToUpdate!.userId}, newValue);

    let updated = await User.findOne({userId});
    return updated!;
  }

  @Mutation(() => User, {nullable: true})
  async updateUserManager(
    @Arg("userId") userId: string,
    @Arg("newValue", () => UpdateUserInputManager)
    newValue: UpdateUserInputManager,
    @Ctx() {req}: MyContext
  ): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    let user = await User.findOne({userId: req.session.userId!});

    let auth = isAuthMed(user!.role);

    if (!auth) {
      return null;
    }

    let userToUpdate = await User.findOne({userId});

    await User.update({userId: userToUpdate!.userId}, newValue);

    let updated = await User.findOne({userId});
    return updated!;
  }

  @Query(() => User, {nullable: true})
  async me(@Ctx() {req}: MyContext): Promise< null> {
    if (!req.session.userId) {
      return null;
    }
    let user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("p")
    .innerJoinAndSelect("p.favorites", "i",'i.id=p."customerId"').getMany()
    console.log ("user",user)
    return null;
  }
}
