<template>
  <div class="change-pwd">
    <p v-if="this.$store.state.users.user.errors">
      Token expired for a new one click
      <router-link to="/forgot-password"> here </router-link>
    </p>
    <b-card v-else class="card mt-3" header="Change Password">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="New password"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="password"
            v-model="form.password"
            placeholder="Enter new password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="New password"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="password"
            v-model="checkPsw"
            placeholder="Enter new password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-invalid-feedback :state="validation">
          The passwords are different please enter it again
        </b-form-invalid-feedback>

        <b-button type="submit" class="submit-btn" pill variant="secondary"
          >Send email</b-button
        >

        <b-button
          type="reset"
          class="reset-btn"
          pill
          variant="outline-secondary"
          >Cancel</b-button
        >
      </b-form>
    </b-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  props: { token: String },
  data() {
    return {
      form: {
        password: "",
        error: "",
      },
      checkPsw: "",
    };
  },
  computed: {
    validation() {
      if (this.form.password !== this.checkPsw) {
        return false;
      }
      return true;
    },
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      const input = {
        token: this.token,
        form: this.form,
      };
      if (
        (this.form.password === this.checkPsw) &
        (this.form.password !== "")
      ) {
        this.$store.dispatch("users/changePsw", input);
        this.$router.push("/")
      }
      1;
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
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

.change-pwd {
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
