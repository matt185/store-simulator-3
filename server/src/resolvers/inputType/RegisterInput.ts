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



