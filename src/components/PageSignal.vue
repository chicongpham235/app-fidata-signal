<template>
  <!-- <div> -->
  <v-row>
    <TableLeft
      :count="count"
      :loading-table="loadingTableLeft"
      :items="itemsTableLeft"
      @fetch-data="fetchData"
      @filter:items-favorite="onFilterFavorite"
      ref="tableLeft"
    />
    <TableRight
      :count="count"
      :loading-table="loadingTableRight"
      :items="itemsTableRight"
    />
  </v-row>
  <!-- </div> -->
</template>

<script>
const TIME_REFRESH = 5 * 60 * 1000;
// import Popup from "./Popup.vue";
import TableLeft from "./TableLeft.vue";
import TableRight from "./TableRight.vue";
import axios from "axios";
import { getRandom } from "./helper";

// function getDifference(array1, array2) {
//   return array1.filter(object1 => {
//     return !array2.some(object2 => {
//       return object1.id === object2.id;
//     });
//   });
// }

export default {
  components: {
    // Popup,
    TableLeft,
    TableRight,
  },
  data: () => ({
    items: [],
    itemsTableLeft: [],
    itemsTableRightAfter: [],
    itemsTableRightBefore: [],
    itemsTableRight: [],
    loadingTableLeft: false,
    loadingTableRight: false,
    data_coin: [],
    data_signal: [],
    count: 1,
    getRandom,
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
    async fetchData() {
      this.loadingTableLeft = true;
      this.loadingTableRight = true;
      await Promise.all([this.fetchDataSignal(), this.fetchDataCoin()]);
      this.items = this.data_signal.map((x) => ({
        ...x,
        ...this.data_coin.find((e) => x.coin_symbol == e.coin_symbol),
      }));
      this.itemsTableLeft = [...this.items];
      if (this.itemsTableRightBefore.length == 0) {
        this.itemsTableRightBefore = this.items.map((x) => {
          let signals = "{}";
          if (x?.signals) {
            signals = JSON.parse(x.signals) ?? "{}";
            signals = signals.map((x) => {
              return { interval: x.interval, state: x.state };
            });
            signals = JSON.stringify(signals);
          }
          return {
            rank: x.rank,
            type: x.type,
            coin_symbol: x.coin_symbol,
            signals: signals,
            coin_price: x.coin_price,
            updated_at: x.updated_at,
          };
        });
        this.itemsTableRight = [...this.itemsTableRightBefore];
        this.itemsTableRight = [
          ...new Map(this.itemsTableRight.map((x) => [x["rank"], x])).values(),
        ].sort((a, b) =>
          String(b.updated_at).localeCompare(String(a.updated_at))
        );
        this.itemsTableRight = this.itemsTableRight.map((x) => {
          let signals = JSON.parse(x.signals);
          const random = getRandom();
          signals = Object.values(signals);
          const signal = signals.filter(
            (x) => x.interval == random || x.interval
          )[0];
          return { ...x, interval: signal?.interval, state: signal?.state };
        });
        this.itemsTableRight = this.itemsTableRight
          .filter((x) => x.interval && x.state)
          .slice(0, 30);
      } else {
        this.itemsTableRightAfter = this.items.map((x) => {
          let signals = "{}";
          if (x?.signals) {
            signals = JSON.parse(x.signals) ?? "{}";
            signals = signals.map((x) => {
              return { interval: x.interval, state: x.state };
            });
            signals = JSON.stringify(signals);
          }
          return {
            rank: x.rank,
            type: x.type,
            coin_symbol: x.coin_symbol,
            signals: signals,
            coin_price: x.coin_price,
            updated_at: x.updated_at,
          };
        });
        for (let index = 0; index < this.itemsTableRightAfter.length; index++) {
          if (
            this.itemsTableRightAfter[index].signals &&
            this.itemsTableRightAfter[index].signals !=
              this.itemsTableRightBefore[index].signals
          ) {
            let before = JSON.parse(this.itemsTableRightBefore[index].signals);
            let after = JSON.parse(this.itemsTableRightAfter[index].signals);
            let diff = after.filter((x) => {
              return before.some(
                (y) => y.interval == x.interval && y.state != x.state
              );
            });
            diff.forEach((item) => {
              this.itemsTableRight.push({
                ...item,
                ...this.itemsTableRightAfter[index],
              });
            });
          }
        }
        this.itemsTableRightBefore = [...this.itemsTableRightAfter];
      }
      this.count++;
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
    onFilterFavorite(items) {
      if (this.$refs.tableLeft.check_favorite) {
        this.itemsTableLeft = items;
      } else {
        this.itemsTableLeft = this.items;
      }
    },
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
