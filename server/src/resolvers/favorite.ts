import {MyContext} from "../utils/types";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Favorite} from "../entity/Favorite";

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
    await Favorite.create({
      itemId: itemId,
      userId: req.session.userId!,
    }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async removeFavorite(
    @Arg("itemId") itemId: string,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) {
      return false;
    }
    try {
      await Favorite.delete({itemId, userId: req.session.userId!});
    } catch (error) {
      if (error) return false;
    }
    return true;
  }

  @Query(() => [Favorite], {nullable: true})
  async userFavorites(@Ctx() {req}: MyContext): Promise<Favorite[] | null> {
    if (!req.session.userId) {
      return null;
    }
    return await Favorite.find({userId: req.session.userId!});
  }
}
