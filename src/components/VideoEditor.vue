<template>
  <v-container fluid>
    <h1>Hi! You can create clips from this video</h1>
    <video width="400" controls :src="URLwithParams"></video>
    <p>Please fill this information below</p>     
    <input type="text" v-model="initTime" placeholder="Init Time">
    <input type="text" v-model="finalTime" placeholder="Final Time">
    <button @click="createClip()">Create a clip</button>
    <br>
    {{clips}}
    <div v-for="clip in clips" :key="clip">
      {{clip}}
      <video autoplay width="400" :src="clip"></video>
    </div>
  </v-container>
</template>
<script>

export default {
  data () {
      return {
        videoSrc: '',
        defaultURL: 'https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf',
        initTime: '0',
        finalTime: '0',
        clips:['https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf#t=0,52'],
      }
    },
  methods:{
    createClip: function() {
      console.log(this.URLwithParams)
      this.clips.push(this.URLwithParams);
    }
  },
  computed: {
    // a computed getter
    URLwithParams: function () {
      // `this` points to the vm instance
      return this.defaultURL + '#t=' + this.initTime + ',' + this.finalTime
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
