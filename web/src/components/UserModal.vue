<template>
	<b-modal
		ref="user-modal"
		:id="info.id"
		:title="info.title"
		@hide="$emit('close-modal')"
		hide-footer
	>
		<b-form @submit="onSubmit" @reset="onReset" v-if="show">
			<b-row>
				<b-col sm="3" class="mb-2">
					<label for="username">Username :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="username"
						v-model="form.content.username"
						type="text"
						placeholder="Enter your username"
						required
					></b-form-input>
				</b-col>

				<b-col sm="3" class="mb-2">
					<label for="email">Email :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="email"
						v-model="form.content.email"
						type="email"
						placeholder="Enter your email"
						required
					></b-form-input>
				</b-col>

				<b-col sm="3" class="mb-2">
					<label for="address">Address :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="address"
						v-model="form.content.address"
						type="text"
						placeholder="Enter your address"
						
					></b-form-input>
				</b-col>

				<b-col sm="3" class="mb-2">
					<label for="input-phone">Phone :</label>
				</b-col>
				<b-col sm="9">
					<b-form-input
						id="input-phone"
						v-model="form.content.phone"
						placeholder="Enter phone number"
						
					></b-form-input>
				</b-col>

				<b-col v-if="this.$store.state.users.auth" sm="3" class="mb-2">
					<label for="input-role">Role :</label>
				</b-col>
				<b-col v-if="this.$store.state.users.auth" sm="9" class="mb-2">
					<b-form-select
						id="input-role"
						v-model="form.content.role"
						:options="roles"
						placeholder="Select role"
						
					></b-form-select>
				</b-col>

				<b-col sm="12" class="buttonRaw">
					<b-button type="submit" variant="secondary">Submit</b-button>
					<b-button type="reset" variant="outline-secondary">Cancel</b-button>
				</b-col>
			</b-row>
		</b-form>
	</b-modal>
</template>

<script>
export default {
	props: { info: Object },
	data() {
		return {
			form: this.info,
			roles: ["customer", "admin", "user"],
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