import {MyContext} from "../utils/types";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Item} from "../entity/Item";
import {ItemInput} from "./inputType/ItemInput";
import {isAuthLite, isAuthMed} from "../utils/isAuth";
import {User} from "../entity/User";

@Resolver(Item)
export class ItemResolver {
  @Query(() => [Item], {nullable: true})
  async items(@Ctx() {req}: MyContext): Promise<Item[] | null> {
    if (!req.session.userId) {
      // REVIEW  make return the items to show in the home page before login
      return null;
    }
    return await Item.find({
      order: {
        id: "ASC",
      },
    });
  }

  @Mutation(() => Item, {nullable: true})
  async addItem(
    @Arg("input", () => ItemInput) input: ItemInput,
    @Ctx() {req}: MyContext
  ): Promise<Item | null> {
    if (!req.session.userId) {
      return null;
    }
    let user = await User.findOne({userId: req.session.userId!});

    let auth = isAuthLite(user!.role);

    if (!auth) {
      return null;
    }

    await Item.create({
      itemId: input.itemId,
      itemName: input.itemName,
      itemClass: input.itemClass,
      itemType: input.itemType,
      itemBrand: input.itemBrand,
      itemPic: input.itemPic,
      price: input.price,
      quantity: input.quantity,
      minQuantity: input.minQuantity,
    }).save();

    const item = await Item.findOne({itemId: input.itemId});
    return item!;
  }

  @Mutation(() => Boolean)
  async updateItem(
    @Arg("itemId") itemId: string,
    @Arg("newValue", () => ItemInput) newValue: ItemInput,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }
    let user = await User.findOne({userId: req.session.userId!});

    let auth = isAuthLite(user!.role);

    if (!auth) {
      return false;
    }
    let item = await Item.findOne({itemId});

    await Item.update({id: item!.id}, newValue);

    return true;
  }

  @Mutation(() => Boolean)
  async deleteItem(
    @Arg("itemId") itemId: string,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }
    let user = await User.findOne({userId: req.session.userId!});

    if (!user || !isAuthMed(user.role)) {
      return false;
    }
    await Item.delete({itemId});
    return true;
  }

  @Mutation(() => Boolean)
  async setToHome(
    @Arg("itemId") itemId: string,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }
    let item = await Item.findOne({itemId});

    if (!item) {
      return false;
    }

    item.home = !item.home;

    await Item.update({itemId}, item!);

    return true;
  }
}
