<template>
  <div class="MyBugsPage">
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
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
