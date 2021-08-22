import { Field, InputType } from "type-graphql";



@InputType()
export class RegisterInput {
    @Field()
    username: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field({nullable:true})
    phone: string;
    @Field({nullable:true})
    address: string;
    @Field({nullable:true})
    role: string;
}

@InputType()
export class UpdateUserInput {
  @Field({nullable: true})
  username: string;
  @Field({nullable: true})
  email: string;
  @Field({nullable: true})
  password: string;
  @Field({nullable: true})
  phone: string;
  @Field({nullable: true})
  address: string;
}

@InputType()
export class UpdateUserInputManager {
  @Field({nullable: true})
  username: string;
  @Field({nullable: true})
  email: string;
  @Field({nullable: true})
  password: string;
  @Field({nullable: true})
  phone: string;
  @Field({nullable: true})
  address: string;
  @Field({nullable: true})
  role: string;
}



