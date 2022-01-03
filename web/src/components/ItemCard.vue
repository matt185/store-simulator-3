<template>
	<div class="container-fluid">
		<b-card
		class="shadow m-1"
		>
			<template #header>
			<h4 class="mb-0 text-white">{{item.itemId}}</h4>
			</template>
			<b-card-body>
			<b-card-title class="text-truncate">{{item.itemName}}</b-card-title>
			<b-card-sub-title class="mb-2 text-muted text-capitalize">{{item.itemType}}</b-card-sub-title>
			</b-card-body>
			<b-card-img
				:src="item.itemPic"
				alt="Image"
				class="rounded-3 img"
				style="width: 250px; height: 300px"
				></b-card-img>

			<b-card-body>
				<p class="mb-0 mt-0 text-center">${{ item.price }}</p>
				<p class="mb-0 mt-0 text-center text-muted fw-lighter">
							({{ item.quantity }} item available)
						</p>
			
					<b-row class="footer  mt-3 d-flex justify-center align-items-center">
						<b-col class="col-4">
							<b-button
								pill
								variant="outlined-secondary"
								size="sm"
								@click="info(item.itemId)"
								class="mr-1"
							>
								<b-icon icon="info-circle"></b-icon>
							</b-button>
						</b-col>
						<b-col class="col-4">
							<b-button
								pill
								variant="outlined-secondary"
								size="sm"
								@click="setFavorite(item.itemId)"
								class="mr-1"
							>
								<b-icon v-if="this.$store.state.items.userFavorite.includes(item.itemId)" icon="star-fill"></b-icon>
								<b-icon v-else icon="star"></b-icon>
							</b-button>
						</b-col>
						<b-col class="col-4">
							<b-button
								pill
								variant="outlined-secondary"
								size="sm"
								@click="addBag(item.itemId)"
								class="mr-1"
							>
								<b-icon icon="cart4"> </b-icon>
							</b-button>
						</b-col>
					</b-row>
			</b-card-body>
		</b-card>
	</div>
</template>

<script>
export default {
	props: { item: Object},
	computed:{
		favorites(){
			return this.$store.state.items.userFavorite
		}
	},
	methods:{
		info(id){
		console.log (" info",id)
		},
		setFavorite(id){
			console.log(this.favorites.includes(id))

		if (!this.favorites.includes(id)){
			this.$store.dispatch("items/addFavorite",id)
		}else{
			this.$store.dispatch("items/removeFavorite",id)
		}
		},
		addBag(id){
		console.log("bag",id)
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/bootstrap/scss/bootstrap";
@import "../../node_modules/bootstrap-vue/src/index.scss";
.card {
	background-color: transparent;
	border: 1px;
	
}
.card-header{
  background-color: $gray-800;
}
</style>
