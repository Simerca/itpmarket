<template>
  <v-col class="pa-0 ma-0">
    <heading />
    <v-container>
      <h2 class="pl-3 mt-6">Products</h2>
      <last-shop-item />
      <banner-middle />
      <h2 class="pl-3 mt-6">
        Travels
      </h2>
      <last-travel-item />
    </v-container>
  </v-col>
</template>

<script>
import Heading from '@/components/Home/Heading.vue'
import LastShopItem from '@/components/Shop/LastShopItem.vue'
import BannerMiddle from '@/components/Home/BannerMiddle.vue'
import LastTravelItem from '@/components/Shop/LastTravelItem.vue'

  export default {
    name: 'HomeView',

    components: {
        LastShopItem,
        Heading,
        BannerMiddle,
        LastTravelItem
    },
  }
</script>
