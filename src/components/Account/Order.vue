<template>
  <v-col>
    <v-data-table :items="orders" :headers="headers">
      <template v-slot:[`item.id`]="{item}">
        {{item.id.substr(0,16)}}...
      </template>
      <template v-slot:[`item.amount`]="{item}">
        {{
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "XLM",
            }).format(item.amount) || "--"
          }}
      </template>
    </v-data-table>
  </v-col>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "OrserComponent",
  computed:{
    ...mapState(['publicKey'])
  },
  data: () => ({
    headers: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Amount",
        value: "amount",
      },
      {
        text: "Created At",
        value: "created_at",
      },
    ],
    orders: [],
  }),
  methods:{
    getOrders()
    {
      this.$axios.get(`https://horizon-testnet.stellar.org/accounts/${this.publicKey}/payments?order=desc`).then(res=>{
        let {data} = res
        let orders = data._embedded.records
        this.orders = orders.filter(map=>map.type == 'payment')
      })
    }
  },
  mounted()
  {
    this.getOrders()
  }
};
</script>

<style>
</style>