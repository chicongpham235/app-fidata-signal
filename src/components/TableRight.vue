<template>
  <v-col cols="12" sm="5">
    <h2 class="white--text my-4">Alert Strem</h2>
    <v-card :loading="loadingTable" color="#1e1e1e">
      <template v-if="count == 1" slot="progress">
        <v-progress-linear
          absolute
          color="#6164ff"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title
        class="d-flex justify-center align-center"
        v-if="loadingTable && count == 1"
      >
        <p class="white--text text-caption mx-auto my-0">
          Loading table... Please wait
        </p>
      </v-card-title>

      <v-data-table
        v-if="count > 1 && items.length > 0"
        dark
        dense
        :headers="headers"
        :items="items"
        :items-per-page="23"
        :footer-props="{
          'items-per-page-options': [-1],
        }"
        hide-default-footer
        class="elevation-1"
        :style="[
          items.length > 13
            ? { height: 'calc(100vh - 36px - 37px)', 'overflow-y': 'auto' }
            : {},
        ]"
        :loading="loadingTable"
      >
        <template slot="progress">
          <v-progress-linear
            absolute
            color="#6164ff"
            indeterminate
          ></v-progress-linear>
        </template>
        <template v-slot:headers="{ headers }">
          <thead>
            <tr>
              <td v-for="(item, index) in headers" :key="index">
                {{ item.text }}
              </td>
            </tr>
          </thead>
        </template>
        <template v-slot:body="{ items }">
          <tbody class="hehe">
            <tr
              v-for="(item, index) in items"
              :key="index"
              :class="[getStatus(item) ? 'item-changed' : '']"
            >
              <td class="text-row">{{ item.coin_symbol }}</td>
              <td class="text-row">
                <span :class="getColor(getState(item.state))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span
                        :class="[
                          getState(item.state) == 'BULLISH'
                            ? 'bullish-changed'
                            : getState(item.state) == 'BEARISH'
                            ? 'bearish-changed'
                            : 'neutral-changed',
                        ]"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ getState(item.state) }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>

              <td class="text-row">{{ item.type }}</td>

              <td class="text-row" style="color: rgb(156 163 175)">
                {{ item.interval }}
              </td>
              <td class="text-row">${{ getPrice(item.coin_price) }}</td>
              <td class="text-row" style="color: rgb(156 163 175)">
                {{ getTimeTableRight(item.updated_at) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>
<script>
import {
  getSrc,
  getTimeTableRight,
  getColor,
  getPrice,
  getColorToChange,
  getColorToScore,
  getTimeStampToolip,
} from "./helper.js";

export default {
  components: {},
  props: {
    loadingTable: { type: Boolean, required: true },
    items: { type: Array, required: true },
    count: { type: Number },
  },
  data: () => ({
    headers: [
      {
        sortable: false,
        width: "5%",
        text: "Symbol",
        value: "coin_symbol",
      },
      { sortable: true, width: "19%", text: "State" },
      {
        sortable: false,
        width: "19%",
        text: "Type",
        value: "type",
      },
      {
        sortable: true,
        width: "19%",
        text: "Candle",
        value: "type",
      },
      {
        sortable: true,
        width: "19%",
        text: "Price",
        value: "coin_price",
      },
      {
        sortable: false,
        width: "18%",
        text: "Time",
        value: "updated_at",
      },
    ],
    oldItems: [],
    getSrc,
    getTimeTableRight,
    getColor,
    getPrice,
    getColorToChange,
    getColorToScore,
    getTimeStampToolip,
  }),
  watch: {
    items: {
      handler(newVal, oldVal) {
        if (this.count == 2) this.oldItems = newVal;
        else this.oldItems = oldVal;
      },
    },
  },
  methods: {
    getState(state) {
      if (!state) {
        return "";
      }
      let standard = state;
      standard = standard.toUpperCase();
      return standard;
    },
    getStatus(item) {
      if (!this.oldItems.includes(item)) return true;
      return false;
    },
  },
};
</script>

<style scoped>
@keyframes bullish-change {
  from {
    background-color: #4caf50;
    color: #ffffff;
  }
  to {
    background-color: transparent;
    color: #4caf50;
  }
}

.bullish-changed {
  animation: bullish-change 2s forwards;
}

@keyframes neutral-change {
  from {
    background-color: #ff9800;
    color: #ffffff;
  }
  to {
    background-color: transparent;
    color: #ff9800;
  }
}

.neutral-changed {
  animation: neutral-change 2s forwards;
}

@keyframes bearish-change {
  from {
    background-color: #f44336;
    color: #ffffff;
  }
  to {
    background-color: transparent;
    color: #f44336;
  }
}

.bearish-changed {
  animation: bearish-change 2s forwards;
}
@keyframes item-change {
  from {
    background-color: #7f9e7f;
  }
  to {
    background-color: transparent;
  }
}
.item-changed {
  animation: item-change 2s;
}
</style>
