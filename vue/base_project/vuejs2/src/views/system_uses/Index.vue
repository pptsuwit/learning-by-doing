<template>
  <v-container>
    <!-- <v-row class="my-1">
      <v-col
        cols="9"
        class="px-15"
      >
        <b>System Uses</b>
      </v-col>
      <v-col
        cols="3"
        class="text-right"
      >
        <v-btn
          class="py-6"
          :to="{ name: 'Role.Add' }"
          rounded
          color="primary"
        >
          <b style="color: white">
            <v-icon>mdi-plus</v-icon>
            เพิ่ม System Uses
          </b>
        </v-btn>
      </v-col>
    </v-row> -->

    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="items"
      class="elevation-1 table__header__theme"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        'items-per-page-options': rowsPerPage,
      }"
      @page-count="pageCount = $event"
    >
      <template v-slot:header.name="{ header }">
        <div class="ml-15">
          {{ header.text }}
        </div>
      </template>
      <template v-slot:item.name="{ item }">
        <div class="ml-15">
          {{ item.name }}
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <router-link
          :to="{ name: 'Role.Edit', params: {id: item.id} }"
          class="text-decoration-none mr-1"
        >
          <v-btn
            small
            dark
            color="btn-edit-theme"
          >
            <b>แก้ไข</b>
          </v-btn>
        </router-link>

        <v-btn
          dark
          small
          color="btn-delete-theme"
          min-width="20"
          @click="deleteDialog(item.id)"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      showDialog: false,
      deleteId: null,

      page: 1,
      pageSize: 10,
      pageCount: 0,
      itemsPerPage: 10,
      rowsPerPage: [5, 10, 15, 30, 50, 100, { text: 'All', value: -1 }],
      headers: [
        { text: 'ชื่อ', sortable: false, align: 'start', value: 'name' },
        { text: 'Code', sortable: false, align: 'start', value: 'code' },
      ],
      items: [],
    }),
    mounted () {
      this.$store.state.title = 'System Uses'
      this.$store.state.isBack = false
      this.get()
    },
    methods: {
      get () {
        this.$store.state.loading = true
        this.$root
          .appApi({ url: 'admin/system-uses' })
          .then((resp) => {
            this.items = resp.data.data
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErorMessage(err)
            this.$store.state.loading = false
          })
      },
    },
  }
</script>

<style></style>
