<template>
  <v-card :to="`/travel/${travel.id}`">
    
    <v-img 
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    height="200px" class="align-end" :src="travel.featured_image">
      <v-card-title style="display:block;">
        <span style="font-size:.8em">
          {{ travel.provider.name }}</span> <br/>
          <span>
        {{ travel.title || "--" }}
          </span>
      </v-card-title>
    </v-img>
    <v-card-text>
      <span style="font-size: 0.8em;" class="primary--text">{{ travel.category.name || "--" }}</span
      ><br />
      {{ travel.description || "--" }}
      <br/>
      <b>Departure :</b> {{$moment(travel.departure.time).format('ddd DD MMM YYYY HH:mm [GMT]')}}<br/>
      <b>Arrival :</b> {{$moment(travel.arrival.time).format('ddd DD MMM YYYY HH:mm [GMT]')}}
    </v-card-text>
    <v-card-actions class="px-4">
      {{travel.from.planet || '--'}} => {{travel.to.planet || '--'}} 
      <v-spacer />
        <i class="cf mr-3" :class="`cf-${travel.currency.toLowerCase()}`"></i>
        <span class="font-weight-bold">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency:travel.currency }).format(travel.price) || "--" }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardComponent",
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
};
</script>

<style>
</style>