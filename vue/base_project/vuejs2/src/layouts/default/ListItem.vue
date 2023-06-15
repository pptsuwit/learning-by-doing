<template>
  <v-list-item
    :key="item.title"
    link
    :to="item.to"
    active-class="white--text primary"
    :disabled="!item.to"
  >
    <v-list-item-icon
      v-if="item.icon"
      class="mx-0 mr-4"
    >
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="item.title"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'DefaultListItem',

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      title () {
        const matches = this.item.title.match(/\b(\w)/g)

        return matches.join('')
      },
    },
    mounted () {
    },
  }
</script>
