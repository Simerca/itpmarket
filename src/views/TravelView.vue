<template>
  <v-col>
    <v-container>
      <!-- Ariane feed -->
      <v-col>
        <router-link tag="a" to="/">Home</router-link> /
        <router-link tag="a" to="/travels">Travels</router-link> /
        <router-link tag="a" :to="`/travel/${$route.params.id}`">{{
          travels.find(map=>map.id == $route.params.id).title
        }}</router-link>
      </v-col>
      <single-travel :travel="travels.find(map=>map.id == $route.params.id)" />
    </v-container>
  </v-col>
</template>

<script>
import SingleTravel from "@/components/Shop/Travels/SingleTravel.vue";
import travels from "@/assets/travels/travels-list.json";
export default {
  components: { SingleTravel },
  data: () => ({
    travels: travels,
  }),
};
</script>

<style>
</style>