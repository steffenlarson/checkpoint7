<template>
  <div class="NoteComponent row m-3">
    <!-- NOTE fix the comment card to always display at col 12 -->
    <div class="col">
      <div class="card">
        <div class="card-body">
          <p class="card-title">
            Comment:
            {{ noteProp.body }}
          </p>
          <button @click="deleteNote">
            Trash me
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
export default {
  name: 'NoteComponent',
  props: { noteProp: { type: Object, required: true } },
  setup(props) {
    return {
      async deleteNote() {
        try {
          noteService.deleteNote(props.noteProp.id)
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
