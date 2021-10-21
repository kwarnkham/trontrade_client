<template>
  <q-page padding class="flex flex-center">
    <q-form class="q-gutter-y-sm form" @submit="register" autofocus>
      <q-input
        v-model="name"
        type="text"
        required
        outlined
        label="Name"
      ></q-input>
      <q-input
        v-model="email"
        type="email"
        required
        outlined
        label="Email"
      ></q-input>
      <q-input
        v-model="password"
        type="password"
        required
        outlined
        label="Password"
      ></q-input>
      <q-input
        v-model="password_confirmation"
        type="password"
        required
        outlined
        label="Confirm Password"
      ></q-input>
      <div class="text-center">
        <q-btn color="primary" type="submit" outline>Register</q-btn>
      </div>
      <div class="text-center">
        <q-btn color="secondary" flat @click="$router.push({ name: 'login' })">
          Login
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import useAuth from "src/composables/useAuth";
export default {
  name: "PageName",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const password_confirmation = ref("");
    const { signUp } = useAuth();
    const register = () => {
      signUp({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      name,
      email,
      password,
      password_confirmation,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 90%;
  width: 500px;
}
</style>
