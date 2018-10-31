<template>
  <v-container>
    <!-- Button to change editing mode -->
    <v-btn flat :color="colorEditingMode" @click="editingModeBoolean = !editingModeBoolean">
      {{editingMode}}
    </v-btn>
    <!-- Video Player -->
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <div class="headline pink white--text">CLIPNAME : {{currentClipName}}</div>
        <video class="video-js vjs-default-skin"
    controls
    preload="auto"
    autoplay
    data-setup='{"width": 947, "height": 360}'
         width="100%" @timeupdate="updatedTimeVideo()" controls autoplay :src="videoSrcPlayer" ref="videoPlayer"></video>
        <v-btn @click="changeURLVideoPlayer('previous')"><v-icon>arrow_back_ios</v-icon> Previous</v-btn>
        <v-btn @click="changeURLVideoPlayer('next')">Next <v-icon>arrow_forward_ios</v-icon></v-btn>
        <v-progress-circular v-if="seen"
          :rotate="180"
          :size="100"
          :width="15"
          :value="value"
          color="pink"
        >
          {{ valueNumber }}
        </v-progress-circular>
      </v-flex>
      <v-flex xs8 offset-xs2 v-if="editingModeBoolean">
        <form @submit.prevent="createClip()">
          <v-text-field v-model="createClipName" label="Give a name to your clip" outline append-icon="person"></v-text-field>
          <v-text-field v-model="createInitTime" label="Init Time" outline append-icon="playlist_play"></v-text-field>
          <v-text-field v-model="createFinalTime" label="Final Time" outline append-icon="playlist_add_check"></v-text-field>
          <v-combobox v-model="chips" :items="items"
            label="Add tags"
            chips clearable
            solo
            multiple
            outline
          >
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" close @input="removeTag(data.item)">
                <strong>{{ data.item }}</strong>
              </v-chip>
            </template>
          </v-combobox>

          <div class="text-xs-center">
            <v-btn round color="orange" dark type="submit">Create clip</v-btn>
          </div>
        </form>
      </v-flex>
    </v-layout>
    <!-- Clips List -->
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-title>Clips List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field color="white" placeholder="Search tag" v-model="tagSearch"></v-text-field>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <Clip v-for="clip in clipsFiltered" :key="clip.clipName" :clipProperties="clip" :editingModeClip="editingModeBoolean" @change-src="changeURLVideoPlayer($event)" @delete-clip="deleteClip($event)" @edit-clip="editClip($event)"/>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Clip from './Clip'
import videojs from "video.js" 
import videomarkers from "videojs-markers"
export default {
  components: {
    Clip
  },
  data () {
      return {
        defaultURL: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
        videoSrcPlayer: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
        createClipName: '',
        createInitTime: '',
        createFinalTime: '',
        currentTimeVideoPlayer: 0,
        tagSearch: '',
        chips: [],
        setTimeBoolean: '',
        editingModeBoolean: true,
        colorEditingMode: 'red',
        // values for animation 3,2,1 next clip
        interval: {},
        value: 0,
        seen: false,
        // you can change the options for this and also the user can add whichever he or she wants
        items: ['music', 'action', 'girl'],
        clips: [{urlTime: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4', clipName: 'FullVideo', beginAt:0,finishAt: 52, tags:['fullvideo']}]
      }
    },
  mounted() {
    const self = this
    window.addEventListener('keyup', function(event) {
      if (event.keyCode == 37) { 
        // left arrow
        self.changeURLVideoPlayer('previous');
      }
      if (event.keyCode == 39) { 
        // rigth arrow
        self.changeURLVideoPlayer('next');
      }
    });
    self.$refs.ontimeupdate = function() {
      this.currentTimeVideoPlayer = self.$refs.currentTime;
    };
    if (localStorage.getItem('clips')) {
      this.clips = JSON.parse(localStorage.getItem('clips'));
    }
    this.interval = setInterval(() => {
      if (this.value === 100) {
        this.seen = false;
      }
      this.value += 100/3
    }, 1000)
    let video = videojs(this.$refs.videoPlayer);
    video.markers({
      markers: [
        {time: 9.5, text: "this"},
        {time: 20,  text: "is"},
        {time: 25,text: "so"},
        {time: 30,  text: "cool"}
      ]
    });
  },
  watch: {
    clips: {
      handler() {
        localStorage.setItem('clips', JSON.stringify(this.clips));
      },
    },
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
            finishAt: this.createFinalTime,
            tags: this.chips
          }
          this.clips.push(newClip);
          this.createClipName = '';
          this.createInitTime = 0;
          this.createFinalTime = 0;
          this.chips = [];
        } else {
          alert('Clip Name already exists')
        }
      } else {
        alert('Please enter a name for the clip')
      }
    },
    changeURLVideoPlayer: function(newURL) {
      let i = 0;
      let index;
      for(i; i<this.clips.length; i++) {
        if(this.clips[i].urlTime == this.videoSrcPlayer) {
          index = i;
        }
      }
      if(newURL === 'previous') {
        index--;
        if(index >= 0) {
          this.videoSrcPlayer = this.clips[index].urlTime;
        }
      } else if(newURL === 'next') {
        index++;
        if(index<=this.clips.length-1) {
          this.videoSrcPlayer = this.clips[index].urlTime;
        }
      } else {
        this.videoSrcPlayer = newURL;
      }
      this.setTimeBoolean = '';
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
      let saveLocalStorage;
      this.clips.forEach(clip => {
        if(clip.clipName === newClip.previousClipName) {
          clip.clipName = newClip.clipName;  
          clip.urlTime = this.defaultURL + "#t="+ newClip.beginAt + ','+ newClip.finishAt;
          clip.beginAt = newClip.beginAt;
          clip.finishAt = newClip.finishAt;
        }
      })
      saveLocalStorage = this.clips;
      this.clips = [];
      this.clips = saveLocalStorage;
    },
    removeTag (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    // change name 
    updatedTimeVideo () {
      const self = this;
      this.currentTimeVideoPlayer = Math.round(this.$refs.videoPlayer.currentTime)
      let i = 0;
      let timeToPlayNext;
      for(i; i<this.clips.length; i++) {
        if(this.clips[i].urlTime === this.videoSrcPlayer) {
          timeToPlayNext = this.clips[i].finishAt;
        }
      };
      if((this.currentTimeVideoPlayer === parseInt(timeToPlayNext)) && (this.setTimeBoolean === '')) {
        this.setTimeBoolean = 'not empty';
        this.value = 0;
        this.seen = true;
        setTimeout(function(){ self.changeURLVideoPlayer('next'); self.seen = false;}, 3000);
      };
    }
  },
  computed: {
    clipsFiltered: function() {
      let result = [];
      this.clips.forEach(element => {
        let findTag = false;
        let i = 0;
        
        for(i; i<element.tags.length; i++) {
          if((element.tags[i].toUpperCase()).indexOf((this.tagSearch).toUpperCase()) !== -1) {
            findTag = true;
            i=element.tags.length;
          }
        }
        // When a clip has no tags
        if(element.tags.length === 0 && this.tagSearch === '') {
          findTag = true;
        }
        if(findTag) {
          result.push(element);
        }
      })
      return result;
    },
    widthByEdit: function () {
      if(this.editingModeBoolean) {
        return 570;
      } else {
        return 950;
      }
    },
    editingMode: function () {
      let result;
      if(this.editingModeBoolean) {
        result = 'Editing mode activated'
        this.colorEditingMode = 'red'
      } else {
        result = 'Editing mode desactivated'
        this.colorEditingMode = 'green'
      }
      return result;
    },
    valueNumber: function() {
      return 3 - (this.value*3)/100
    },
    currentClipName: function() {
      let index;
      for(let i = 0; i<this.clips.length; i++) {
        if(this.videoSrcPlayer === this.clips[i].urlTime) {
          index = i;
          i = this.clips.length;
        }
      }
      return this.clips[index].clipName;
    }
  },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem
} 
</style>
  