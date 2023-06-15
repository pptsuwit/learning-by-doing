<template>
  <div>
    <div class="my-10">
      <v-form
        ref="form"
        @submit.prevent="update()"
      >
        <v-row align="center">
          <v-col
            cols="12"
            sm="12"
            class="pl-10"
          >
            <span class="text-theme-primary"><b>ข้อมูลส่วนตัว</b></span>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            ชื่อ
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="profile.firstName"
              color="app-theme"
              placeholder="กรุณาระบุชื่อ"
              outlined
              hide-details="auto"
              :rules="[(v) => !!v || 'กรุณาระบุชื่อ']"
            />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            นามสกุล
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="profile.lastName"
              color="app-theme"
              placeholder="กรุณาระบุนามสกุล"
              outlined
              hide-details="auto"
              :rules="[(v) => !!v || 'กรุณาระบุนามสกุล']"
            />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            อีเมล (สำหรับ Login)
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="profile.email"
              color="app-theme"
              placeholder="อีเมล"
              outlined
              hide-details="auto"
              :rules="[(v) => /.+@.+/.test(v) || 'กรุณาระบุอีเมล']"
            />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            เบอร์โทรศัพท์
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="profile.tel"
              color="app-theme"
              placeholder="เบอร์โทรศัพท์"
              outlined
              hide-details="auto"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            ตำแหน่ง
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-select
              v-model="profile.adminPosition"
              :items="ddlPosition"
              color="app-theme"
              placeholder="ตำแหน่ง"
              outlined
              hide-details="auto"
              disabled
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            Username
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="profile.username"
              color="app-theme"
              placeholder="Username"
              outlined
              hide-details="auto"
            />
          </v-col>
        </v-row>

        <v-row
          no-gutters
          class="my-5"
        >
          <v-col
            cols="12"
            sm="8"
            class="mx-auto d-flex justify-center"
          >
            <router-link
              :to="{ name: 'Admin' }"
              class="text-decoration-none"
            >
              <v-btn
                rounded
                color="app-disabled-button-theme"
                dark
                class="mr-4 my-2 px-8 py-6"
              >
                ยกเลิก
              </v-btn>
            </router-link>
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
    </div>
  </div>
</template>
<style scoped>
.bg-disabled {
  background-color: #dfdfdf;
}
.v-text-field--outlined >>> fieldset {
  border-color: #839bb7;
}
</style>
<script>
  export default {
    data: () => ({
      profile: {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        username: '',
        adminPosition: null,
      },
      ddlPosition: [],
    }),
    mounted () {
      this.$store.state.title = 'จัดการข้อมูลส่วนตัว'
      this.getPosition()
      this.get()
    },
    methods: {
      getPosition () {
        this.$store.state.loading = true
        this.$root
          .appApi({
            url: 'admin/position/all',
          })
          .then((resp) => {
            const entity = resp.data.data
            if (entity) {
              this.ddlPosition = entity.map(item => {
                return {
                  text: item.name,
                  value: item.id,
                }
              })
            }
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErorMessage(err)
          })
      },
      get () {
        this.$store.state.loading = true
        this.$root
          .appApi({
            url: 'admin/profile',
          })
          .then((resp) => {
            const entity = resp.data.data
            this.profile = {
              id: entity.ID,
              firstName: entity.firstname,
              lastName: entity.lastname,
              isActive: entity.isActive,
              tel: entity.tel,
              email: entity.email,
              username: entity.username,
              adminPosition: entity.adminPosition.id,
            }
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErorMessage(err)
          })
      },
      update () {
        if (!this.$refs.form.validate()) return
        this.$store.state.loading = true
        const formData = new FormData()

        formData.append('firstName', this.profile.firstName)
        formData.append('lastName', this.profile.lastName)
        formData.append('email', this.profile.email)
        formData.append('tel', this.profile.tel)
        formData.append('username', this.profile.username)
        formData.append('adminPosition', this.profile.adminPosition)
        this.$root
          .appApi({
            method: 'PUT',
            url: 'admin/profile/',
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

        // this.$root.getSystemMessage('แก้ไขโปรไฟล์ส่วนตัวสำเร็จ');
      },
    },
  }
</script>
