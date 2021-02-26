<template>
  <div class="MyBugsPage">
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col-4">
        <form type="submit" @submit.prevent="createBug">
          <div class="form-group text-center">
            <label for=""></label>

            <input type="text"
                   class="form-control"
                   name="newBug"
                   v-model="state.newBug.title"
                   id="board"
                   aria-describedby="helpId"
                   placeholder="Title your bug!"
            >

            <input type="text"
                   class="form-control"
                   name="newBug"
                   v-model="state.newBug.description"
                   id="board"
                   aria-describedby="helpId"
                   placeholder="Describe your bug!"
            >

            <button type="submit" class="btn btn-outline btn-success mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div class="col2">
        <button @click="state.boolValue != state.boolValue"></button>
      </div>
    </div>
    <div class="row">
      <!-- FIXME FILTER HERE add a v-if here, to display if closed == true, add toggle button. Where have I done that before? -->
      <!-- REVIEW I need to know how to set up this filter. I am really lost.  -->
      <div v-if="state.boolValue == false">
        <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
      </div>
      <div v-else>
        <BugComponent v-for="bug in state.bugs.filter(b => b.closed == true)" :key="bug.id" :bug-prop="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { bugService } from '../services/BugService'
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'MyBugsPage',

  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bugs: computed(() => AppState.bugs),
      //
      boolValue: false,
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugService.getAllBugs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async createBug() {
        try {
          await bugService.createBug(state.newBug)
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
