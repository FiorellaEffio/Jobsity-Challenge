<template>
  <v-container>
    <!-- Video Player -->
    <v-layout row>
      <v-flex xs3 offset-xs1>
        <form @submit.prevent="createClip()">
          <v-text-field v-model="createClipName" label="Give a name to your clip" outline append-icon="person"></v-text-field>
          <v-text-field v-model="createInitTime" label="Init Time" outline append-icon="playlist_play"></v-text-field>
          <v-text-field v-model="createFinalTime" label="Final Time" outline append-icon="playlist_add_check"></v-text-field>
          <div class="text-xs-center">
            <v-btn round color="orange" dark type="submit">Create clip</v-btn>
          </div>
        </form>
      </v-flex>
      <v-flex xs6 order-lg2 offset-xs1>
        <video width="570" controls autoplay :src="videoSrcPlayer"></video>
        <v-btn @click="changeURLVideoPlayer('previous')">Previous</v-btn>
        <v-btn @click="changeURLVideoPlayer('next')">Next</v-btn>
      </v-flex>
    </v-layout>
    <!-- Clips List -->
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-title>Clips List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <Clip v-for="clip in clips" :key="clip.clipName" :clipProperties="clip" @change-src="changeURLVideoPlayer($event)" @delete-clip="deleteClip($event)" @edit-clip="editClip($event)"/>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Clip from './Clip'
export default {
  components: {
    Clip
  },
  data () {
      return {
        defaultURL: 'https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf',
        videoSrcPlayer: this.defaultURL,
        createClipName: '',
        createInitTime: '',
        createFinalTime: '',
        clips: [{urlTime: 'https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf', clipName: 'FullVideo', beginAt:0,finishAt: 52}]
      }
    },
  methods:{
    createClip: function() {
      if(this.createClipName.trim().length !== 0) {
        let existName = false;
        this.clips.forEach(clip => {
          if(clip.clipName == this.createClipName) {
            existName = true;
          }
        })
        if(!existName) {
          let newClip = {
            urlTime: this.defaultURL + "#t=" + this.createInitTime  +","+ this.createFinalTime,
            clipName: this.createClipName,
            beginAt: this.createInitTime,
            finishAt: this.createFinalTime
          }
          this.clips.push(newClip);
          this.createClipName = '';
          this.createInitTime = 0;
          this.createFinalTime = 0;
        } else {
          alert('Clip Name already exists')
        }
      } else {
        alert('Please enter a name for the clip')
      }
    },
    changeURLVideoPlayer: function(newURL) {
      console.log(this.clips[0].clipName)
      let i = 0;
      let index;
      for(i; i<this.clips.length; i++) {
        if(this.clips[i].urlTime == this.videoSrcPlayer) {
          console.log(this.clips[i].urlTime)
          index = i;
        }
      }
      if(newURL === 'previous') {
        index--;
        this.videoSrcPlayer = this.clips[index].urlTime;
      } else if(newURL === 'next') {
        index++;
        this.videoSrcPlayer = this.clips[index].urlTime;
      } else {
        this.videoSrcPlayer = newURL;
      }
    },
    deleteClip: function(clipName) {
      let index;
      let i = 1;
      // 1 because we don't want to delete the first element(full video)
      for(i; i< this.clips.length; i++) {
        if(this.clips[i].clipName === clipName) {
          index = i;
        }
      }
      this.clips.splice(index, 1);
    },
    editClip: function(newClip) {
      this.clips.forEach(clip => {
        if(clip.clipName === newClip.previousClipName) {
          clip.clipName = newClip.clipName;  
          clip.urlTime = this.defaultURL + "#t="+ newClip.beginAt + ','+ newClip.finishAt;
          clip.beginAt = newClip.beginAt;
          clip.finishAt = newClip.finishAt;
        }
      })
    }
  },
}
</script>
<style scoped>
</style>
