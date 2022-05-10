<template>
  <v-container>
    <v-row class="mt-16">
      <v-col lg=6 md=12>
        <h2>Already have Wallet ?</h2>
        <template v-if="userFreighter">
        <v-btn class="my-6" block color="primary" @click="loadFreighterAccount()">Use Freighter</v-btn>
        Or 
        <v-divider />
        </template>
        <v-text-field class="mt-6" v-model="inputWallet" filled dense label="Your public key" />
        <v-btn color="primary" @click="loadAccount()" block>Connect Wallet</v-btn>
      </v-col>
      <v-col lg=6 md=12 v-if="!userWallet">
        <h2>Create a <i class="cf cf-xlm"></i> Stellar Lumens (XLM) Wallet</h2>
        <v-btn
          class="mt-6"
          color="primary"
          :loading="loading"
          block
          @click="createTestAccount()"
          >Create new Wallet</v-btn
        >
        
      </v-col>
      <v-col lg=6 cols=12  v-if="userWallet">
        <h3 class="error--text">
          Warning : Save your secret key now, if you lost it, you lost your
          account access.
        </h3>
        <v-text-field filled label="Public Key" v-model="userWallet.publicKey" />
        <v-text-field filled label="Secret Key" v-model="userWallet.secret" />
      </v-col>
    </v-row>
    <v-snackbar top block color="error" v-model="error">The key is Invalid</v-snackbar>
  </v-container>
</template>

<script>
/* eslint-disable */
window.Buffer = require("buffer").Buffer;
import * as StellarSdk from "stellar-sdk";
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    inputWallet:null,
    userWallet: false,
    userFreighter:false,
    error:false,
  }),
  methods: {
    async loadFreighterAccount()
    {
      var publicKey = await window.freighterApi.getPublicKey();
      console.log(publicKey);
      this.inputWallet = publicKey;
      this.loadAccount();

    },
    async loadAccount()
    {
      try {
        StellarSdk.Keypair.fromPublicKey(this.inputWallet);
      }catch(err)
      {
        console.error(err);
        this.error = true;
      }
      this.$store.dispatch('setPublicKey', this.inputWallet);
      this.$router.push('/dashboard')
    },
    async createTestAccount() {
      this.loading = true;
      const pair = StellarSdk.Keypair.random();
      try {
        console.log(
          "Funding a new account on the test network (takes a few seconds)…"
        );
        const { data } = await axios.get(
          `https://friendbot.stellar.org?addr=${pair.publicKey()}`
        );
        console.log(`Public Key: ${pair.publicKey()}`);
        console.log(`Secret Key: ${pair.secret()}`);
        
        console.log("data", data);
      } catch (e) {
        console.error("Oh no! Something went wrong:", e);
      }
      this.userWallet = 
        {
            publicKey:pair.publicKey(),
            secret:pair.secret(),
        }
        this.inputWallet = this.userWallet.publicKey;
      this.loading = false;
    },
  },
  mounted(){
    this.userFreighter = false;
    if (window.freighterApi.isConnected()) {
      this.userFreighter = true;
    }
  }
};
</script>

<style>
</style>