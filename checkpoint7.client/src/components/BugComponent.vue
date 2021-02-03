<template>
  <div class="col-12">
    <div class="BugComponent">
      <div class="card">
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
          <!-- REVIEW how does this turnary work? I got the styling to work a different way I still want to know and understand how the turnary works. -->
          <div :class="bugProp.closed ? activeClass : '' ">
            <p v-if="bugProp.closed==true" class="activeClass">
              Bug Closed?: {{ bugProp.closed }}
            </p>
            <p v-else-if="bugProp.closed==false" class="denied">
              Bug Closed?: {{ bugProp.closed }}
            </p>
          </div>
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
.activeClass {
  color: green;
}
.denied{
  color: red;
}
</style>
