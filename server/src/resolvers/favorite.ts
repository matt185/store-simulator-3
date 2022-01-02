import {MyContext} from "../utils/types";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Favorite} from "../entity/Favorite";
import {User} from "../entity/User";

@Resolver(Favorite)
export class FavoriteResolver {
  @Query(() => [Favorite])
  async favorites(): Promise<Favorite[]> {
    return await Favorite.find();
  }

  @Mutation(() => Boolean, {nullable: true})
  async addFavorites(
    @Arg("itemId") itemId: string,
    @Ctx() {req}: MyContext
  ): Promise<boolean | null> {
    if (!req.session.userId) {
      return null;
    }
    let user = await User.findOne({userId: req.session.userId!});
    console.log("req", req.session.userId, "user :", user);
    await Favorite.create({
      itemId: itemId,
      customerId: req.session.userId!,
      customer: user,
    }).save();
    return true;
  }
}
