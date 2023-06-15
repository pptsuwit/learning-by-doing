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
      <div class="middle">
        <v-btn
          class="half"
          fab
          small
          color="white"
          @click="backToLogin()"
        >
          <v-icon
            color="app-theme"
            dark
          >
            mdi-arrow-left
          </v-icon>
        </v-btn>
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
              class="py-0"
            >
              <h1>ลืมรหัสผ่าน</h1>
            </v-col>
            <v-col cols="9">
              <p>
                กรุณากรอกที่อยู่อีเมลของคุณเพื่อ Reset รหัสผ่านใหม่
                ทางระบบจะส่งไปยังอีเมลของคุณ
              </p>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="email"
                color="app-theme"
                height="48"
                placeholder="อีเมล"
                required
                dense
                :rules="[
                  (v) => !!v || 'กรุณากรอก อีเมล',
                  (v) => /.+@.+/.test(v) || 'กรุณากรอก อีเมล',
                ]"
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
      email: '',
    }),
    methods: {
      backToLogin () {
        this.$router.push('/login')
      },
      submit () {
        this.email = this.email.trim()
        if (!this.$refs.form.validate()) return

        this.$store.state.loading = true
        const formData = new FormData()
        formData.append('email', this.email)
        formData.append('callback', 'https://dev-vue-standard.netlify.app/reset_password/')

        this.$root
          .appApi({
            method: 'POST',
            url: 'admin/forgot-password',
            data: formData,
          })
          .then(() => {
            this.$root.getSystemMessage('ระบบส่งรหัสผ่านไปยังอีเมล์เรียบร้อย')
            this.$store.state.loading = false
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
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  background: var(--v-app-theme-base);

  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
  padding-left: 5%;
}
.right--side {
  display: inline-block;
  width: 60%;
  height: 100%;

  box-sizing: border-box;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
  padding-right: 5%;
}
.middle {
  display: inline-block;
  width: 10%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;

  position: relative;
  z-index: 1;
  background: white;
}

.middle:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  right: 50%;
  bottom: 0;
  left: 0;
  background: #000;
}

.text-black {
  color: black;
}
</style>
