<template>
  <v-container>
    <v-row
      class="my-1"
      align="center"
    >
      <v-col cols="1">
        <b>ค้นหา</b>
      </v-col>
      <v-col
        cols="9"
        class="pr-15"
      >
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="keyword"
              label="ค้นหา"
              hide-details="auto"
              :append-icon="'mdi-magnify'"
              color="primary"
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="d-flex justify-end "
        cols="2"
      >
        <v-btn
          :to="{ name: 'Admin.Add' }"
          rounded
          color="primary"
          dark
        >
          เพิ่มผู้ดูแลระบบ
        </v-btn>
      </v-col>
    </v-row>
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
      <template v-slot:item.isActive="{ item }">
        <div class="d-flex justify-center">
          <v-switch
            v-model="item.isActive"
            inset
            @change="activeItem(item, item.isActive)"
          />
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link
          :to="{ name: 'Admin.Edit', params: { id: item.id } }"
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
          small
          dark
          color="btn-delete-theme"
          min-width="20"
          class="btn-p-10"
          @click="deleteDialog(item.id)"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <dialog-delete
      :dialog.sync="showDialog"
      :delete-id="deleteId"
    />
    <pagination
      ref="Pagination"
      :page="page"
      :page-size="pageSize"
      @chagePage="page = $event"
    />
  </v-container>
</template>

<script>
  import DialogDelete from '@/components/DialogDelete'
  import Pagination from '@/components/Pagination'
  export default {
    components: {
      DialogDelete, Pagination,
    },
    data: () => ({
      keyword: '',
      showDialog: false,
      deleteId: null,

      page: 1,
      pageSize: 10,
      pageCount: 0,
      itemsPerPage: 10,
      rowsPerPage: [5, 10, 15, 30, 50, 100, { text: 'All', value: -1 }],
      headers: [
        {
          text: 'ID',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        { text: 'ชื่อ', align: 'center', value: 'firstname' },
        { text: 'นามสกุล', align: 'center', value: 'lastname' },
        { text: 'อีเมล', align: 'center', value: 'email' },
        { text: 'เบอร์โทรศัพท์', align: 'center', value: 'tel', width: '15%' },
        { text: 'ใช้งาน', align: 'center', value: 'isActive', sortable: false },
        {
          text: 'จัดการ',
          sortable: false,
          align: 'center',
          value: 'actions',
          width: '20%',
        },
      ],
      items: [],
    }),
    watch: {
      page () {
        this.search(this.keyword)
      },
      keyword () {
        this.search(this.keyword)
      },
    },
    mounted () {
      this.$store.state.title = 'จัดการผู้ดูแลระบบ'
      this.get()
    },
    methods: {
      search (keyword) {
        this.$store.state.loading = true
        const formData = new FormData()
        formData.append('keyword', keyword.trim())
        formData.append('page', this.page)
        formData.append('pageSize', this.pageSize)
        this.$root
          .appApi({
            method: 'POST',
            url: 'admin/admin/search',
            data: formData,
          })
          .then((resp) => {
            this.items = resp.data.data
            this.$refs.Pagination.getPagination(
              resp.data.count,
              resp.data.data.length,
            )
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
            this.$store.state.loading = false
          })
      },
      get () {
        this.$store.state.loading = true
        this.$root
          .appApi({ url: 'admin/admin/all' })
          .then((resp) => {
            if (resp.data.errors) {
              this.$root.getErrorSystemMessage(resp.data.errors)
            } else {
              this.items = resp.data.data
              this.$refs.Pagination.getPagination(
                resp.data.count,
                resp.data.data.length,
              )
            }
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
            this.$store.state.loading = false
          })
      },
      activeItem (item, status) {
        this.$store.state.loading = true
        const formData = new FormData()
        formData.append('isActive', status)
        this.$root
          .appApi({
            method: 'PATCH',
            url: 'admin/admin/active/' + item.id,
            data: formData,
          })
          .then((resp) => {
            this.$root.getSystemMessage(resp.data.message)
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
            this.$store.state.loading = false
          })
      },
      confirmDelete (id) {
        console.log(id)
        this.$store.state.loading = true
        this.$root
          .appApi({ method: 'DELETE', url: 'admin/admin/' + id })
          .then((resp) => {
            const errors = resp.data.errors
            if (errors) {
              this.$root.getErrorSystemMessage(resp.data.errors)
            } else {
              this.$root.getSystemMessage(resp.data.message)
            }
            this.get()
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
          })
      },
      deleteDialog (id) {
        this.showDialog = true
        this.deleteId = id
      },
    },
  }
</script>

<style></style>
