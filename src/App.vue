<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Jobsity-Challenge</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Copyrigth&copy; 2018</span>
    </v-footer>
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
