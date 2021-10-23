import { LocalStorage, useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default function useHandleResponse() {
  const { notify } = useQuasar();
  const store = useStore();
  const router = useRouter();
  const handleResponse = (e) => {
    console.error(e);
    if (e.response?.status == 422) {
      let message = "";
      const errors = e.response.data.errors;
      const errorKeys = Object.keys(errors);
      errorKeys.forEach((key) => (message += errors[key]));
      notify({
        message,
        type: "negative",
      });
    } else if (e.response?.status == 401) {
      LocalStorage.remove("token");
      store.commit("setToken", null);
      notify({
        message: e.response.data.message,
        type: "negative",
      });

      router.replace({ name: "login" });
    } else {
      if (e.response) notify(e.response.data.message);
      else
        notify({
          message: e.message,
          type: "negative",
        });
    }
  };

  const handleTronResponse = (e) => {
    console.error(e);
    if (e.response) {
      if (e.response.status == 400) {
        notify({
          message: e.response.data.error,
          type: "negative",
        });
      } else {
        notify(e.response.status);
      }
    }
  };

  return {
    handleResponse,
    handleTronResponse,
  };
}
