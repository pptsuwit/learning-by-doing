<template>
  <v-dialog
    :value="$store.state.dialog.state"
    persistent
    max-width="500"
  >
    <v-card class="py-10">
      <v-card-text class="text-center text-body-1">
        <v-icon
          v-if="$store.state.dialog.type == 'error'"
          color="#BDBDBD"
          size="64"
        >
          mdi-alert-circle
        </v-icon>
        <v-icon
          v-if="$store.state.dialog.type == 'success'"
          color="#20AB2C"
          size="64"
        >
          mdi-check-circle
        </v-icon>
        <div
          class="mt-3"
          style="font-weight: bold"
          v-html="$store.state.dialog.message"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          color="app-theme"
          dark
          class="px-10 py-6"
          @click="$store.state.dialog.state = false"
        >
          ตกลง
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DialogSystem',
  }
</script>

<style></style>
