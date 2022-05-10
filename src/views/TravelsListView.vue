<template>
  <v-container>
    <v-row>
      <v-col cols=12>
          <v-card>
              <v-card-title>Travels</v-card-title>
              <v-card-text>
                  Follow your dream and book a travel in space with our space partner.
              </v-card-text>
          </v-card>
      </v-col>
      <v-col md=12 cols=12>
        <v-row>
            <v-col cols=12>
                Found <span class="primary--text">{{travels.length}}</span> item(s)
            </v-col>
          <v-col md=6 cols=12 v-for="(travel, i) in travels" :key="i">
            <card :travel="travel" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/Shop/Travels/Card.vue";
import travels from "@/assets/travels/travels-list.json";

export default {
  components: { Card },
  computed: {
  },
  data: () => ({
    travels: travels,
    filter: [],
  }),
};
</script>

<style>
</style>