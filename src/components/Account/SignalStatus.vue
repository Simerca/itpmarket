<template>
  <v-card>
    <v-card-text>
      <v-simple-table>
        <tbody>
          <tr>
            <td>INTERNET STATUS</td>
            <td>
              {{ online }}
            </td>
          </tr>
          <tr>
            <td>LAST SYNC</td>
            <td>
              {{ $moment(lastSync).format("ddd DD MMM YYYY HH:mm") }} ({{$moment().diff($moment(lastSync).subtract(), 'minutes')}}min)
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SignalStatusComponent",
  data: () => ({
    online: false,
    lastSync: null,
  }),
  mounted() {
    this.online = window.navigator.onLine;
    if (this.online) {
      this.lastSync = this.$moment();
    }
    setInterval(() => {
      this.online = window.navigator.onLine;
      if (this.online) {
        this.lastSync = this.$moment();
      }
    }, 5000);
  },
};
</script>

<style>
</style>