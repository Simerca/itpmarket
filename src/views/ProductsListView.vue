<template>
  <v-container>
    <v-row>
      <v-col cols=12>
          <v-card>
              <v-card-title>Products</v-card-title>
              <v-card-text>
                Find the best products for your space programs.
              </v-card-text>
          </v-card>
      </v-col>
      <v-col md=12 cols=12>
        <h3>Filters</h3>
        <v-divider />
        <v-select
        class="mt-3"
          filled 
          dense
          multiple
          label="Choose filter"
          v-model="filter"
          :items="categories"
          item-text="name"
          item-value="id"
        />
      </v-col>
      <v-col md=12 cols=12>
        <v-row>
            <v-col cols=12>
                Found <span class="primary--text">{{productsFiltered.length}}</span> item(s)
            </v-col>
          <v-col md=4 cols=12 v-for="(product, i) in productsFiltered" :key="i">
            <card :product="product" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/Shop/Item/Card.vue";
import products from "@/assets/products/products-list.json";
import categories from "@/assets/categories/categories-list.json";

export default {
  components: { Card },
  computed: {
    productsFiltered() {
      return this.filter.length ? this.products.filter((map) =>
        this.filter.includes(map.category.id)
      ) : this.products;
    },
  },
  data: () => ({
    products: products,
    categories: categories,
    filter: [],
  }),
  watch: {
    categoriesFilter() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
</style>