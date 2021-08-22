<template>
	<div class="manager">
		<b-card title="Card Title" no-body>
			<b-card-header header-tag="nav">
				<b-nav card-header tabs fill>
					<b-nav-item :active="tab === 1" @click="tab = 1">Items</b-nav-item>
					<b-nav-item :active="tab === 2" @click="tab = 2">User</b-nav-item>
					<b-nav-item :active="tab === 3" @click="tab = 3">Other</b-nav-item>
				</b-nav>
			</b-card-header>

			<b-card-body v-if="tab === 1" class="text-center">
				<b-card-text> <ItemTab /> </b-card-text>
			</b-card-body>
			<b-card-body v-else-if="tab === 2" class="text-center">
				<b-card-text> <UsersTab /> </b-card-text>
			</b-card-body>
			<b-card-body v-else-if="tab === 3" class="text-center">
				<b-card-text> card 3 </b-card-text>
			</b-card-body>
		</b-card>
	</div>
</template>

<script>
import ItemTab from "../components/ItemTab.vue";
import UsersTab from "../components/UsersTab.vue";
export default {
	name: "manager-view",
	components: { ItemTab, UsersTab },
	data: () => {
		return {
			tab: 1,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/vendors/bootstrap-vue/_custom.scss";

.manager {
	height: 100%;
}
.card {
	height: 100%;
}

.nav-link {
	color: $gray-500;
}
.nav-link.active {
	color: $gray-900;
}
</style>
