import { tronApi } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useHandleResponse from "./useHandleResponse";
export default function useTronApi() {
  const { loading } = useQuasar();
  const { handleTronResponse } = useHandleResponse();
  const getAccountInfoByAddress = (address) => {
    loading.show();
    return new Promise((resolve, reject) => {
      tronApi({
        method: "GET",
        url: "/v1/accounts/" + address,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          handleTronResponse(error);
          reject(error);
        })
        .finally(() => {
          loading.hide();
        });
    });
  };

  return {
    getAccountInfoByAddress,
  };
}
