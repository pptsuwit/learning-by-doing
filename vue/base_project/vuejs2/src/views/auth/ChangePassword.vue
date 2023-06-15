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
            <span class="text-theme-primary"><b>เปลี่ยนรหัสผ่าน</b></span>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            <req />รหัสผ่านเก่า
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="oldPassword"
              color="app-theme"
              placeholder="ระบุรหัสผ่านเก่า"
              outlined
              hide-details="auto"
              :rules="[
                (v) => !!v || 'กรุณาระบุรหัสผ่าน',
                (v) =>
                  (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
              ]"
              :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showOldPassword ? 'text' : 'password'"
              @click:append="showOldPassword = !showOldPassword"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            <req />ระบุรหัสผ่านใหม่
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="newPassword"
              color="app-theme"
              placeholder="ระบุรหัสผ่านใหม่"
              outlined
              hide-details="auto"
              :rules="[
                (v) => !!v || 'กรุณาระบุรหัสผ่าน',
                (v) =>
                  (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
                ,
                (v) =>
                  v === (confirmNewPassword || '') ||
                  'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
              ]"

              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showNewPassword ? 'text' : 'password'"
              @click:append="showNewPassword = !showNewPassword"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col
            cols="12"
            sm="3"
            class="pl-10"
          >
            <req />ยืนยันระบุรหัสผ่านใหม่
          </v-col>
          <v-col
            cols="10"
            sm="7"
          >
            <v-text-field
              v-model="confirmNewPassword"
              color="app-theme"
              placeholder="ระบุยืนยันรหัสผ่านใหม่"
              outlined
              hide-details="auto"
              :rules="[
                (v) => !!v || 'กรุณาระบุยืนยันรหัสผ่าน',
                (v) =>
                  (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
                ,
                (v) =>
                  v === (newPassword || '') ||
                  'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน',
              ]"

              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append="showConfirmPassword = !showConfirmPassword"
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

<script>
  export default {
    data: () => ({
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }),
    watch: {
      newPassword () {
        if (!this.$refs.form.validate()) return null
      },
      confirmNewPassword () {
        if (!this.$refs.form.validate()) return null
      },
    },
    mounted () {
      this.$store.state.title = 'จัดการข้อมูลส่วนตัว'
      if (
        this.$store.getters.isRootAdmin ||
        this.$store.state.isRootAdminMenu === true
      ) {
        this.$store.state.title = 'เปลี่ยนรหัสผ่าน'
      }
    },
    methods: {
      update () {
        if (!this.$refs.form.validate()) return null
        this.$store.state.loading = true
        const formData = new FormData()

        formData.append('password', this.oldPassword)
        formData.append('newpassword', this.newPassword)
        this.$root
          .appApi({
            method: 'PUT',
            url: 'admin/profile/password',
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
    },
  }
</script>

<style scoped>
.bg-disabled {
  background-color: #dfdfdf;
}
.v-text-field--outlined >>> fieldset {
  border-color: #839bb7;
}
</style>
