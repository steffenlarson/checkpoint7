<template>
  <div class="BugDetailsPage container-fluid">
    <div class="row m-3">
      <div class="col-12">
        <!-- Modal -->
        <!-- <div class="modal fade"
             id="exampleModalCenter"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  New List
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form type="submit" @submit.prevent="editBug">
                  <div class="form-group">
                    <label for=""></label>
                    <input type="text"
                           class="form-control"
                           name=""
                           v-model="state.newBug.title"
                           id=""

                           aria-describedby="helpId"
                           placeholder="New List Title"
                    >
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div> -->
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
                <!-- FIXME Display popup message box here for delete (to close) -->
              </div>
              <div class="col-3">
                <p>Last updated: {{ state.bug.updatedAt }} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
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
          logger.log('this is the bug object', state.bug)
          await noteService.createNote(state.newNote)
          state.newNote = { bug: route.params.id }
        } catch (error) {
          logger.error(error)
        }
      },

      async editBug() {
        try {
          logger.log('these are the route parameters should be id', route.params.id)
          await bugService.editBug(state.editedBug)
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
