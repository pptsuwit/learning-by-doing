<template>
  <v-container>
    <v-form
      ref="form"
      @submit.prevent="add()"
    >
      <v-row
        align="center"
        class="my-10"
      >
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m align"
        >
          <b>คู่มือการใช้งาน</b>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-file-input
            ref="upload"
            name="upload"
            color="app-theme"
            hide-details
            placeholder="เลือกไฟล์"
            outlined
            persistent-hint
            prepend-icon=""
            @change="onFileChange"
          />
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
          <v-btn
            class="py-5"
            rounded
            color="app-theme"
            dark
            style="text-transform: none !important"
            @click="$refs.upload.$refs.input.click()"
          >
            <b> Browse</b>
          </v-btn>
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
<style scoped>
.font-m {
  font-size: 16px;
}
</style>
<script>
  export default {
    data () {
      return {
        file: null,
      }
    },
    mounted () {
      this.$store.state.title = 'คู่มือการใช้งาน'
    },
    methods: {
      onFileChange (file) {
        this.file = file
      },
    },
  }
</script>

<style></style>
