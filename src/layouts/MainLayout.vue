<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Tron Trade</q-toolbar-title>
        <q-btn
          v-if="token"
          color="warning"
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item
          clickable
          v-ripple
          v-for="menuItem in menuItems"
          :key="menuItem.routeName"
          @click="$router.push({ name: menuItem.routeName })"
        >
          <q-item-section
            class="text-center text-weight-bolder"
            :class="{
              'bg-primary rounded-borders text-white':
                $route.name == menuItem.routeName,
            }"
          >
            {{ menuItem.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import useAuth from "src/composables/useAuth";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
const menuItems = [
  {
    name: "Home",
    routeName: "home",
  },
  {
    name: "User",
    routeName: "user",
  },
  {
    name: "Login",
    routeName: "login",
  },
  {
    name: "Register",
    routeName: "register",
  },
];
export default {
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const { signOut } = useAuth();
    const { dialog } = useQuasar();
    const logout = () => {
      dialog({
        title: "Confirm",
        message: "Would you like to logout?",
        cancel: true,
        persistent: true,
      }).onOk(signOut);
    };
    const store = useStore();
    const token = computed(() => store.state.token);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menuItems,
      logout,
      token,
    };
  },
};
</script>
