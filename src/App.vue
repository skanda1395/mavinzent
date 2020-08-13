<template>
  <v-app>
    <v-main class="mx-4 mb-4 grey lighten-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    // 
  }),
};
</script>

<style>
  .v-application--wrap {
    background: #F5F5F5 !important;
  }

</style>