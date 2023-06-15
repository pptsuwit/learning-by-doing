<template>
  <v-container class="mt-10">
    <v-form
      ref="form"
      @submit.prevent="add()"
    >
      <v-row
        v-for="(policy, index) in policies"
        :key="index"
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
          sm="3"
          class="pl-10 font-m align"
        >
          <b>นโยบายความเป็นส่วนตัว {{ index + 1 }}.</b>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="policy.detail"
            dense
            color="app-theme"
            placeholder="ระบุนโยบายความเป็นส่วนตัว"
            outlined
            hide-details="auto"
          />
        </v-col>

        <v-col
          cols="12"
          sm="1"
          class="d-flex justify-center align-center pb-5"
        >
          <v-checkbox
            v-model="policy.status"
            class="custom-checkbox-label"
            label="ยอมรับ"
            color="#51A200"
            hide-details
          />
        </v-col>
        <v-col
          cols="12"
          sm="1"
          class="d-flex justify-center"
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
        <v-row />
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          sm="12"
          class="pl-14 font-m align"
        >
          <b><span class="red--text font-s">
            ** ข้อไหนถ้าไม่ยอมรับ จะไม่สามารถสมัครเข้าใช้บริการได้
          </span></b>
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
.font-s {
  font-size: 12px;
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
        btnAddName: 'เพื่มนโยบายความเป็นส่วนตัว',
        showDialog: false,
        deleteId: null,
        policies: [
          { id: 1, detail: 'นโยบายความเป็นส่วนตัว  1' },
          { id: 2, detail: 'นโยบายความเป็นส่วนตัว  2' },
          { id: 3, detail: 'นโยบายความเป็นส่วนตัว  3' },
        ],
      }
    },
    mounted () {
      this.$store.state.title = 'นโยบายความเป็นส่วนตัว'
    },
    methods: {
      addInputCondition () {
        this.policies.push({
          id: 0,
          detail: '',
        })
      },
      confirmDelete (id) {
        this.policies.splice(id, 1)
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
