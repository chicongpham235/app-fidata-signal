<template>
  <v-col cols="12" sm="5">
    <h2 style="position: relative" class="white--text my-4">
      Alert Strem
      <v-menu
        :close-on-click="false"
        :close-on-content-click="false"
        bottom
        offset-y
        :max-width="250"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            style="
              position: absolute;
              top: 50%;
              right: 4px;
              transform: translateY(-50%);
            "
            class="rounded-lg"
            color="transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              role="img"
              aria-hidden="true"
              class="v-icon__svg"
            >
              <path
                d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
              ></path>
            </svg>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-row>
              <v-col cols="12" class="pt-4 pb-2">
                <div class="text-caption">Settings</div>
                <div class="text-caption grey--text">
                  Customize Alert Stream
                </div>
                <v-divider class="mt-2"></v-divider>
              </v-col>
              <v-col cols="12" class="pb-4">
                <v-text-field
                  label="Symbols"
                  color="#ffffff"
                  dense
                  dark
                  no-label
                  hide-details
                  class="text-caption"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0 pt-4 text-caption">Alert Type</v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  label="TREND"
                  v-model="type.trend"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  label="RSI"
                  v-model="type.rsi"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-checkbox
                  label="MACD"
                  v-model="type.macd"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="12" class="pb-0 pt-4 text-caption">
                Candlestick
              </v-col>
              <v-col cols="6" class="py-0">
                <v-checkbox
                  label="5min"
                  v-model="intervals['5min']"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-checkbox
                  label="24h"
                  v-model="intervals['24h']"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-checkbox
                  label="15min"
                  v-model="intervals['15min']"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-checkbox
                  label="4h"
                  v-model="intervals['4h']"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6" class="pt-0 pb-6">
                <v-checkbox
                  label="30min"
                  v-model="intervals['30min']"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6" class="pt-0 pb-6">
                <v-checkbox
                  label="1h"
                  v-model="intervals['1h']"
                  :true-value="true"
                  :false-value="false"
                  dark
                  dense
                  class="checkbox"
                  color="#6164ff"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-menu>
    </h2>
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
        fixed-header
        :headers="headers"
        :items="items"
        :footer-props="{
          'items-per-page-options': [-1],
        }"
        hide-default-footer
        class="elevation-1"
        :id="[items.length > 18 ? 'table' : '']"
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
          <tbody>
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
        width: "16%",
        text: "Type",
        value: "type",
      },
      {
        sortable: true,
        width: "18%",
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
        width: "23%",
        text: "Time",
        value: "updated_at",
      },
    ],
    oldItems: [],
    intervals: {
      "24h": true,
      "4h": true,
      "1h": true,
      "30min": true,
      "15min": true,
      "5min": true,
    },
    type: { trend: true, rsi: true, macd: true },
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
        this.oldItems = oldVal;
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
      const idx = this.oldItems.findIndex((x) => x.id == item.id);
      if (this.oldItems[idx]?.state != item.state) return true;
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
#table >>> .v-data-table__wrapper {
  height: calc(100vh - 36px - 32px);
  overflow-y: auto;
}
.checkbox >>> .v-input__control .v-input__slot .v-label {
  font-size: 12px;
}
</style>
