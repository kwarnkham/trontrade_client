import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }) => {
  const user = LocalStorage.getItem("user");
  const token = LocalStorage.getItem("token");
  if (user) store.commit("setUser", user);
  if (token) store.commit("setToken", token);
});
