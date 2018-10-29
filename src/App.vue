<template>
  <v-app>
    <v-content>
      <router-view id="app"/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

