<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Your cart</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table :items="cart" :headers="headers">
          <template v-slot:[`item.price`]="{ item }">
            {{
              new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XLM",
                }).format(item.price) || "--"
            }}
          </template>
        </v-data-table>
      </v-col>
      <v-col md="4" cols="12" offset-md="8">
        <v-card>
          <v-card-text>
            <v-simple-table class="mb-3">
              <tbody>
                <tr>
                  <td class="text-left">Cart total</td>
                  <td class="text-right">
                    <span>
                      <i class="cf mr-3" :class="`cf-xlm`"></i>
                      <span class="font-weight-bold">{{
                        new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "XLM",
                        }).format(cartTotal) || "--"
                      }}</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">Shipping cost</td>
                  <td class="text-right">
                    <span>
                      <i class="cf mr-3" :class="`cf-xlm`"></i>
                      <span class="font-weight-bold">{{
                        new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "XLM",
                        }).format($shipCalculator(cartTotalWeight)) || "--"
                      }}</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-btn block color="primary" to="/valid-order">
              Pay <i class="cf mx-3" :class="`cf-xlm`"></i>
              <span class="font-weight-bold">{{
                new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "XLM",
                }).format(cartTotal) || "--"
              }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CartView",
  computed:{
    ...mapState(['cart']),
    cartTotal(){
      let sum = 0;
      this.cart.map(map=>sum+=map.price)
      return sum+this.$shipCalculator(this.cartTotalWeight);
    },
    cartTotalWeight(){
      let sum = 0;
      this.cart.map(map=>sum+=(map.weight ? map.weight : 0))
      return sum
    }
  },
  data: () => ({
    cartAmount: {
      total: 0,
      total_weight: 0,
    },
    headers: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Product",
        value: "title",
      },
      {
        text: "Amount",
        value: "price",
      },
    ],
    orders: [],
  }),
};
</script>

<style>
</style>