<template>
  <div>
    <v-row>
      <TableLeft :loading-table="loadingTableLeft" :items="itemsTableLeft" />
      <!-- <TableRight :loading-table="loadingTableRight" :items="itemsTableRight" /> -->
    </v-row>
  </div>
</template>

<script>
const TIME_REFRESH = 5 * 60 * 1000;
// import Popup from "./Popup.vue";
import TableLeft from "./TableLeft.vue";
// import TableRight from "./TableRight.vue";
import axios from "axios";

export default {
  components: {
    // Popup,
    TableLeft,
    // TableRight,
  },
  data: () => ({
    itemsTableLeft: [],
    itemsTableRight: [],
    loadingTableLeft: false,
    loadingTableRight: false,
    data_coin: [],
    data_signal: [],
  }),
  created() {
    this.interval = setInterval(() => {
      this.fetchData();
    }, TIME_REFRESH);
    this.fetchData();
  },
  beforeDestroy() {
    this.interval = clearInterval(this.interval);
  },
  methods: {
    async getChangePercentage(coin) {
      const data = await axios.post(
        "https://app.fidata.pro/api/quantifycrypto-coin",
        {
          symbol: coin,
        }
      );
      return data.data.coin_price;
    },

    async fetchData() {
      this.loadingTableLeft = true;
      this.loadingTableRight = true;
      await Promise.all([this.fetchDataSignal(), this.fetchDataCoin()]);
      this.itemsTableLeft = this.data_signal.map((x) => ({
        ...x,
        ...this.data_coin.find((e) => x.coin_symbol == e.coin_symbol),
      }));
      this.loadingTableLeft = false;
      this.loadingTableRight = false;
    },
    async fetchDataSignal() {
      try {
        const res = await axios.post(
          "https://app.fidata.pro/api/quantifycrypto-signal"
        );
        let data = res.data;
        data = data.reduce(function (accumulator, currentValue) {
          if (!accumulator[`${currentValue.symbol_name}_TREND`]) {
            accumulator[`${currentValue.symbol_name}_TREND`] = {
              id: currentValue.id,
              rank: currentValue.rank,
              coin_price: currentValue.coin_price,
              coin_symbol: currentValue.coin_symbol,
              symbol_name: currentValue.symbol_name,
              type: "TREND",
              created_at: new Date(Date.UTC(null)),
              updated_at: new Date(Date.UTC(null)),
            };
          }
          if (!accumulator[`${currentValue.symbol_name}_MACD`]) {
            accumulator[`${currentValue.symbol_name}_MACD`] = {
              id: currentValue.id,
              rank: currentValue.rank,
              coin_price: currentValue.coin_price,
              coin_symbol: currentValue.coin_symbol,
              symbol_name: currentValue.symbol_name,
              type: "MACD",
              created_at: new Date(Date.UTC(null)),
              updated_at: new Date(Date.UTC(null)),
            };
          }
          if (!accumulator[`${currentValue.symbol_name}_RSI`]) {
            accumulator[`${currentValue.symbol_name}_RSI`] = {
              id: currentValue.id,
              rank: currentValue.rank,
              coin_price: currentValue.coin_price,
              coin_symbol: currentValue.coin_symbol,
              symbol_name: currentValue.symbol_name,
              type: "RSI",
              created_at: new Date(Date.UTC(null)),
              updated_at: new Date(Date.UTC(null)),
            };
          }
          if (accumulator[`${currentValue.symbol_name}_${currentValue.type}`]) {
            accumulator[`${currentValue.symbol_name}_${currentValue.type}`] =
              new Date(
                accumulator[
                  `${currentValue.symbol_name}_${currentValue.type}`
                ].updated_at
              ) < new Date(currentValue.updated_at)
                ? currentValue
                : accumulator[
                    `${currentValue.symbol_name}_${currentValue.type}`
                  ];
          }
          return accumulator;
        }, {});
        data = Object.keys(data).map(function (key) {
          return data[key];
        });
        this.data_signal = data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchDataCoin() {
      try {
        const res = await axios.post(
          "https://app.fidata.pro/api/quantifycrypto-coin"
        );
        const data = res.data;
        this.data_coin = data;
      } catch (err) {
        console.error(err);
      }
    },
    onFilterTREND() {},
    onFilterRSI() {},
    onFilterMACD() {},
  },
};
</script>
<style scoped>
.v-text-field .v-label {
  color: olivedrab I !important;
}

.v-text-field__slot #input-10 {
  color: red !important;
}

.v-input__append-inner .v-input__icon i {
  color: green !important;
}
.coin-name:hover {
  cursor: pointer;
}
.text-row {
  font-size: 12px !important;
}
</style>
