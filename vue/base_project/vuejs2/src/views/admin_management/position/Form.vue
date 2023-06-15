<template>
  <v-container class="mt-10">
    <v-form
      ref="form"
      @submit.prevent="isAdd ? insert() : update()"
    >
      <v-row align="center">
        <v-col
          cols="12"
          sm="2"
          class="pl-10"
        >
          <req />
          ตำแหน่ง
        </v-col>
        <v-col
          cols="10"
          sm="8"
        >
          <v-text-field
            v-model="positionName"
            color="app-theme"
            placeholder="ระบุตำแหน่ง"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'ระบุตำแหน่ง',
                     (v) => (v && v.length >= 4) || 'ตำแหน่งขั้นต่ำอย่างน้อย 4 ตัวอักษร',
            ]"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="2"
          class="pl-10 py-0 mt-1"
        >
          <req />
          สิทธิ์ใช้งาน
        </v-col>
        <v-col
          cols="12"
          sm="10"
        >
          <div>
            <v-checkbox
              v-model="selectedAll"
              class="shrink mr-0 mt-0 mb-0"
              style="min-width: 300px"
              color="app-theme"
              label="ทั้งหมด"
              hide-details="auto"
              @change="selectAll"
            />
          </div>
          <div
            v-if="validPermission"
            class="v-text-field__details mt-2 ml-3"
          >
            <div
              class="v-messages theme--light error--text"
              role="alert"
            >
              <div class="v-messages__wrapper">
                <div class="v-messages__message">
                  กรุณาเลือกสิทธิใช้งาน
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        />
        <v-col
          cols="10"
          sm="9"
          class="ma-0 pa-0"
        >
          <div
            v-for="(permission, index) in permissions"
            :key="index"
          >
            <v-checkbox
              v-model="selected"
              class="mt-0 pt-0 mb-3"
              style="min-width: 300px"
              color="app-theme"
              hide-details="auto"
              :label="permission.name"
              :value="permission.id"
            />
          </div>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="my-5 mt-15"
      >
        <v-col
          cols="12"
          sm="8"
          class="mx-auto d-flex justify-center"
        >
          <v-btn
            rounded
            color="app-disabled-button-theme"
            dark
            class="mr-4 my-2 px-8 py-6"
            @click="$router.push('/admin/position')"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            rounded
            color="app-theme"
            dark
            class="my-2 px-8 py-6"
            type="submit"
          >
            บันทึก
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        validPermission: false,
        isAdd: this.$route.name === 'Position.Add',
        positionName: '',
        selectedAll: false,
        selected: [],
        permissions: [
          // {
          //   id: 1,
          //   name: 'จัดการฟีเจอร์ทั้งหมด',
          // },
          // {
          //   id: 2,
          //   name: 'จัดการข้อมูลผู้ดูแลระบบ',
          // },
          // {
          //   id: 3,
          //   name: 'จัดการข้อมูลผู้ใช้งาน',
          // },
          // {
          //   id: 4,
          //   name: 'จัดการรีพอร์ท',
          // },
          // {
          //   id: 5,
          //   name: 'จัดการข้อมูลการตั้งค่า',
          // },
        ],
      }
    },
    watch: {
      selected () {
        this.selectedAll = this.selected.length === this.permissions.length
        if (!(this.selected.length > 0)) {
          this.validPermission = true
        } else {
          this.validPermission = false
        }
      },
    },
    mounted () {
      this.getSystemUses()
      this.$store.state.title = 'เพิ่มตำแหน่ง'
      if (this.$route.name === 'Position.Edit') {
        this.get()
      }
    },
    methods: {
      selectAll (checked) {
        if (checked) {
          const permissions = this.permissions
          permissions.forEach((element) => {
            this.selected.push(element.id)
          })
        } else {
          this.selected = []
        }
      },
      getSystemUses () {
        this.$store.state.loading = true
        this.$root
          .appApi({ url: 'admin/system-uses' })
          .then((resp) => {
            this.permissions = resp.data.data
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErorMessage(err)
            this.$store.state.loading = false
          })
      },
      get () {
        this.$store.state.loading = true
        this.$root
          .appApi({ url: `admin/position/${this.$route.params.id}` })
          .then((resp) => {
            const entity = resp.data.data
            this.positionName = entity.name
            const adminSystemUses = resp.data.data.adminSystemUses
            if (adminSystemUses) {
              adminSystemUses.map((item) => {
                this.selected.push(item.id)
              })
            }
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
            this.$store.state.loading = false
          })
      },
      insert () {
        if (!this.$refs.form.validate()) {
          if (!(this.selected.length > 0)) {
            this.validPermission = true
          } else {
            this.validPermission = false
          }
          return
        }
        const formData = new FormData()
        formData.append('name', this.positionName)
        formData.append('adminSystemUses[]', this.selected)
        this.$root
          .appApi({
            method: 'POST',
            url: 'admin/position',
            data: formData,
          })
          .then((resp) => {
            const errors = resp.data.errors
            if (errors) {
              this.$root.getErrorSystemMessage(errors)
            } else {
              this.$root.getSystemMessage(resp.data.message)
              this.$router.push('/admin/position')
            }
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
          })
      },
      update () {
        if (!this.$refs.form.validate()) {
          if (!(this.selected.length > 0)) {
            this.validPermission = true
          } else {
            this.validPermission = false
          }
          return
        }
        const formData = new FormData()
        formData.append('id', this.$route.params.id)
        formData.append('name', this.positionName)
        formData.append('adminSystemUses[]', this.selected)
        this.$root
          .appApi({
            method: 'PUT',
            url: 'admin/position',
            data: formData,
          })
          .then((resp) => {
            const errors = resp.data.errors
            if (errors) {
              this.$root.getErrorSystemMessage(errors)
            } else {
              this.$root.getSystemMessage(resp.data.message)
              this.$router.push('/admin/position')
            }
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
          })
      },
    },
  }
</script>

<style></style>
