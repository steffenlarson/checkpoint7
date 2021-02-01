<template>
  <div class="NoteComponent">
    <!-- NOTE fix the comment card to always display at col 12 -->
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <p class="card-title">
            Comment:
            {{ noteProp.body }}
          </p>
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
