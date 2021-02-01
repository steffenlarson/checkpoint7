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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <NoteComponent v-for="note in state.notes" :key="note.id" :note-prop="note" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
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
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await bugService.getOneBug(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
