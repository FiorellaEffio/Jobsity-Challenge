<template>
  <v-container fluid>
    <h1>Hi! You can create clips from this video</h1>
    <video width="400" controls :src="videoSrc"></video>
    <p>Please fill this information below</p>    
    <input type="text" v-model="currentClipName" placeholder="Give a name to your clip">
    <input type="text" v-model="initTime" placeholder="Init Time">
    <input type="text" v-model="finalTime" placeholder="Final Time">
    <button @click="createClip()">Create a clip</button>
    <br>
    <div v-for="clip in clips" :key="clip.clipName" @click="changeURLVideoPlayer(clip.urlTime)">
      {{clip.clipName}}
      <video muted width="400" :src="clip.urlTime"></video>
      <button v-if="clip.clipName != 'FullVideo'" @click="deleteClip(clip.clipName)">Delete</button>
    </div>
  </v-container>
</template>
<script>

export default {
  data () {
      return {
        defaultURL: 'https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf',
        videoSrc: this.defaultURL,
        initTime: '0',
        finalTime: '0',
        currentClipName: '',
        clips: [{urlTime: 'https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf#t=0,52', clipName: 'FullVideo'}]
      }
    },
  methods:{
    createClip: function() {
      if(this.currentClipName.trim().length !== 0) {
        let existName = false;
        this.clips.forEach(clip => {
          if(clip.clipName == this.currentClipName) {
            existName = true;
          }
        })
        if(!existName) {
          let newClip = {
            urlTime: this.URLwithParams,
            clipName: this.currentClipName
          }
          this.clips.push(newClip);
        } else {
          alert('Clip Name already exists')
        }
      } else {
        alert('Please enter a name for the clip')
      }
    },
    changeURLVideoPlayer: function(newURL) {
      this.videoSrc = newURL;
    },
    deleteClip: function(clipName) {
      let index;
      let i = 0;
      // 1 because we don't want to delete the first element(full video)
      for(i; i< this.clips.length; i++) {
        if(this.clips[i].clipName === clipName) {
          index = i;
        }
      }
      this.clips.splice(index, 1);
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
