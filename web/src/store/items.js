import graphqlClient from "../apollo";
import gql from "graphql-tag";
import isAuth from "../utils/isAuth";
export default {
  namespaced: true,
  state: () => ({
    items: [],
    userFavorite: [],
  }),
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    addItem(state, item) {
      item.home = false;
      item.popularity = 0;

      state.items = [...state.items, item];
    },
    setUserFavorites(state, items) {
      state.userFavorite = items.map(item => item.itemId);
    },
    addFavorite(state, id) {
      state.userFavorite = [...state.userFavorite, id];
    },
    removeFavorite(state, id) {
      let idx = state.userFavorite.indexOf(id);
      state.userFavorite.splice(idx, 1);
    },
  },
  actions: {
    async items({commit}) {
      let response = await graphqlClient.query({
        query: gql`
          query items {
            items {
              itemId
              itemPic
              itemName
              itemClass
              itemType
              itemBrand
              price
              quantity
              minQuantity
              popular
              home
            }
          }
        `,
      });
      let items = response.data.items;
      commit("setItems", items);
    },
    async setToHome({commit}, id) {
      await graphqlClient.mutate({
        mutation: gql`
          mutation setToHome($itemId: String!) {
            setToHome(itemId: $itemId)
          }
        `,
        variables: {
          itemId: id,
        },
      });
    },
    async addItem({commit}, newItem) {
      let response = await graphqlClient.mutate({
        mutation: gql`
          mutation addItem(
            $itemId: String!
            $itemName: String!
            $itemClass: String!
            $itemType: String!
            $itemBrand: String!
            $itemPic: String!
            $price: Float!
            $quantity: Int!
            $minQuantity: Int!
          ) {
            addItem(
              input: {
                itemId: $itemId
                itemName: $itemName
                itemClass: $itemClass
                itemType: $itemType
                itemBrand: $itemBrand
                itemPic: $itemPic
                price: $price
                quantity: $quantity
                minQuantity: $minQuantity
              }
            ) {
              itemId
              itemPic
              itemName
              itemType
              itemBrand
              price
              quantity
              minQuantity
              popular
              home
            }
          }
        `,
        variables: {
          itemId: newItem.itemId,
          itemName: newItem.itemName,
          itemClass: newItem.itemClass,
          itemType: newItem.itemType,
          itemBrand: newItem.itemBrand,
          itemPic: newItem.itemPic,
          price: newItem.price,
          quantity: newItem.quantity,
          minQuantity: newItem.minQuantity,
        },
      });
      commit("addItem", newItem);
    },
    async updateItem({commit}, updatedItem) {
      let response = await graphqlClient.mutate({
        mutation: gql`
          mutation updateItem(
            $itemId: String!
            $itemName: String!
            $itemClass: String!
            $itemType: String!
            $itemBrand: String!
            $itemPic: String!
            $price: Float!
            $quantity: Int!
            $minQuantity: Int!
          ) {
            updateItem(
              itemId: $itemId
              newValue: {
                itemId: $itemId
                itemName: $itemName
                itemClass: $itemClass
                itemType: $itemType
                itemBrand: $itemBrand
                itemPic: $itemPic
                price: $price
                quantity: $quantity
                minQuantity: $minQuantity
              }
            )
          }
        `,
        variables: {
          itemId: updatedItem.itemId,
          itemName: updatedItem.itemName,
          itemClass: updatedItem.itemClass,
          itemType: updatedItem.itemType,
          itemBrand: updatedItem.itemBrand,
          itemPic: updatedItem.itemPic,
          price: updatedItem.price,
          quantity: updatedItem.quantity,
          minQuantity: updatedItem.minQuantity,
        },
      });
    },
    async deleteItem({commit}, itemId) {
      await graphqlClient.mutate({
        mutation: gql`
          mutation deleteItem($itemId: String!) {
            deleteItem(itemId: $itemId)
          }
        `,
        variables: {
          itemId,
        },
      });
    },
    async userFavorites({commit}) {
      let response = await graphqlClient.query({
        query: gql`
          query userFavorites {
            userFavorites {
              itemId
            }
          }
        `,
      });
      let data = response.data.userFavorites;
      commit("setUserFavorites", data);
    },
    async addFavorite({commit}, itemId) {
      await graphqlClient.mutate({
        mutation: gql`
          mutation addFavorites($itemId: String!) {
            addFavorites(itemId: $itemId)
          }
        `,
        variables: {
          itemId,
        },
      });
      commit("addFavorite", itemId);
    },
    async removeFavorite({commit}, itemId) {
      await graphqlClient.mutate({
        mutation: gql`
          mutation removeFavorite($itemId: String!) {
            removeFavorite(itemId: $itemId)
          }
        `,
        variables: {
          itemId,
        },
      });
      commit("removeFavorite", itemId);
    },
  },
  getters: {},
};
