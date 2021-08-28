<template>
	<b-modal
		ref="Delete-modal"
		:id="info.id"
		title="DeleteModal"
		@hide="$emit('close-modal')"
		hide-footer
        v-if="show"
	>
	Hello
	</b-modal>
</template>

<script>
export default {
	props: { info: String },
	data() {
		return {
			id: this.info,
			show: true,
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			this.$store.dispatch("users/updateUserManager",this.form.content)
			this.$refs['user-modal'].hide()
		},
		onReset(event) {
			event.preventDefault();
			this.form =this.info	
			this.show = false;
			this.$refs['user-modal'].hide()
			this.$nextTick(() => {
				this.show = true;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.buttonRaw {
	display: flex;
	justify-content: flex-end;
}
.group {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>