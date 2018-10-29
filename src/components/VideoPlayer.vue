<template>
  <v-container>
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <form @submit.prevent="createClip()">
          <v-text-field v-model="currentClipName"
            label="Give a name to your clip"
            outline
            prepend-icon="person"
          ></v-text-field>
          <v-text-field v-model="initTime"
            label="Init Time"
            outline
            prepend-icon="playlist_play"
          ></v-text-field>
          <v-text-field v-model="finalTime"
            label="Final Time"
            outline
            prepend-icon="playlist_add_check"
          ></v-text-field>
          <div class="text-xs-center">
            <v-btn round color="orange" dark type="submit">Create clip</v-btn>
          </div>
        </form>
      </v-flex>
      <v-flex xs6 order-lg2 offset-xs1>
        <video width="600" controls :src="videoSrc"></video>
      </v-flex>
    </v-layout>
  
    <div v-for="clip in clips" :key="clip.clipName">
      {{clip.clipName}}
      <video muted width="400" :src="clip.urlTime"></video>
      <button @click="changeURLVideoPlayer(clip.urlTime)">Play in the Video Player</button>
      <button v-if="clip.clipName != 'FullVideo'" @click="deleteClip(clip.clipName)">Delete</button>
      <button v-if="clip.clipName != 'FullVideo'" @click="editClip(clip.clipName)">Edit</button>
    </div>
    <ClipsList/>
    <ClipsList/>
    <ClipsList/>
    <ClipsList/>
  </v-container>
</template>
<script>
import ClipsList from './ClipsList'
export default {
  name: 'video-player',
  components: {
    ClipsList
  },
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
          this.currentClipName = '';
          this.initTime = 0;
          this.finalTime = 0;
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
    },
    editClip: function(clipName) {
      let newName = prompt('Enter a new name');
      let newInit = prompt('new init time');
      let newFinal = prompt('new final time');
      this.clips.forEach(clip => {
        if(clip.clipName === clipName) {
          clip.clipName = newName;  
          clip.urlTime = this.defaultURL + "#t="+ newInit + ','+ newFinal;
          console.log(this.clips)
        }
      })
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
