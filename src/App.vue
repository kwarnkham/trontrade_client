<template>
  <router-view />
</template>
<script>
import useTronApi from "src/composables/useTronApi";
export default {
  name: "App",
  setup() {
    const { getAccountInfoByAddress } = useTronApi();
    getAccountInfoByAddress("TDeeUerUt6V3nZWS7Cko3WzT1WKVTgtsLJ")
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.warn(e.response);
      });
  },
  created() {
    // this.$tronApi({
    //   method: "POST",
    //   url: "/wallet/createtransaction",
    //   data: {
    //     to_address: "41e9d79cc47518930bc322d9bf7cddd260a0260a8d",
    //     owner_address: "41D1E7A6BC354106CB410E65FF8B181C600FF14292",
    //     amount: 1000,
    //   },
    // }).then((response) => {
    //   console.log(response);
    // });
    // console.log(process.env.BUILD);
  },
};
</script>
