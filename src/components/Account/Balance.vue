<template>
  <v-card>
    <v-card-title style="display: block">
      Account balance<br />
      <i class="cf mr-3 cf-xlm"></i>
      <span class="font-weight-bold">{{
        walletBalance
          ? new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "XLM",
            }).format(walletBalance)
          : "--.--"
      }}</span>
    </v-card-title>
    <v-card-text>
      <span
        >{{ publicKey }}</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BalanceComponent",
  computed: {
    ...mapState(["publicKey", "walletBalance"]),
  },
  data: () => ({
  }),
  methods: {
    async getBalance() {
      this.$axios
        .get(`https://horizon-testnet.stellar.org/accounts/${this.publicKey}`)
        .then((res) => {
          const { data } = res;
          let xlmBalance = data.balances.find(
            (map) => map.asset_type == "native"
          );
          this.$store.dispatch('setWalletBalance',xlmBalance.balance);
        });
    },
  },
  mounted() {
    this.getBalance();
  },
};
</script>

<style>
</style>