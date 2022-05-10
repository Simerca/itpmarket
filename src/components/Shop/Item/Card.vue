<template>
  <v-card :to="`/product/${product.id}`">
    <v-img
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      class="align-end"
      :src="product.featured_image"
    >
      <v-card-title style="display: block">
        <span style="font-size: 0.8em"> {{ product.provider.name }}</span>
        <br />
        <span>
          {{ product.title || "--" }}
        </span>
      </v-card-title>
    </v-img>
    <v-card-text>
      <span style="font-size: 0.8em" class="primary--text">{{
        product.category.name || "--"
      }}</span
      ><br />
      {{ product.description || "--" }}
    </v-card-text>
    <v-card-actions class="px-4">
      {{ product.from.planet || "--" }}
      <v-spacer />
        <i class="cf mr-3" :class="`cf-${product.currency.toLowerCase()}`"></i>
        <span class="font-weight-bold">{{
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: product.currency,
          }).format(product.price) || "--"
        }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    product: {
      type: Object,
      default: () => ({
        title: null,
        featured_image: null,
        from: {
          planet: null,
        },
        provider: {
          name: null,
        },
        category: {
          name: null,
        },
        description: null,
        price: null,
        currency: null,
      }),
    },
  },
};
</script>

<style>
</style>