<template>
  <v-col>
    <v-container>
      <!-- Ariane feed -->
      <v-col>
        <router-link tag="a" to="/">Home</router-link> /
        <router-link tag="a" to="/products">Products</router-link> /
        <router-link tag="a" :to="`/product/${$route.params.id}`">{{
          products.find(map=>map.id == $route.params.id).title
        }}</router-link>
      </v-col>
      <single-product :product="products.find(map=>map.id == $route.params.id)" />
    </v-container>
  </v-col>
</template>

<script>
import SingleProduct from "@/components/Shop/Item/SingleProduct.vue";
import products from "@/assets/products/products-list.json";
export default {
  components: { SingleProduct },
  data: () => ({
    products: products,
  }),
};
</script>

<style>
</style>