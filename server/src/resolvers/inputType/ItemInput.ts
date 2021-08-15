import {Field, InputType, Int} from "type-graphql";

@InputType()
export class ItemInput {
  @Field()
  itemId: string;
  @Field()
  itemName: string;
  @Field()
  itemClass: string;
  @Field()
  itemType: string;
  @Field()
  itemBrand: string;
  @Field()
  itemPic: string;
  @Field()
  price: number;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  minQuantity: number;
}
