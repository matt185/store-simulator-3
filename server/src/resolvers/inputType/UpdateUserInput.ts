import {Field, InputType} from "type-graphql";

@InputType()
export class RegisterInput {
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
