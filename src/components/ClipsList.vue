<template>
  <v-container fluid>
    You can see all the list of clips {{clip}}
    <div v-for="clip in clips" :key="clip.clipName">
      {{clip.clipName}}
      <video muted width="400" :src="clip.urlTime"></video>
      <button @click="changeURLVideoPlayer(clip.urlTime)">Play in the Video Player</button>
      <button v-if="clip.clipName != 'FullVideo'" @click="deleteClip(clip.clipName)">Delete</button>
      <button v-if="clip.clipName != 'FullVideo'" @click="editClip(clip.clipName)">Edit</button>
    </div>
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
