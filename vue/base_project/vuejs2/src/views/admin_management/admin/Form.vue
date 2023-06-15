<template>
  <div class="my-10">
    <v-form
      ref="form"
      @submit.prevent="isAdd ? insert() : update()"
    >
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 "
        >
          <b>ชื่อ</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="admin.firstName"
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
          class="pl-10 "
        >
          <b>นามสกุล</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="admin.lastName"
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
          class="pl-10 "
        >
          <b>เบอร์โทรศัพท์ </b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="admin.tel"
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
          class="pl-10 "
        >
          <b>อีเมล</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="admin.email"
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
          class="pl-10 "
        >
          <b>ตำแหน่ง</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-select
            v-model="admin.positionId"
            :items="ddlPostion"
            color="app-theme"
            placeholder="ตำแหน่ง"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'กรุณาเลือกตำแหน่ง']"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 "
        >
          <b>Username</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="admin.username"
            color="app-theme"
            placeholder="Username"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'กรุณาระบุ Username']"
          />
        </v-col>
      </v-row>
      <v-row
        v-if="isAdd"
        align="center"
      >
        <v-col
          cols="12"
          sm="3"
          class="pl-10 "
        >
          <b>รหัสผ่าน</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="admin.password"
            color="app-theme"
            placeholder="รหัสผ่าน"
            outlined
            hide-details="auto"
            :rules="[
              (v) => !!v || 'กรุณาระบุรหัสผ่าน',
              (v) => (v && v.length >= 6) || 'รหัสผ่านขั้นต่ำต้องมีอย่างน้อย 6',
            ]"
            type="password"
            autocomplete="new-password"
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
          <v-btn
            rounded
            color="btn-cancle-theme"
            dark
            class="mr-4 my-2 px-8 py-6"
            @click="$router.push('/admin/management')"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            rounded
            color="btn-save-theme"
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
</template>
<style scoped>

.v-text-field--outlined >>> fieldset {
  border-color: #839bb7;
}
.default-border-color >>> fieldSet {
  border-color: #aaa;
}
</style>
<script>
  export default {
    data () {
      return {
        ddlPostion: [],
        isAdd: this.$route.name === 'Admin.Add',
        admin: {
          firstName: '',
          lastName: '',
          email: '',
          tel: '',
          password: '',
          positionId: '',
        },
      }
    },
    mounted () {
      this.getPostion()
      this.$store.state.title = 'เพิ่มผู้ดูแลระบบ'
      if (this.$route.name === 'Admin.Edit') {
        this.$store.state.title = 'แก้ไขผู้ดูแลระบบ'
        this.get()
      }
    },
    methods: {
      getPostion () {
        this.$store.state.loading = true
        this.$root
          .appApi({
            url: 'admin/position/all',
          })
          .then((resp) => {
            const ddlPostion = resp.data.data
            if (ddlPostion) {
              this.ddlPostion = ddlPostion.map(item => {
                return {
                  text: item.name,
                  value: item.id,
                }
              })
            }
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
          .appApi({
            url: 'admin/admin/' + this.$route.params.id,
          })
          .then((resp) => {
            console.log(resp)
            this.admin = {
              firstName: resp.data.data.firstname,
              lastName: resp.data.data.lastname,
              tel: resp.data.data.tel,
              email: resp.data.data.email,
              username: resp.data.data.username,
              positionId: resp.data.data.adminPosition.id,
            }
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
            this.$store.state.loading = false
          })
      },
      insert () {
        if (!this.$refs.form.validate()) return
        this.$store.state.loading = true
        const formData = new FormData()
        formData.append('firstName', this.admin.firstName)
        formData.append('lastName', this.admin.lastName)
        formData.append('email', this.admin.email)
        formData.append('username', this.admin.username)
        formData.append('password', this.admin.password)
        formData.append('tel', this.admin.tel)
        formData.append('adminPositionId', this.admin.positionId)
        this.$root
          .appApi({
            method: 'POST',
            url: 'admin/admin',
            data: formData,
          })
          .then((resp) => {
            const errors = resp.data.errors
            if (errors) {
              this.$root.getErrorSystemMessage(errors)
            } else {
              this.$root.getSystemMessage(resp.data.message)
            }
            this.$router.push('/admin/management')
            this.$store.state.loading = false
          })
          .catch((err) => {
            this.$root.getErrorSystemMessage(err)
            this.$store.state.loading = false
          })
      },
      update () {
        if (!this.$refs.form.validate()) return
        this.$store.state.loading = true
        const formData = new FormData()
        formData.append('firstName', this.admin.firstName)
        formData.append('lastName', this.admin.lastName)
        formData.append('email', this.admin.email)
        formData.append('username', this.admin.username)
        formData.append('password', this.admin.password)
        formData.append('tel', this.admin.tel)
        formData.append('adminPositionId', this.admin.positionId)
        this.$root
          .appApi({
            method: 'PATCH',
            url: 'admin/admin/' + this.$route.params.id,
            data: formData,
          })
          .then(() => {
            this.$router.push('/admin/management')
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

<style></style>
