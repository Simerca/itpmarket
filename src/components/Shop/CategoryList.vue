<template>
  <v-col class="py-0">
      <v-chip class="mr-3" x-small v-for="(category , i) in categories" :key="i">
          {{category.name}}
      </v-chip>
  </v-col>
</template>

<script>
import categories from '@/assets/categories/categories-list.json'
export default {
    name:"CategoryListComponent",
    data:()=>({
        categories:categories
    })
}
</script>

<style>

</style>