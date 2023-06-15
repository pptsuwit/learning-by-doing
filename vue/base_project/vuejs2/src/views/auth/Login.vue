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
              cols="9"
            >
              <h1>เข้าสู่ระบบ</h1>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="email"
                color="app-theme"
                height="48"
                label="อีเมล"
                required
                dense
                :rules="usernameRules"
              />
            </v-col>
            <v-col
              cols="9"
              class="mb-0 pb-0"
            >
              <v-text-field
                v-model="password"
                color="app-theme"
                height="48"
                label="รหัสผ่าน"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                required
                dense
                :type="showPass ? 'text' : 'password'"
                :rules="passwordRules"
                @click:append="showPass = !showPass"
              />
            </v-col>
            <v-col
              cols="9"
              class="text-end mt-0 pt-0 mb-5"
            >
              <router-link to="/forgot_password">
                ลืมรหัสผ่าน
              </router-link>
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
                  เข้าสู่ระบบ
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
      email: 'root',
      password: 'root999',
      showPass: false,
      usernameRules: [(v) => !!v || 'กรุณาระบุชื่อผู้ใช้'],
      passwordRules: [
        (v) => !!v || 'กรุณาระบุรหัสผ่าน',
        (v) => (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
      ],
    }),
    mounted () {
      this.$store.dispatch('logout').then(() => {})
    },
    methods: {
      submit () {
        this.email = this.email.trim()
        if (!this.$refs.form.validate()) return null

        this.$store.state.loading = true
        this.$store
          .dispatch('login', { username: this.email, password: this.password })
          .then(() => {
            this.$store.state.loading = false
            this.$router.push('/')
            this.$store.state.title = ''
          })
          .catch((err) => {
            console.log(err)
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
  /* padding-bottom: 10%; */
  /* padding-right: 5%; */
}
</style>
