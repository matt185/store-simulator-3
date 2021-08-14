<template>
  <div class="forgot-pwd">
    <b-card class="card mt-3" header="Forgot Password">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Email"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            required
          ></b-form-input>
        </b-form-group>

        <b-button v-b-modal.email-sended type="submit" class="submit-btn" pill variant="secondary"
          >Send email</b-button
        >
       <b-modal id="email-sended">An email has been sended at <a>{{this.form.email}}</a></b-modal>
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
import gql from "graphql-tag"
export default {
  data() {
    return {
      form: {
       email:""
      },
    
    };
  },

  methods: {
    onSubmit(event) {
       event.preventDefault();
      this.$apollo.mutate({
        mutation: gql`
          mutation forgotPassword($email: String!) {
            forgotPassword(email: $email)
          }
        `,
        variables: {
          email: this.form.email,
        },
      });
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

.forgot-pwd {
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