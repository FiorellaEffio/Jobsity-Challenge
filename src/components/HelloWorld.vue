<template>
  <v-container fluid>
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          <progress value="0" max="100" id="uploader"></progress>
          <input accept="video/*" type="file" value="upload" @change="fileBtn(file, $event)">
          <video width="400" controls :src="videoSrc">
          </video>
          {{videoSrc}}
          <!-- A proof of MediaSource -->
          <video ref="myVideo" width="400" controls ></video>
        </blockquote>
      </v-layout>
  </v-container>
</template>
<script>
import Firebase from 'firebase'
  const config = {
    apiKey: "AIzaSyDnlZbLY3lVtMGrv97W_sLhAXHkMQwPv4M",
    authDomain: "jobsity-challenge.firebaseapp.com",
    databaseURL: "https://jobsity-challenge.firebaseio.com",
    projectId: "jobsity-challenge",
    storageBucket: "jobsity-challenge.appspot.com",
    messagingSenderId: "593566901515"
  }
  const app = Firebase.initializeApp(config);
import Hls from 'hls.js'

export default {
  data () {
      return {
        videoSrc: '',
        assetURL: 'https://firebasestorage.googleapis.com/v0/b/jobsity-challenge.appspot.com/o/test%2Fsintel_trailer-480p.mp4?alt=media&token=fd2e61e1-f77f-4fa6-95f3-2f8d97532eaf',
        videoMediaSource: '',
        mimeCodec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        mediaSource: new MediaSource,
      }
    },
methods:{
  fileBtn:function(file, e){
      e.preventDefault();
    const uploader = document.getElementById('uploader');
    //get file
    let getFile = e.target.files[0];
    //set storage ref
    let storageRef = Firebase.storage().ref('test/'+getFile.name);
    //upload file
    let task = storageRef.put(getFile);
    task.on('state_changed',
     function progress(snapshot){
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      uploader.value = percentage;
    },
    function error(err){
      console.log(err);
    },
    function complete(){
       console.log('complete upload');
       // Create a reference to the file whose metadata we want to retrieve
    }
    );
    var forestRef = Firebase.storage().ref().child('test/sintel_trailer-480p.mp4');
    // Get metadata properties
    forestRef.getMetadata().then(function(metadata) {
      // Metadata now contains the metadata for 'images/forest.jpg'
      console.log(metadata)
      console.log(metadata.downloadURLs[0])
      // videoSrc = metadata.downloadURLs[0];
    }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log(error)
    });
    var self = this;
    forestRef.getDownloadURL().then(function(url) {
      console.log(url);
      self.videoSrc = url ;
    });
    if(Hls.isSupported()) {
    console.log('hasta aqui bien')
          var hls = new Hls();
          hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
          hls.attachMedia(this.$refs.myVideo);
          hls.on(Hls.Events.MANIFEST_PARSED,function() {
            console.log('its ok');
            console.log(this.$refs)
        });
       }
        else if (this.$refs.myVideo.canPlayType('application/vnd.apple.mpegurl')) {
          this.$refs.myVideo.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
          this.$refs.myVideo.addEventListener('canplay',function() {
            this.$refs.myVideo.play();
          });
        }
  }
},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
