<template>
	<div class="bubble">
		<div class="drops">
			<div class="drop"></div>
			<div class="drop"></div>
			<div class="drop"></div>
			<div class="drop"></div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.bubble {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	min-height: 100vh;
	background: #edeeed;
}
.drops {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
.drop {
	position: absolute;
	width: 150px;
	height: 150px;
	border-radius: 62% 38% 29% 71% / 42% 54% 46% 58%;
	box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05),
		15px 25px 10px rgba(0, 0, 0, 0.1), 15px 25px 20px rgba(0, 0, 0, 0.05),
		inset -10px -10px 15px rgba(255, 255, 255, 0.9);
}

.drop::before {
	content: "";
	position: absolute;
	top: 25px;
	left: 35px;
	background: #ffff;
	width: 20px;
	height: 20px;
	border-radius: 51% 49% 52% 48% / 65% 50% 50% 35%;
}

.drop::after {
	content: "";
	position: absolute;
	top: 25px;
	left: 65px;
	background: #ffff;
	width: 10px;
	height: 10px;
	border-radius: 39% 61% 39% 61% / 65% 50% 50% 35%;
}

.drop:nth-child(2) {
	transform: scale(0.5) translate(-250px, 150px);
	border-radius: 38% 62% 71% 29% / 65% 39% 61% 35%;
}

.drop:nth-child(3) {
	transform: scale(0.5) translate(280px, 10px);
	border-radius: 38% 62% 71% 29% / 65% 39% 61% 35%;
}
.drop:nth-child(4) {
	transform: scale(0.35) translate(120px, -350px);
	border-radius: 70% 30% 34% 66% / 65% 39% 61% 35%;
}


</style>