<template>
  <v-container>
    <!-- Button to change editing mode -->
    <v-btn flat :color="colorEditingMode" @click="editingModeBoolean = !editingModeBoolean">
      {{editingMode}}
    </v-btn>
    <!-- Video Player -->
    <v-layout row>
      <v-flex xs3 offset-xs1 v-if="editingModeBoolean">
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
      <v-flex xs6 order-lg2 offset-xs1>
        <video width="570" @timeupdate="consol()" controls autoplay :src="videoSrcPlayer" ref="videoPlayer"></video>
        <v-btn @click="changeURLVideoPlayer('previous')">Previous</v-btn>
        <v-btn @click="changeURLVideoPlayer('next')">Next</v-btn>
        {{currentTimeVideoPlayer}}/
      </v-flex>
    </v-layout>
    <!-- Clips List -->
    <textarea v-model="tagSearch" placeholder="Search by tag name"></textarea>
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
            <Clip v-for="clip in clipsFiltered" :key="clip.clipName" :clipProperties="clip" :editingModeClip="editingModeBoolean" @change-src="changeURLVideoPlayer($event)" @delete-clip="deleteClip($event)" @edit-clip="editClip($event)"/>
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
    consol () {
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
        this.setTimeBoolean = setTimeout(function() { self.changeURLVideoPlayer('next'); }, 3000);
        setTimeout(function(){ self.changeURLVideoPlayer('next'); }, 3000);
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
    }
  },
}
</script>
<style scoped>
</style>
