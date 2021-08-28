<template>
	<b-container fluid>
		<b-row>
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
						<b-form-checkbox value="username">Username</b-form-checkbox>
						<b-form-checkbox value="email">Email</b-form-checkbox>
						<b-form-checkbox value="role">Role</b-form-checkbox>
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
			:items="users"
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
			<template #cell(actions)="row">
				<b-button
					pill
					variant="outlined-secondary"
					size="sm"
					@click="info(row.item, row.index, $event.target)"
					class="mr-1"
				>
					<b-icon icon="info-circle"></b-icon>
				</b-button>
        <b-button
					pill
					variant="outlined-secondary"
					size="sm"
          
					@click="deleteInfo(row.item.userId)"
					class="mr-1"
				>
					&#128465;

				</b-button>
			</template>
		</b-table>

		<!-- Info modal -->
		<UserModal :info="infoModal" @close-modal="resetInfoModal"/>

    <!-- Delete modal -->

    <b-modal v-model="deleteModalShow" title="Delete User">
  <b-form-checkbox
      id="checkbox-1"
      v-model="confirmDelete"
      name="checkbox-delete"
    >
      I accept the terms and use
    </b-form-checkbox>
     
    <template #modal-footer="{ cancel }">
    <b-button  v-if="!confirmDelete" size="sm" variant="disable" @click="ok()">
        Delete
      </b-button>
      <b-button v-else size="sm" variant="secondary" @click="deleteUser()">
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
import UserModal from "./UserModal.vue"
export default {
  components:{UserModal,},
	data() {
		return {
      userList:this.users,
			fields: [
				{
					key: "username",
					label: "Username",
					sortable: true,
					sortDirection: "desc",
				},
				{
					key: "email",
					label: "Email",
					sortable: true,
					class: "text-center",
				},
				{ key: "actions", label: "Actions" },
			],
			totalRows: 1,
			currentPage: 1,
			perPage: 5,
			pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
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
      deleteUserInfo:"",
      deleteModalShow:false,
      confirmDelete:false
		};
	},
	created() {
		this.$store.dispatch("users/users");
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
		users() {
			if (this.$store.state.users.users) {
				return this.$store.state.users.users;
			}
			return [];
		},
	},
	mounted() {
		// Set the initial number of users
		this.totalRows = this.users.length;
	},
	methods: {
		info(item, index, button) {
			this.infoModal.title = `${item.username}`;
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
    deleteInfo(id){
      this.deleteModalShow = !this.deleteModalShow
      this.deleteUserInfo=id
    },
    deleteUser(){
      this.$store.dispatch("users/deleteUser",this.deleteUserInfo)
    }
	},
};
</script>

<style lang="scss" >
@import "../assets/scss/vendors/bootstrap-vue/_custom.scss";


.b-icon.bi {
	color: $gray-900;
}

.page-item.active .page-link {  
    background-color:$gray-900 !important;  
    border-color:$gray-900 !important;  
}
</style>