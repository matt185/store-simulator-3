<template>
  <div class="home">
    <Background class="background" />
    <div class="contents">
      <UserHome v-if="isLogged"/>
      <PublicHome v-else/>
    </div>
  </div>
</template>

<script>
import Background from "../components/Background.vue";
import UserHome from "../components/UserHome.vue"
import PublicHome from "../components/PublicHome.vue"
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Background, UserHome, PublicHome
  },
  computed:{
    isLogged(){
      return this.$store.state.users.isLogged
    }
  }
};
</script>

<style lang="scss" scoped>
.home{
	position: relative;
	height: 100%;
	width: 100%;
}
.background{
position: fixed;
z-index: 1;
}

.contents{
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
}

</style>
