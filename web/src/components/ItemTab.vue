<template>
	<b-container fluid>
		<b-row>
			<b-col lg="12" class="add-icon mr-0 ml-auto">
				<b-button
					pill
					variant="outlined-secondary"
					size="lg"
					v-b-popover.hover="'Add Item'"
					@click="info(infoModal, $event.target)"
					class="mr-1"
				>
					<b-icon icon="plus"></b-icon> </b-button
			></b-col>
			<b-col lg="6" class="my-1">
				<b-form-group
					label="Sort"
					label-for="sort-by-select"
					label-cols-sm="3"
					label-align-sm="right"
					label-size="sm"
					class="mb-0"
					v-slot="{ ariaDescribedby }"
				>
					<b-input-group size="sm">
						<b-form-select
							id="sort-by-select"
							v-model="sortBy"
							:options="sortOptions"
							:aria-describedby="ariaDescribedby"
							class="w-75"
						>
							<template #first>
								<option value="">-- none --</option>
							</template>
						</b-form-select>

						<b-form-select
							v-model="sortDesc"
							:disabled="!sortBy"
							:aria-describedby="ariaDescribedby"
							size="sm"
							class="w-25"
						>
							<option :value="false">Asc</option>
							<option :value="true">Desc</option>
						</b-form-select>
					</b-input-group>
				</b-form-group>
			</b-col>

			<b-col lg="6" class="my-1">
				<b-form-group
					label="Initial sort"
					label-for="initial-sort-select"
					label-cols-sm="3"
					label-align-sm="right"
					label-size="sm"
					class="mb-0"
				>
					<b-form-select
						id="initial-sort-select"
						v-model="sortDirection"
						:options="['asc', 'desc', 'last']"
						size="sm"
					></b-form-select>
				</b-form-group>
			</b-col>

			<b-col lg="6" class="my-1">
				<b-form-group
					label="Filter"
					label-for="filter-input"
					label-cols-sm="3"
					label-align-sm="right"
					label-size="sm"
					class="mb-0"
				>
					<b-input-group size="sm">
						<b-form-input
							id="filter-input"
							v-model="filter"
							type="search"
							placeholder="Type to Search"
						></b-form-input>

						<b-input-group-append>
							<b-button :disabled="!filter" @click="filter = ''"
								>Clear</b-button
							>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>

			<b-col lg="6" class="my-1">
				<b-form-group
					v-model="sortDirection"
					label="Filter On"
					description="Leave all unchecked to filter on all data"
					label-cols-sm="3"
					label-align-sm="right"
					label-size="sm"
					class="mb-0"
					v-slot="{ ariaDescribedby }"
				>
					<b-form-checkbox-group
						v-model="filterOn"
						:aria-describedby="ariaDescribedby"
						class="mt-1"
					>
						<b-form-checkbox value="itemId">Id</b-form-checkbox>
						<b-form-checkbox value="itemBrand">Brand</b-form-checkbox>
					</b-form-checkbox-group>
				</b-form-group>
			</b-col>

			<b-col sm="5" md="6" class="my-1">
				<b-form-group
					label="Per page"
					label-for="per-page-select"
					label-cols-sm="6"
					label-cols-md="4"
					label-cols-lg="3"
					label-align-sm="right"
					label-size="sm"
					class="mb-0"
				>
					<b-form-select
						id="per-page-select"
						v-model="perPage"
						:options="pageOptions"
						size="sm"
					></b-form-select>
				</b-form-group>
			</b-col>

			<b-col sm="7" md="6" class="my-1">
				<b-pagination
					v-model="currentPage"
					:total-rows="totalRows"
					:per-page="perPage"
					align="fill"
					size="sm"
					class="my-0 custom-pagination"
				></b-pagination>
			</b-col>
		</b-row>

		<!-- Main table element -->
		<b-table
			:items="itemsWithVariant"
			:fields="fields"
			:current-page="currentPage"
			:per-page="perPage"
			:filter="filter"
			:filter-included-fields="filterOn"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:sort-direction="sortDirection"
			stacked="md"
			show-empty
			small
			@filtered="onFiltered"
		>
			<template #cell(itemPic)="row">
				<b-img
					class="image"
					:src="row.item.itemPic"
					rounded
					alt="Rounded image"
				></b-img>
			</template>
			<template #cell(home)="row">
				<b-form-group>
					<input
						type="checkbox"
						v-model="row.item.home"
						@click="setHome(row.item.itemId)"
					/>
				</b-form-group>
			</template>
			<template #cell(actions)="row">
				<b-button
					pill
					variant="outlined-secondary"
					size="sm"
					@click="info(row.item, $event.target)"
					class="mr-1"
				>
					<b-icon icon="info-circle"></b-icon>
				</b-button>
				<b-button
					pill
					variant="outlined-secondary"
					size="sm"
					@click="deleteInfo(row.item.itemId)"
					class="mr-1"
				>
					&#128465;
				</b-button>
			</template>
		</b-table>

		<!-- Info modal -->
		<ItemModal :info="infoModal" @close-modal="resetInfoModal" />

		<!-- Delete modal -->

		<b-modal v-model="deleteModalShow" title="Delete User">
			<b-form-checkbox
				id="checkbox-1"
				v-model="confirmDelete"
				name="checkbox-delete"
			>
				Delete items
			</b-form-checkbox>

			<template #modal-footer="{ cancel }">
				<b-button
					v-if="!confirmDelete"
					size="sm"
					variant="disable"
					@click="ok()"
				>
					Delete
				</b-button>
				<b-button v-else size="sm" variant="secondary" @click="deleteItem()">
					Delete
				</b-button>
				<b-button size="sm" variant="outline-secondary" @click="cancel()">
					Cancel
				</b-button>
				<!-- Button with custom close trigger value -->
			</template>
		</b-modal>
	</b-container>
</template>

<script>
import ItemModal from "./ItemModal.vue";
export default {
	components: { ItemModal },
	data() {
		return {
			userList: this.items,
			fields: [
				{
					key: "itemId",
					label: "itemId",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "itemPic",
					label: "Image",
					sortable: false,
					tdClass: "align-middle",
				},
				{
					key: "itemName",
					label: "ItemName",
					sortable: true,
					class: "text-center",
					tdClass: "align-middle",
				},
				{
					key: "itemClass",
					label: "Class",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "itemType",
					label: "Type",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "itemBrand",
					label: "Brand",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "price",
					label: "Price",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "quantity",
					label: "Quantity",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "popular",
					label: "Popularity",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{
					key: "home",
					label: "homepage",
					sortable: true,
					sortDirection: "desc",
					tdClass: "align-middle",
				},
				{ key: "actions", label: "Actions", tdClass: "align-middle" },
			],
			totalRows: 1,
			currentPage: 1,
			perPage: 10,
			pageOptions: [10, 15, { value: 100, text: "Show all" }],
			sortBy: "",
			sortDesc: false,
			sortDirection: "asc",
			filter: null,
			filterOn: [],
			infoModal: {
				id: "info-modal",
				title: "",
				content: {},
			},
			deleteItemInfo: "",
			deleteModalShow: false,
			confirmDelete: false,
		};
	},
	beforeMount() {
		this.$store.dispatch("users/users");
		this.$store.dispatch("items/items");
	},
	computed: {
		sortOptions() {
			// Create an options list from our fields
			return this.fields
				.filter((f) => f.sortable)
				.map((f) => {
					return { text: f.label, value: f.key };
				});
		},
		items() {
			if (this.$store.state.items.items) {
				return this.$store.state.items.items;
			}
			return [];
		},
		itemsWithVariant() {
			return this.items.map((item) => {
				let newVariant = item;
				if (item.quantity <= item.minQuantity) {
					item._rowVariant = "danger";
				} else if (item.quantity <= item.minQuantity + 4) {
					item._rowVariant = "warning";
				}
				return newVariant;
			});
		},
	},
	mounted() {
		// Set the initial number of users
		this.totalRows = this.items.length;
	},
	methods: {
		info(item, button) {
			if (item.itemId) {
				this.infoModal.title = `${item.itemId}`;
			} else {
				this.infoModal.title = `New item`;
			}
			this.infoModal.content = item;
			this.$root.$emit("bv::show::modal", this.infoModal.id, button);
		},
		resetInfoModal() {
			this.infoModal.title = "";
			this.infoModal.content = {};
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length;
			this.currentPage = 1;
		},
		setHome(id) {
			this.$store.dispatch("items/setToHome", id);
		},
		deleteInfo(id) {
			this.deleteModalShow = !this.deleteModalShow;
			this.deleteItemInfo = id;
		},
		deleteItem() {
			this.$store.dispatch("items/deleteItem", this.deleteItemInfo);
			this.confirmDelete=false;
			this.deleteModalShow = false;
		},
	},
};
</script>

<style lang="scss" >
@import "../assets/scss/vendors/bootstrap-vue/_custom.scss";

.add-icon {
	display: flex;
	justify-content: flex-end;
}
.image {
	height: 30px;
	width: 30px;
}

.form-group {
	margin-bottom: 0;
}
</style>