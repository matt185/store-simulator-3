import graphqlClient from "../apollo";
import gql from "graphql-tag";
import isAuth from "../utils/isAuth";
export default {
  namespaced: true,
  state: () => ({
    users: "",
    user: "",
    isLogged: false,
    auth: false,
  }),
  mutations: {
    setUser(store, data) {
      store.user = data;
      if (store.user.user) {
        store.isLogged = true;
        store.auth = isAuth(data.user.role);
      }
    },
    setLogout(store) {
      store.user = "";
      store.isLogged = false;
      store.auth = false;
    },
    setUsers(state, data) {
      state.users = data;
    },
    updateUser(state, user) {
      let index = state.users.map(e => e.userId).indexOf(user.userId);
      state.users.splice(index, 1, user);
    },
  },
  actions: {
    async login({commit}, input) {
      let response = await graphqlClient.mutate({
        mutation: gql`
          mutation login($usernameOrEmail: String!, $password: String!) {
            login(usernameOrEmail: $usernameOrEmail, password: $password) {
              user {
                username
                role
              }
              errors {
                field
                message
              }
            }
          }
        `,
        variables: {
          usernameOrEmail: input.username,
          password: input.password,
        },
      });
      const user = response.data.login;
      commit("setUser", user);
    },
    async logout({commit}) {
      await graphqlClient.mutate({
        mutation: gql`
          mutation logout {
            logout
          }
        `,
      });
      commit("setLogout");
      
    },
    async register({commit}, input) {
      let response = await graphqlClient.mutate({
        mutation: gql`
          mutation register(
            $username: String!
            $email: String!
            $password: String!
          ) {
            register(
              input: {username: $username, email: $email, password: $password}
            ) {
              user {
                username
                role
              }
              errors {
                field
                message
              }
            }
          }
        `,
        variables: {
          username: input.username,
          email: input.email,
          password: input.password,
        },
      });

      let data = response.data.register;
      commit("setUser", data);
    },
    async changePsw({commit}, input) {
      let response = await graphqlClient.mutate({
        mutation: gql`
          mutation changePassword($token: String!, $newPassword: String!) {
            changePassword(token: $token, newPassword: $newPassword) {
              user {
                username
                role
              }
              errors {
                field
                message
              }
            }
          }
        `,
        variables: {
          token: input.token,
          newPassword: input.form.password,
        },
      });
      let user = response.data.changePassword;
      commit("setUser", user);
    },
    async users({commit}) {
      let response = await graphqlClient.query({
        query: gql`
          query users {
            users {
              userId
              username
              email
              role
              phone
              address
            }
          }
        `,
      });
      let users = response.data.users;

      commit("setUsers", users);
    },
    async updateUserManager({commit}, newValue) {
      let response = await graphqlClient.mutate({
        mutation: gql`
          mutation updateUserManager($userId:String!,$username:String,$email:String,$address:String,$phone:String,$role:String ){
            updateUserManager(userId:$userId,newValue:{username:$username, email:$email,address:$address,phone:$phone,role:$role}){
              userId
              username
              email
              role
              phone
              address
            }
          }
        `,
        variables: {
          userId: newValue.userId,
          username: newValue.username,
          email: newValue.email,
          address: newValue.address,
          phone: newValue.phone,
          role: newValue.role,
        },
      });
      let user = response.data.updateUserManager;
      commit("updateUser", user);
    },
  },
  getters: {
    users: state=>state.users

  },
};
