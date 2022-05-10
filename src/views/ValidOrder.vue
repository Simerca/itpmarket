<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Confirm your paiement</h1>
        <p>
          Be careful, you are about to provide a payment in XLM cryptocurrency,
          no backtracking is possible.
        </p>

        <h2>Order detail</h2>
        <v-simple-table class="mb-3">
          <tbody>
            <tr>
              <td class="text-left">Cart total</td>
              <td class="text-right">
                <span>
                  <i class="cf mr-3" :class="`cf-xlm`"></i>
                  <span class="font-weight-bold">{{
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "XLM",
                    }).format(cartTotal) || "--"
                  }}</span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="text-left">Shipping cost</td>
              <td class="text-right">
                <span>
                  <i class="cf mr-3" :class="`cf-xlm`"></i>
                  <span class="font-weight-bold">{{
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "XLM",
                    }).format(this.$shipCalculator(cartTotalWeight)) || "--"
                  }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-btn block color="primary" @click="openSecret = true;">
          Pay <i class="cf mx-3" :class="`cf-xlm`"></i>
          <span class="font-weight-bold">{{
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "XLM",
            }).format(cartTotal) || "--"
          }}</span>
        </v-btn>
      </v-col>
      <v-dialog v-model="openSecret">
          <v-card>
              <v-card-text>
                  <v-col cols=12>
                    <template v-if="!publicKey">
                      <h1>Provide your public key</h1>
                      <v-text-field class="mt-3" filled label="Wallet Public" v-model="userPublic"/>
                    </template>
                      <h1>Provide your secret key</h1>
                      <p>We not store your informations, we just provide a token exchange on Stellar Lumens Blockchain for validation</p>
                      <v-text-field filled label="Wallet Secret" v-model="userSecret"/>
                      <v-btn @click="sendPayment" :loading="loading" color="primary" block>Confirm</v-btn>
                  </v-col>
              </v-card-text>
          </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="error" top color="error">
      An error produce, please check sign key or connection
    </v-snackbar>
  </v-container>
</template>

<script>
window.Buffer = require("buffer").Buffer;
import * as StellarSdk from "stellar-sdk";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["publicKey", "cart"]),

    cartTotal(){
      let sum = 0;
      this.cart.map(map=>sum+=map.price)
      return sum+this.$shipCalculator(this.cartTotalWeight);
    },
    cartTotalWeight(){
      let sum = 0;
      this.cart.map(map=>sum+=(map.weight ? map.weight : 0))
      return sum
    }
  },
  data: () => ({
    loading:false,
    userSecret:null,
    userPublic:null,
    openSecret:false,
    error:false,
  }),
  methods: {
    async userSignTransaction(xdr, network = "TESTNET") {
      let signedTransaction = "";
      let error = "";

      try {
        signedTransaction = await window.freighterApi.signTransaction(
          xdr,
          network
        );
      } catch (e) {
        error = e;
      }

      if (error) {
        return error;
      }

      return signedTransaction;
    },
    async sendPayment() {
        this.loading = true;

      try {
      const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
      const destination =
        "GCCE37EIGK54QTJ6D4R5LENYHHMZ7Q5PNEF5RWA6FJOYWX554PO3A4B7";
      const amount = this.cartTotal.toString();
      const [
        {
          max_fee: { mode: fee },
        },
        sender,
      ] = await Promise.all([
        server.feeStats(),
        server.loadAccount(this.publicKey || this.userPublic),
      ]);
      console.log("sender", sender);
      const transaction = new StellarSdk.TransactionBuilder(sender, {
        fee,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          // This operation sends the destination account XLM
          StellarSdk.Operation.payment({
            destination,
            asset: StellarSdk.Asset.native(),
            amount,
          })
        )
        .setTimeout(30)
        .build();
          var keypair = StellarSdk.Keypair.fromSecret(this.userSecret);
          transaction.sign(keypair);
        // Submit the transaction to the Stellar network.
        const transactionResult = await server.submitTransaction(transaction);
        console.log("transactionResult", transactionResult);

        // recoupLumens(senderKeypair.secret());
        console.log(`Success! ${this.publicKey} paid ${destination} ${amount} XLM`);
        this.$router.push('/confirm-order');
      } catch (e) {
        this.error = true;
      }
        this.loading = false;
    },
  },
};
</script>

<style>
</style>