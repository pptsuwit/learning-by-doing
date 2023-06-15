<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Register!</h2>

          <Notification :message="error" v-if="error" />

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">ชื่อ - นามสกุล</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="fullname"
                  v-model="fullname"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">อีเมล์</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">รหัสผ่าน</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">เบอร์โทรศัพท์</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="telephone"
                  v-model="telephone"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">รูปประจำตัว</label>
              <div class="control">
                <div class="file has-name is-fullwidth">
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                    aria-label="upload image button"
                    @change="selectFile"
                    name="avatar"
                  />
                </div>
              </div>
            </div>

            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Register
              </button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import Notification from '~/components/Notification'

export default {
  //   components: {
  //     Notification,
  //   },

  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      error: null,
      telephone: '',
      avatar: '',
    }
  },

  methods: {
    selectFile(e) {
      this.avatar = e.target.files[0]
    },

    async register() {
      try {
        let formData = new FormData()
        formData.append('avatar', this.avatar)
        formData.append('fullname', this.fullname)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('telephone', this.telephone)
        await this.$axios.post('register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        alert('Success')
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    },
  },
}
</script>
