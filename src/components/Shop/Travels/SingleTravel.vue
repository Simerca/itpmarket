<template>
  <v-row>
    <v-col cols=12>
      <v-img height="200" v-if="travel.featured_image" :src="travel.featured_image" />
    </v-col>
    <v-col cols=12>
        
      <h1>{{ travel.title }}</h1>
      <p>
        {{ travel.description }}
      </p>

      <b>Departure :</b> {{$moment(travel.departure.time).format('ddd DD MMM YYYY HH:mm [GMT]')}}<br/>
      <b>Arrival :</b> {{$moment(travel.arrival.time).format('ddd DD MMM YYYY HH:mm [GMT]')}}

      <h4 class="mt-8">Launch details</h4>
      <v-divider class="my-3" />

    <v-simple-table>
        <tbody>
            <tr>
                <td>
                    <b>Pad Location</b>
                </td>   
                <td>
                    {{launches[0].pad.location.name}} - {{launches[0].pad.location.statename}} - <b>{{launches[0].pad.location.country}}</b>
                </td>
            </tr>
            <tr>
                <td>
                    <b>Departure</b>
                </td>   
                <td>
                    {{$moment(launches[0].win_open).format('ddd DD MMM YYYY HH:mm')}}
                </td>
            </tr>
        </tbody>
    </v-simple-table>
      

      <h4 class="mt-8">Payment</h4>
      <v-divider class="my-3" />

      <v-col class="text-right px-0">
    
        <v-simple-table class="mb-3">
          <tbody>
            <tr>
              <td class="text-left">Travel cost</td>
              <td class="text-right">
                <span>
                  <i
                    class="cf mr-3"
                    :class="`cf-${travel.currency.toLowerCase()}`"
                  ></i>
                  <span class="font-weight-bold">{{
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: travel.currency,
                    }).format(travel.price) || "--"
                  }}</span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-left">Insurance cost</td>
              <td class="text-right">
                <span>
                  <i
                    class="cf mr-3"
                    :class="`cf-${travel.currency.toLowerCase()}`"
                  ></i>
                  <span class="font-weight-bold">{{
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: travel.currency,
                    }).format(travel.price / 12) || "--"
                  }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <span class="text-h5">
          <i
            class="cf mr-3"
            :class="`cf-${travel.currency.toLowerCase()}`"
          ></i>
          <span class="font-weight-bold">{{
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: travel.currency,
            }).format(travel.price) || "--"
          }}</span>
        </span>

        <v-btn class="mt-3" @click="addToCart = true; addProductToCart()" block color="primary" elevation="0">
          Add to cart
        </v-btn>
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
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import launches from "@/assets/launches/launches-list.json";
export default {
  props: {
    travel: {
      type: Object,
      default: () => ({
        title: null,
        featured_image:null,
        from: {
            planet:null
        },
        to:{
            planet:null
        },
        departure:{
          time:null
        },
        arrival:{
          time:null
        },
        provider:{
            name:null
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
      this.$store.dispatch('addToCart', this.travel);
    }
  },
  data: () => ({
    options:{
      launch:null,

    },
    launches: launches,
    addToCart:false,
  }),
};
</script>

<style>
</style>