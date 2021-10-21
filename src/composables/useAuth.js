import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useHandleResponse from "./useHandleResponse";
export default function useAuth() {
  const { loading } = useQuasar();
  const store = useStore();
  const router = useRouter();
  const { handleResponse } = useHandleResponse();
  const signUp = (data) => {
    loading.show();
    return new Promise((resolve, reject) => {
      api({
        method: "POST",
        url: "/register",
        data,
      })
        .then((response) => {
          resolve(response);
          if (response.status == 201) {
            store.commit("setToken", response.data.token);
            store.commit("setUser", response.data.user);
            router.replace({ name: "user" });
          }
        })
        .catch((error) => {
          handleResponse(error);
          reject(error);
        })
        .finally(() => {
          loading.hide();
        });
    });
  };

  const signIn = (data) => {
    loading.show();
    return new Promise((resolve, reject) => {
      api({
        method: "POST",
        url: "/login",
        data,
      })
        .then((response) => {
          resolve(response);
          if (response.status == 200) {
            store.commit("setToken", response.data.token);
            store.commit("setUser", response.data.user);
            router.replace({ name: "user" });
          }
        })
        .catch((error) => {
          handleResponse(error);
          reject(error);
        })
        .finally(() => {
          loading.hide();
        });
    });
  };

  const signOut = () => {
    loading.show();
    return new Promise((resolve, reject) => {
      api({
        method: "POST",
        url: "/logout",
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          handleResponse(error);
          reject(error);
        })
        .finally(() => {
          store.commit("setToken", null);
          store.commit("setUser", null);
          router.replace({ name: "login" });
          loading.hide();
        });
    });
  };
  return {
    signUp,
    signIn,
    signOut,
  };
}
