<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row m-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-around">
              <div class="col-3">
                <p> Title: {{ state.bug.title }}</p>
              </div>
              <div class="col-3">
                <!-- REVIEW I need to add the populated name from the creator. Do I need to change something in the back end? -->
                <p>Creator: {{ state.bug.creatorId }}</p>
              </div>
              <div class="col-3">
                <p>Is it Closed: {{ state.bug.closed }} </p>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <p class="card-text">
                  Description:
                  {{ state.bug.description }}
                </p>
              </div>
              <div class="col-3">
                <p>Last updated: {{ state.bug.updatedAt }} </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button @click="closeBug">
                  Close this bug
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- REVIEW I want these elements (the edit form and the close bug button to disappear if the user does not match the ) -->
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col">
        <form type="submit" @submit.prevent="editBug">
          <div class="form-group">
            <label for=""></label>
            <input type="text"
                   class="form-control"
                   name=""
                   v-model="state.editedBug.title"
                   id=""

                   aria-describedby="helpId"
                   placeholder="Re-Title Bug"
            >
            <input type="text"
                   class="form-control"
                   name=""
                   v-model="state.editedBug.description"
                   id=""

                   aria-describedby="helpId"
                   placeholder="New Description"
            >
          </div>
          <button type="submit" class="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col mr-3 text-right">
        <form type="submit" @submit.prevent="createNote">
          <div class="form-group text-center">
            <label for=""></label>
            <input type="text"
                   class="form-control"
                   name="newNote"
                   v-model="state.newNote.body"
                   id="board"
                   aria-describedby="helpId"
                   placeholder="Comment here!"
            >
            <button type="submit" class="btn btn-outline btn-success mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <NoteComponent v-for="note in state.notes" :key="note.id" :note-prop="note" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {

  name: 'BugDetailsPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      // REVIEW I will need the id of the bug for the edit function to work. Do I grab it from the route.params.id?
      // I need every single instance of edited bug to have the current bugs id on it.
      editedBug: { id: route.params.id },
      newNote: { bug: route.params.id }
    })
    onMounted(async() => {
      try {
        await bugService.getOneBug(route.params.id)
        await noteService.getNotes(AppState.activeBug.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async createNote() {
        try {
          // logger.log('this is the bug object', state.bug)
          await noteService.createNote(state.newNote)
          state.newNote = { bug: route.params.id }
        } catch (error) {
          logger.error(error)
        }
      },

      async editBug() {
        // REVIEW I should be able to pluck the current bugs id out of bug from the state. Or do I need to pluck it from the AppState.
        try {
          // logger.log('these are the route parameters should be id', state.bug)
          // logger.log('this is the edited bug object in local', state.editedBug)
          await bugService.editBug(state.editedBug)
        } catch (error) {
          logger.error(error)
        }
      },

      async closeBug() {
        try {
          // logger.log('this is the what is being passed to the service', state.bug)
          await bugService.closeBug(state.bug.id)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
