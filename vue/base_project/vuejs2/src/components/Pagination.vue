<template>
  <div
    v-if="totalPage > 0"
    class="mt-2"
  >
    <v-row align="end">
      <v-col />
      <v-col>
        <div class="text-center">
          <v-pagination
            v-model="pagination"
            color="primary"
            :length="totalPage"
            :total-visible="7"
          />
        </div>
      </v-col>
      <v-col>
        <div
          v-if="!showCount"
          class="text-right text--secondary"
        >
          Showing {{ (page - 1) * pageSize + 1 }} to
          {{ pageSize * page > totalSize ? totalSize : page * pageSize }} of
          {{ totalSize }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      page: Number,
      pageSize: Number,
      showCount: Boolean,
    },
    data () {
      return {
        pagination: this.page,
        totalPage: 0,
        totalSize: 0,
      }
    },
    watch: {
      pagination () {
        this.$emit('chagePage', this.pagination)
      },
    },
    mounted () {},
    methods: {
      getPagination (totalSize, length) {
        if (this.page === 1) {
          this.totalSize = totalSize
          const fullSize = (totalSize / this.pageSize) >> 0
          const remainderSize = totalSize % this.pageSize > 0 ? 1 : 0
          this.totalPage = fullSize + remainderSize
        } else if (totalSize === 0 && length === 0) {
          this.pagination = 1
          this.totalSize = totalSize
          const fullSize = (totalSize / this.pageSize) >> 0
          const remainderSize = totalSize % this.pageSize > 0 ? 1 : 0
          this.totalPage = fullSize + remainderSize
        }
      },
    },
  }
</script>

<style></style>
