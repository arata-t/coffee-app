<template>
  <div id="app">
    <v-container>
      <router-view/>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchBeans')
  },
  icons: {
    iconfont: 'fa',
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 8px;
}
</style>
