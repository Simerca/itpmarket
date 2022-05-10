<template>
  <v-container>
      <v-row>
          <v-col cols=12>
              <h1>Dashboard</h1>
          </v-col>
          <v-col md=4 cols=12>
              <balance />
          </v-col>
          <v-col md=8 cols=12>
              <signal-status />
          </v-col>
          <v-col cols=12>
              <panel />
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import Balance from '@/components/Account/Balance.vue'
import { mapState } from 'vuex'
import SignalStatus from '@/components/Account/SignalStatus.vue'
import Panel from '@/components/Account/Panel.vue'
export default {
  components: { Balance, SignalStatus, Panel },
    name:"DashboardView",
    computed:
    {
        ...mapState(["publicKey"])
    }
}
</script>

<style>

</style>