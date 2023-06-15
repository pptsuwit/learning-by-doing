<template>
  <div class="my-10">
    <v-form
      ref="form"
      @submit.prevent="isAdd ? add() : update()"
    >
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <req /> <b>ชื่อบริษัท</b>
        </v-col>
        <v-col
          cols="12"
          sm="7"
        >
          <v-text-field
            v-model="companyName"
            color="app-theme"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'กรุณาระบุชื่อบริษัท']"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <req /> <b>ที่อยู่</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="address"
            color="app-theme"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'กรุณาระบุที่อยู่']"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <req /> <b>เบอร์โทรศํพท์</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="tel"
            color="app-theme"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'กรุณาระบุเบอร์โทรศํพท์']"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <b> โทรสาร</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="fax"
            color="app-theme"
            outlined
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <req /> <b>อีเมล</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="email"
            color="app-theme"
            outlined
            hide-details="auto"
            :rules="[(v) => !!v || 'กรุณาระบุอีเมล']"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <b>Facebook Link</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="facebook"
            color="app-theme"
            outlined
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <b>Line ID</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="line"
            color="app-theme"
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
          class="pl-10 font-m"
        >
          <b>Location</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-row align="center">
            <v-col
              cols="12"
              sm="2"
            >
              Latitude
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="lat"
                color="app-theme"
                outlined
                hide-details="auto"
              />
            </v-col>
            <v-col
              cols="12"
              sm="2"
            >
              Longtitude
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="lng"
                color="app-theme"
                outlined
                hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        class="my-5 mt-15"
      >
        <v-col
          cols="12"
          sm="7"
          class="mx-auto d-flex justify-center"
        >
          <v-btn
            rounded
            color="app-disabled-button-theme"
            dark
            class="mr-4 my-2 px-8 py-6"
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
  </div>
</template>
<style scoped>
.v-btn {
  min-width: 20px !important;
}
.font-m {
  font-size: 16px;
}
.v-text-field--outlined >>> fieldset {
  border-color: #839bb7;
}
</style>
<script>
  export default {
    // beforeCreate() {
    //   if (!this.$store.getters.isRootUser) {
    //     this.$router.push("/abort");
    //   }
    // },
    data () {
      return {
        companyName: '',
        address: '',
        tel: '',
        fax: '',
        email: '',
        facebook: '',
        line: '',
        lat: '',
        lng: '',
      }
    },
    mounted () {
      this.$store.state.title = 'ช่องทางการติดต่อ'
    },
    methods: {
      update () {
        if (!this.$refs.form.validate()) return
        this.$root.getSystemMessage('แก้ไขข้อมูลสำเร็จ')
      },
    },
  }
</script>
