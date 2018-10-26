<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          <progress value="0" max="100" id="uploader"></progress>
          <input accept="video/*" type="file" value="upload" @change="fileBtn(file, $event)">

          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
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


export default {
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
    }
    );
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
