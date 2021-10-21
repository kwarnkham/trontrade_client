import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import { LocalStorage } from "quasar";
import { api } from "src/boot/axios";
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      token: null,
      user: null,
    },
    mutations: {
      setToken(state, token) {
        if (token) {
          api.defaults.headers.common["Authorization"] = "Bearer " + token;
          try {
            LocalStorage.set("token", token);
          } catch (error) {
            console.error(error);
          }
        } else {
          LocalStorage.remove("token");
          api.defaults.headers.common["Authorization"] = undefined;
        }
        state.token = token;
      },
      setUser(state, user) {
        if (user) {
          try {
            LocalStorage.set("user", user);
          } catch (error) {
            console.error(error);
          }
        } else {
          LocalStorage.remove("user");
        }
        state.user = user;
      },
    },
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
