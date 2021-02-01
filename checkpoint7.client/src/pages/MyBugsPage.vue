<template>
  <div class="MyBugsPage">
    <div class="row">
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
    </div>
    <div class="row">
      <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
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
