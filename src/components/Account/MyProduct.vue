<template>
  <v-col>
    <v-data-table :items="orders" :headers="headers"></v-data-table>
  </v-col>
</template>

<script>
export default {
  name: "MyProductComponent",
  data: () => ({
    headers: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Product",
        value: "item.name",
      },
      {
        text: "Description",
        value: "item.description",
      },
      {
        text: "Amount",
        value: "item.amount",
      },
    ],
    orders: [],
  }),
};
</script>

<style>
</style>