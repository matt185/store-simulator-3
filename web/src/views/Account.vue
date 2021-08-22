<template>
	<div class="account">
		<Background class="back"> </Background>
		<div class="content">
			<h1>hello</h1>
		</div>
	</div>
</template>

<script>
import Background from "../components/Background.vue";
export default {
	components: { Background },
};
</script>

<style>
.account {
	position: relative;
	height: 100%;
	width: 100%;
}
.back {
	position: fixed;

	z-index: 1;
}
.content {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;

	z-index: 2;
}
</style>