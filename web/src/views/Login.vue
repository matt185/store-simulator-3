<template>
  <div class="login">
    <b-card class="card mt-3" header="Login">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Username or Email"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            placeholder="Enter Username or email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            placeholder=" Enter Password"
            v-model="form.password"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-button type="submit" class="submit-btn" pill variant="secondary"
          >Submit</b-button
        >
        <b-button
          type="reset"
          class="reset-btn"
          pill
          variant="outline-secondary"
          >Reset</b-button
        >

        <div class="mt-3">
          <b-link  href="/register">Create new account</b-link>
        </div>
        <div class="mt-3">
          <b-link  href="/forgot-password">Forgot password</b-link>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      show: true,
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("users/login", this.form);
      this.$router.push("/");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.username = "";
      this.form.food = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vendors/bootstrap-vue/_custom.scss";

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.card {
  width: 50%;
  .card-header {
    background-color: $gray-800;
    color: white;
  }
  .btn-secondary {
    background-color: $gray-800;
    margin-right: 5px;
  }
  .submit-btn:hover {
    background-color: $vue-green;
    border-color: $green;
  }
  .btn-outline-secondary {
    color: $gray-800;
    border-color: $gray-800;
  }
  .reset-btn:hover {
    color: white;
  }
}
</style>