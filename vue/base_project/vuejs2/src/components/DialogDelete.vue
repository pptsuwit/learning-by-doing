<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <!-- <template v-slot:activator="{ on, attrs }"> </template> -->
      <v-card class="py-10">
        <v-card-text class="text-center text-body-1">
          <div class="mt-3">
            <v-icon
              size="100"
              color="app-disabled-button-theme"
            >
              mdi-alert-circle
            </v-icon>
          </div>
        </v-card-text>
        <v-card-text class="text-center text-body-1">
          <div class="mt-1">
            <b>ยืนยันการลบข้อมูล</b>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            style="box-shadow: 1px 10px 20px 13px rgba(0, 0, 0, 0.02)"
            dark
            rounded
            class="px-15 py-6 app-disabled-button-theme mr-4"
            @click="$emit('update:dialog', false)"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="app-theme"
            style="box-shadow: 1px 10px 20px 13px rgba(0, 0, 0, 0.02)"
            dark
            rounded
            class="px-15 py-6"
            @click="deleteEntity()"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DialogDelete',
    props: ['dialog', 'deleteId'],
    methods: {
      deleteEntity () {
        this.$emit('update:dialog', false)
        this.$parent.confirmDelete(this.deleteId)
      },
    },
  }
</script>

<style></style>
