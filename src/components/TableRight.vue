<template>
  <v-col cols="12" sm="5">
    <h2 class="white--text my-4">Alert Strem</h2>
    <v-card :loading="loadingTable" color="#1e1e1e">
      <template slot="progress">
        <v-progress-linear color="green" indeterminate></v-progress-linear>
      </template>

      <v-card-title
        class="d-flex justify-center align-center"
        v-if="loadingTable"
      >
        <p class="white--text text-caption mx-auto my-0">
          Loading table... Please wait
        </p>
      </v-card-title>

      <v-data-table
        v-else
        dark
        dense
        :headers="headers"
        :items="items"
        :items-per-page="23"
        hide-default-footer
        class="elevation-1"
      >
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
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-row">{{ item.coin_symbol }}</td>
              <td class="text-row">
                <span :class="getColor(getState(item.signals, `24h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item.signals, "24h") }}</span
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

              <td class="text-row">{{ getRandom() }}</td>
              <td class="text-row">${{ getPrice(item.coin_price) }}</td>
              <td class="text-row">
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
  getRandom,
  getTimeTableRight,
  getColor,
  getState,
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
  },
  data: () => ({
    headers: [
      { sortable: false, width: "30px", text: "Symbol", value: "coin_symbol" },
      { sortable: false, width: "30px", text: "State", align: "center" },
      { sortable: false, width: "30px", text: "Type", value: "type" },
      { sortable: false, width: "30px", text: "Candle", value: "type" },
      {
        sortable: false,
        width: "30px",
        text: "Price",
        value: "coin_price",
        align: "center",
      },
      {
        sortable: false,
        width: "30px",
        text: "Time",
        value: "updated_at",
        align: "center",
      },
    ],
    getSrc,
    getRandom,
    getTimeTableRight,
    getColor,
    getState,
    getPrice,
    getColorToChange,
    getColorToScore,
    getTimeStampToolip,
  }),
  methods: {},
};
</script>
