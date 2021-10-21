import { LocalStorage } from "quasar";
import { boot } from "quasar/wrappers";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const token = store.state.token;
    if (to.meta.requiresAuth && !token) {
      next({ name: "login" });
    } else if (to.meta.onlyGuest && token) {
      next({ name: "user" });
    } else {
      next();
    }
  });
});
