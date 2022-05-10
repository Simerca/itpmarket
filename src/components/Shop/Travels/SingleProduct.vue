<template>
  <v-row>
    <v-col md=6 col=12>
      <v-img v-if="product.featured_image" :src="product.featured_image" />
    </v-col>
    <v-col md=6 col=12>
      <h1>{{ product.title }}</h1>
      <p>
        {{ product.description }}
      </p>

      <h5>Weight : {{(product.weight / 1000) }}kg</h5>

      <h4 class="mt-8">Shipping</h4>
      <v-divider class="my-3" />

      <v-select
        filled
        v-model="options.arrival"
        dense
        label="Select arrival"
        :items="['Earth', 'Mars', 'ISS', 'Moon']"
      />

      <v-select
        filled
        dense
        label="Select launch"
        v-model="options.launch"
        :items="launches"
        :item-text="
          (item) =>
            item.name +
            ' - ' +
            item.provider.name +
            ' - ' +
            $moment(item.sort_date * 1000).format('ddd DD MMM YYYY HH:mm')
        "
      >
      </v-select>

      <h4 class="mt-8">Payment</h4>
      <v-divider class="my-3" />

      <v-col class="text-right px-0">
    
        <v-simple-table class="mb-3">
          <tbody>
            <tr>
              <td class="text-left">Item cost</td>
              <td class="text-right">
                <span>
                  <i
                    class="cf mr-3"
                    :class="`cf-${product.currency.toLowerCase()}`"
                  ></i>
                  <span class="font-weight-bold">{{
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: product.currency,
                    }).format(product.price) || "--"
                  }}</span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-left">Shipping cost</td>
              <td class="text-right">
                <span>
                  <i
                    class="cf mr-3"
                    :class="`cf-${product.currency.toLowerCase()}`"
                  ></i>
                  <span class="font-weight-bold">{{
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: product.currency,
                    }).format($shipCalculator(product.weight)) || "--"
                  }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <span class="text-h5">
          <i
            class="cf mr-3"
            :class="`cf-${product.currency.toLowerCase()}`"
          ></i>
          <span class="font-weight-bold">{{
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: product.currency,
            }).format(product.price) || "--"
          }}</span>
        </span>

        <v-btn class="mt-3" @click="addToCart = true; addProductToCart()" block color="primary" elevation="0">
          Add to cart
        </v-btn>
      </v-col>
    </v-col>
    <v-dialog width="300px" v-model="addToCart">
          <v-card>
            <v-card-title>Cart Add Success</v-card-title>
            <v-card-text>
              Your item as set to your cart
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary" to="/cart">View cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </v-row>
</template>

<script>
import launches from "@/assets/launches/launches-list.json";
export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        title: null,
        featured_image: null,
        weight:null,
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
  methods:{
    addProductToCart()
    {
      console.log('add To Cart');
      this.$store.dispatch('addToCart', {...this.product, ...this.options});
    }
  },
  data: () => ({
    options:{
      arrival:null,
      launch:null,
    },
    launches: launches,
    addToCart:false,
  }),
};
</script>

<style>
</style>