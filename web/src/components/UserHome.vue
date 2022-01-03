<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-xl-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center mb-4" v-for="(item,i) in items" :key="i">
      <ItemCard   :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from "./ItemCard.vue"
export default {
  components:{ItemCard},
  data(){
    return {
      items: this.$store.state.items.items
    }
  },
 
}
</script>

<style lang="scss" scoped>
.container {
height: 100%;
width: 100%;
flex-wrap: wrap;
}

</style>