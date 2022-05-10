<template>
  <v-col>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col>
            <h3>Our last travels</h3>
          </v-col>
          <v-col class="text-right"> <router-link tag="a" to="/travels" icon>See all</router-link> </v-col>
        </v-row>
        <v-divider />
      </v-col>
      <v-col lg=6 md=6 cols=12 v-for="(travel, i) in travels" :key="i">
        <card :travel="travel" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import Card from "./Travels/Card.vue";
import travels from "@/assets/travels/travels-list.json";
export default {
  components: { Card },
  data: () => ({
    travels: travels,
  }),
};
</script>

<style>
</style>