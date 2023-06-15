<template>
  <v-app class="section-container">
    <v-row>
      <div class="left--side">
        <v-img
          min-width="100"
          max-width="240"
          src="https://wewillapp.com/images/logo%20(1).png"
        />
        <!-- src="@/assets/ic_logo_white.svg" -->
      </div>
      <div class="right--side">
        <v-form
          ref="form"
          @submit.prevent="submit"
        >
          <v-row
            justify="center"
            style="width: 65vw !important"
          >
            <v-col
              class="align"
              cols="9"
            >
              <h1>เปลี่ยนรหัสผ่านใหม่</h1>
            </v-col>
            <v-col cols="9">
              ระบุรหัสผ่านใหม่
              <v-text-field
                v-model="newPassword"
                color="app-theme"
                placeholder="ระบุรหัสผ่านใหม่"
                outlined
                hide-details="auto"
                :rules="[
                  v => !!v || 'กรุณาระบุรหัสผ่าน',
                  v =>
                    (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
                  ,
                  v =>
                    v === (confirmNewPassword || '') ||
                    'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน'
                ]"
                type="password"
              />
            </v-col>
            <v-col
              cols="9"
              class="mb-0 pb-0"
            >
              ยืนยันระบุรหัสผ่านใหม่
              <v-text-field
                v-model="confirmNewPassword"
                color="app-theme"
                placeholder="ระบุยืนยันรหัสผ่านใหม่"
                outlined
                hide-details="auto"
                :rules="[
                  v => !!v || 'กรุณาระบุยืนยันรหัสผ่าน',
                  v =>
                    (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
                  ,
                  v =>
                    v === (newPassword || '') ||
                    'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน'
                ]"
                type="password"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
              cols="3"
              class="my-5"
            >
              <v-row class="justify-center">
                <v-btn
                  block
                  class="py-6"
                  type="submit"
                  rounded
                  color="app-theme"
                  dark
                >
                  ตกลง
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-row>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      newPassword: '',
      confirmNewPassword: '',
      token: '',
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
      this.token = this.$route.query.token
    },
    methods: {
      submit () {
        if (!this.$refs.form.validate()) return

        this.$store.state.loading = true
        const formData = new FormData()
        formData.append('token', this.token)
        formData.append('password', this.newPassword)
        this.$root
          .appApi({
            method: 'POST',
            url: 'admin/forgot-password/token',
            data: formData,
          })
          .then(() => {
            this.$root.getSystemMessage('ทำการเปลี่ยนรหัสผ่านใหม่เรียบร้อยแล้ว')
            this.$router.push('/login')
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
.section-container {
  padding: 0;
  margin: 0;
  background: #000;
  width: 100%;
}
.screen {
  padding: 0;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
}

.left--side {
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  background: var(--v-app-theme-base);

  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
  padding-left: 0;
}
.right--side {
  display: inline-block;
  width: 65%;
  height: 100%;

  box-sizing: border-box;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
  /* padding-right: 5%; */
}
</style>
