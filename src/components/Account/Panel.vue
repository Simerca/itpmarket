<template>
  <v-card>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Orders</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <order />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import Order from "./Order.vue";
export default {
  components: { Order },
  name: "PanelComponent",
  data: () => ({
    tab: 0,
  }),
};
</script>

<style>
</style>