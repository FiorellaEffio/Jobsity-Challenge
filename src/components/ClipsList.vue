<template>
  <v-container fluid>
    You can see all the list of clips {{clip}}
  </v-container>
</template>
<script>

export default {
  name: 'ClipsList',
  data () {
      return {
        clip:'hola',
      }
    },
  methods:{
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
