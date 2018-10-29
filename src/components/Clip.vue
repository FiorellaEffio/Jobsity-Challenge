<template>
  <v-container fluid>
              <v-list-tile avatar ripple>
                <v-list-tile-content>
                  <v-list-tile-title>{{ clipProperties.clipName }}</v-list-tile-title>
                  <v-list-tile-sub-title>From: {{ clipProperties.beginAt }} to {{ clipProperties.finishAt }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <video muted width="100" :src="clipProperties.urlTime"></video>
                <v-list-tile-action>
                  <v-btn icon @click="changeURLVideoPlayer(clipProperties.urlTime)">
                    <v-icon>play_circle_filled</v-icon>
                  </v-btn>
                  <v-menu bottom left v-if="clipProperties.clipName != 'FullVideo'">
                    <v-btn slot="activator" icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile @click="dialogDelete = true">
                        <v-icon>delete</v-icon>
                      </v-list-tile>
                      <v-list-tile @click="dialogEdit = true">
                        <v-icon>edit</v-icon>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
              <div>
                <!-- Dialog for delete -->
                <v-dialog v-model="dialogDelete" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Are you sure?</v-card-title>
                    <v-card-text>
                      You will not be able to recover this clip again.
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click="dialogDelete = false">
                        Cancel
                      </v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="deleteClip(clipProperties.clipName)">
                        Delete anyway {{clipProperties.clipName}}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- Dialog for edit -->
                <v-dialog v-model="dialogEdit" max-width="400">
                  <v-card>
                    <v-card-title class="headline">Edit your clip</v-card-title>
                    <v-card-text>
                      <v-text-field v-model="editClipName"
                        label="Give a new name to your clip"
                        outline
                        append-icon="person"
                      ></v-text-field>
                      <v-text-field v-model="editBeginAt"
                        label="New Init Time"
                        outline
                        append-icon="playlist_play"
                      ></v-text-field>
                      <v-text-field v-model="editFinishAt"
                        label="New Final Time"
                        outline
                        append-icon="playlist_add_check"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click="dialogEdit = false">
                        Cancel
                      </v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="editClip()">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
  </v-container>
</template>
<script>

export default {
  name: 'Clip',
  props: ['clipProperties'],
  data () {
      return {
        clip:'hola',
        dialogDelete: false,
        dialogEdit: false,
        editClipName:'',
        editBeginAt: '',
        editFinishAt: '',
      }
    },
  methods:{
    deleteClip: function(clipNameToDelete) {
      this.$emit('delete-clip', clipNameToDelete)
    },
    editClip: function(clipName) {
      let newClipProperties = {
        clipName: this.editClipName,
        beginAt: this.editBeginAt,
        finishAt: this.editFinishAt,
        previousClipName: this.clipProperties.clipName,
      };
      this.$emit('edit-clip',newClipProperties);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
