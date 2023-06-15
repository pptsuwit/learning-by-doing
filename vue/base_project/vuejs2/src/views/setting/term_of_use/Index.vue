<template>
  <v-container class="mt-10">
    <v-form
      ref="form"
      @submit.prevent="add()"
    >
      <v-row
        v-for="(condition, index) in conditions"
        :key="index"
        align="center"
        no-gutters
        :class="index == 0 ? 'mt-5' : 'mt-5'"
      >
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m align"
        >
          <b>เงื่อนไขการใช้บริการ {{ index + 1 }}.</b>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="condition.detail"
            dense
            color="app-theme"
            placeholder="ระบุเงื่อนไขการใช้บริการ"
            outlined
            hide-details="auto"
          />
        </v-col>
        <v-col
          cols="12"
          sm="1"
          class="ml-4"
        >
          <v-btn
            dark
            color="app-danger"
            min-width="20"
            class="btn-p-10"
            @click="deleteDialog(index)"
          >
            <v-icon color="app-primary">
              mdi-trash-can
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m align"
        />
        <v-col
          cols="12"
          sm="9"
        >
          <v-btn
            rounded
            outlined
            color="black"
            dark
            class="my-2 px-2"
            style="border: 2px solid #23599f"
            @click="addInputCondition"
          >
            <v-icon color="app-theme">
              mdi-plus-circle
            </v-icon>
            &emsp;{{ btnAddName }}
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
    <dialog-delete
      :dialog.sync="showDialog"
      :delete-id="deleteId"
    />
  </v-container>
</template>
<style scoped>
.font-m {
  font-size: 16px;
}
</style>
<script>
  import DialogDelete from '@/components/DialogDelete'
  export default {
    components: {
      DialogDelete,
    },
    data () {
      return {
        btnAddName: 'เพื่มเงื่อนไขการใช้บริการ',
        showDialog: false,
        deleteId: null,
        conditions: [
          { id: 1, detail: 'เงื่อนไขที่  1' },
          { id: 2, detail: 'เงื่อนไขที่  2' },
        ],
      }
    },
    mounted () {
      this.$store.state.title = 'เงื่อนไขการใช้บริการ'
    },
    methods: {
      addInputCondition () {
        this.conditions.push({
          id: 0,
          detail: '',
        })
      },
      confirmDelete (id) {
        this.conditions.splice(id, 1)
        this.$root.getSystemMessage('ลบข้อมูลเรียบร้อยแล้ว')
      },
      deleteDialog (id) {
        console.log(id)
        this.showDialog = true
        this.deleteId = id
      },
    },
  }
</script>

<style></style>
