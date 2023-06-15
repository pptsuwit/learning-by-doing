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
          <b>Facebook</b>
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
          <b>Line</b>
        </v-col>
        <v-col
          cols="12"
          sm="7"
        >
          <v-text-field
            v-model="line"
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
          <b>Website</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="website"
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
          <b>Instagram</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="instagram"
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
          <b> Twitter</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="twitter"
            color="app-theme"
            outlined
            hide-details="auto"
          />
        </v-col>
      </v-row>
      <!-- <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m"
        >
          <b>YouTube</b>
        </v-col>
        <v-col
          cols="10"
          sm="7"
        >
          <v-text-field
            v-model="youTube"
            color="app-theme"
            outlined
            hide-details="auto"
          />
        </v-col>
      </v-row> -->

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
        facebook: 'https://www.facebook.com/wewillapp',
        line: 'https://page.line.me/sae8776l?openQrModal=true',
        website: 'www.wewillapp.com',
        twitter: 'wewillapp',
        youTube: 'wewillapp',
        instagram: 'https://www.instagram.com/wewillapp/',
      }
    },
    mounted () {
      this.$store.state.title = 'ข้อมูลติดต่อ Social medial'
    },
    methods: {
      update () {
        if (!this.$refs.form.validate()) return
        this.$root.getSystemMessage('แก้ไขข้อมูลสำเร็จ')
      },
    },
  }
</script>
