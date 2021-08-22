<template>
  <div class="home">
    <Background class="background" />
    <div class="contents">
      <h1>This is an home page</h1>
    </div>
  </div>
</template>

<script>
import Background from "../components/Background.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    Background,
  },
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
