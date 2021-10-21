<template>
  <q-page padding>
    <div>User is {{ $store.state.user?.name }}</div>
  </q-page>
</template>

<script>
export default {
  name: "User",
};
</script>
