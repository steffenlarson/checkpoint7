<template>
  <div class="BugDetailsPage">
    <p>You are now on the bug details page</p>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {

  name: 'BugDetailsPage',

  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug)
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
