<template>
  <q-page padding class="flex flex-center">
    <q-form class="q-gutter-y-sm form" @submit="login" autofocus>
      <q-input
        v-model="email"
        type="email"
        required
        outlined
        label="Email"
      ></q-input>
      <q-input
        v-model="password"
        type="Password"
        required
        outlined
        label="password"
      ></q-input>
      <div class="text-center">
        <q-btn color="primary" type="submit" outline>Login</q-btn>
      </div>
      <div class="text-center">
        <q-btn
          color="secondary"
          outline
          @click="$router.push({ name: 'register' })"
        >
          Register
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import useAuth from "src/composables/useAuth";
export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const { signIn } = useAuth();
    const login = () => {
      signIn({ email: email.value, password: password.value });
    };
    return {
      email,
      password,
      login,
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
