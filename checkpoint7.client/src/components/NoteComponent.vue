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
          <button>Trash me</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteComponent',
  props: { noteProp: { type: Object, required: true } },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
