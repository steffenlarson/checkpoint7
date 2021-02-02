<template>
  <div class="col-12">
    <div class="BugComponent">
      <div class="card">
        <img class="card-img-top" src="holder.js/100x180/" alt="">
        <div class="card-body">
          <router-link :to="{name: 'BugDetails', params:{id: bugProp.id}}">
            <h4 class="card-title">
              {{ bugProp.title }}
            </h4>
          </router-link>
          <p class="card-text">
            {{ bugProp.description }}
          </p>
          <p>{{ bugProp.closedDate }}</p>
          <p>Bug Closed?: {{ bugProp.closed }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BugComponent',

  props: { bugProp: { type: Object, required: true } },

  setup(props) {
    return {

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
