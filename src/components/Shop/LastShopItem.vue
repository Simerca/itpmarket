<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col>
            <h3>Our last items</h3>
          </v-col>
          <v-col class="text-right"> <router-link tag="a" to="/products" icon>See all</router-link> </v-col>
        </v-row>
        <v-divider />
      </v-col>
      <v-col lg=4 md=6 cols=12 v-for="(product, i) in products" :key="i">
        <card :product="product" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import Card from "./Item/Card.vue";
import products from "@/assets/products/products-list.json";
export default {
  components: { Card },
  data: () => ({
    products: products,
  }),
};
</script>

<style>
</style>