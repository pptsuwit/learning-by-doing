<template>
  <v-list-group
    :color="gradient !== 1 ? 'white' : undefined"
    :group="group"
    eager
    v-bind="$attrs"
    active-class="white--text primary"
  >
    <template v-slot:activator>
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
    </template>
    <v-list-item
      v-for="child in item.items"
      :key="child.title"
      :to="child.to"
      active-class="white--text secondary"
      :disabled="!child.to"
      link
    >
      <v-list-item-content class="ml-5">
        <v-list-item-title
          v-if="child.badge"
          class="nav-md-font"
        >
          <v-badge
            tile
            color="red"
            inline
            class="mt-0"
            :content="child.badge"
          >
            {{ child.title }}
          </v-badge>
        </v-list-item-title>
        <v-list-item-title
          v-else
          class="nav-md-font"
          v-text="child.title"
        />
      </v-list-item-content>
    </v-list-item>
    <!-- <template v-for="(child, i) in item.items">
      <default-list-item
        v-if="!child.items"
        :key="`child-${i}`"
        :item="child"
      />
    </template> -->
  </v-list-group>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultListGroup',

    components: {
      // DefaultListItem: () => import('./ListItem'),
    },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      gradient: get('user/drawer@gradient'),
      group () {
        return this.genGroup(this.item.items)
      },
      title () {
        const matches = this.item.title.match(/\b(\w)/g)

        return matches.join('')
      },
    },

    methods: {
      genGroup (items) {
        return items.reduce((acc, cur) => {
          if (!cur.to) return acc

          acc.push(
            cur.items
              ? this.genGroup(cur.items)
              : cur.to.slice(1, -1),
          )

          return acc
        }, []).join('|')
      },
    },
  }
</script>
