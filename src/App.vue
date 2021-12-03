<template>
  <!-- <router-view /> -->
  <div @click="connect">connect</div>
</template>
<script>
//npm i laravel-echo pusher-js
import Echo from "laravel-echo";
window.Pusher = require("pusher-js");
import axios from "axios";

export default {
  name: "App",
  methods: {
    connect() {
      const wsHost = "localhost";
      const token = "2|79BCz4WS4X8vvP8eG5I1POXGDPdRdTzpj4kqGuTb";
      const authEndpoint = "http://127.0.0.1:8000/api/broadcasting/auth";
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "TRON_PUSHER_APP_KEY",
        wsHost,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              axios
                .post(
                  authEndpoint,
                  {
                    socket_id: socketId,
                    channel_name: channel.name,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
      });
      //listen for connected status
      window.Echo.connector.pusher.connection.bind("connected", (e) => {
        console.log("connected", e);
        const walletId = 1;

        //subscription
        window.Echo.private(`Tron.${walletId}` /* Channel name */).listen(
          "TronBalanceUpdated" /* Event name */,
          (e) => {
            console.log(e);
          }
        );
      });
      return window.Echo;

      //read more about laravel-echo at https://laravel.com/docs/8.x/broadcasting#listening-for-events
      //read mroe about pushjs at https://pusher.com/docs/channels/using_channels/client-api-overview/?ref=docs-index
      //https://github.com/pusher/pusher-js
    },
  },
};
</script>
