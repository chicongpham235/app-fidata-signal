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
        style="height: calc(100vh - 36px - 37px); overflow-y: auto"
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
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-row">{{ item.coin_symbol }}</td>
              <td class="text-row">
                <span :class="getColor(getState(item.state))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
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
    getTimeTableRight,
    getColor,
    getPrice,
    getColorToChange,
    getColorToScore,
    getTimeStampToolip,
  }),
  methods: {
    getState(state) {
      if (!state) {
        return "";
      }
      let standard = state;
      standard = standard.toUpperCase();
      return standard;
    },
  },
};
</script>
