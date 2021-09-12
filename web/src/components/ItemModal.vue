<template>
	<b-modal
		ref="item-modal"
		:id="info.id"
		:title="info.title"
		@hide="$emit('close-modal')"
		hide-footer
	>
		<b-form @submit="onSubmit" @reset="onReset" v-if="show">
			<b-row>
				<b-col sm="3" class="mb-2">
					<label for="itemId">Item Id :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="itemId"
						v-model="form.content.itemId"
						type="text"
						placeholder="Enter your Item Id"
						required
					></b-form-input>
				</b-col>

				<b-col sm="3" class="mb-2">
					<label for="itemName">Name :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="itemName"
						v-model="form.content.itemName"
						type="text"
						placeholder="Enter item name"
						required
					></b-form-input>
				</b-col>
                <b-col sm="3" class="mb-2">
					<label for="itemType">Class :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="itemClass"
						v-model="form.content.itemClass"
						type="text"
						placeholder="Enter item Class"
						required
					></b-form-input>
				</b-col>
				<b-col sm="3" class="mb-2">
					<label for="itemType">Type :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="itemType"
						v-model="form.content.itemType"
						type="text"
						placeholder="Enter item type"
						required
					></b-form-input>
				</b-col>

				<b-col sm="3" class="mb-2">
					<label for="itemBrand">Brand :</label>
				</b-col>
				<b-col sm="9">
					<b-form-input
						id="itemBrand"
						type="text"
						v-model="form.content.itemBrand"
						placeholder="Enter Brand name"
						required
					></b-form-input>
				</b-col>

                <b-col sm="3" class="mb-2">
					<label for="itemPic">Image :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="itemPic"
						v-model="form.content.itemPic"
						type="text"
						placeholder="Enter image Link"
						required
					></b-form-input>
				</b-col>

				<b-col sm="3" class="mb-2">
					<label for="price">Price :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="price"
						type="text"
						v-model="form.content.price"
						placeholder="Enter price"
						required
					></b-form-input>
				</b-col>
                <b-col sm="3" class="mb-2">
					<label for="quantity">Quantity :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="quantity"
						type="text"
						v-model="form.content.quantity"
						placeholder="Enter quantity"
						required
					></b-form-input>
				</b-col>
                <b-col sm="3" class="mb-2">
					<label for="minQuantity">Min amount :</label>
				</b-col>
				<b-col sm="9" class="mb-2">
					<b-form-input
						id="minQuantity"
						type="text"
						v-model="form.content.minQuantity"
						placeholder="Enter min Quantity"
						required
					></b-form-input>
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
			home: ["true", "false"],
			show: true,
            reset: this.info
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			if (this.info.title === "New item") {
				this.form.content.price =Number(this.form.content.price) 
                this.form.content.quantity=Number(this.form.content.quantity)
                this.form.content.minQuantity=Number(this.form.content.minQuantity)
			    this.$store.dispatch("items/addItem", this.form.content);
			} else {
				console.log("update");
				 this.$store.dispatch("items/updateItem",this.form.content)
			}
			this.$refs["item-modal"].hide();
		},
		onReset(event) {
			event.preventDefault();
			this.form = this.info;
			this.show = false;
			this.$refs["item-modal"].hide();
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