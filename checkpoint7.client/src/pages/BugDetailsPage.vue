<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row m-3">
      <div class="col-12">
        <div class="card">
          <img class="card-img-top" src="holder.js/100x180/" alt="">
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
              <div class="col">
                <p class="card-text">
                  Description:
                  {{ state.bug.description }}
                </p>
                <!-- FIXME Display popup message box here for delete (to close) -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
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
          await noteService.createNote(state.newNote)
          state.newNote = {}
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
