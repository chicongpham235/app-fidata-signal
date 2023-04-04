<template>
  <v-col cols="12" sm="7">
    <h2 class="white--text my-4">Bullish and Bearish Crypto Signals</h2>
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

      <div style="width: 100%" v-if="count != 1">
        <v-text-field
          label="Search ..."
          append-icon="mdi-magnify"
          hide-details
          class="rounded-lg"
          style="
            background-color: #514c4c;
            width: 50%;
            display: inline-block !important;
          "
          v-model="search"
          color="#ffffff"
        ></v-text-field>
        <div style="width: 5%; display: inline-block"></div>
        <div
          style="
            width: 45%;
            display: inline-block;
            position: absolute;
            margin-top: 4px;
          "
        >
          <v-btn
            tile
            style="height: 44px; width: 64px"
            class="mr-1"
            :class="[trend == true ? 'btn-selected' : 'btn-default']"
            @click="onFilterTREND"
          >
            <span style="color: rgb(97, 100, 255); font-size: 12px">
              TREND
            </span>
          </v-btn>
          <v-btn
            tile
            style="height: 44px; width: 64px"
            class="mr-1"
            :class="[macd == true ? 'btn-selected' : 'btn-default']"
            @click="onFilterMACD"
          >
            <span style="color: rgb(97, 100, 255); font-size: 12px">
              MACD
            </span></v-btn
          >
          <v-btn
            tile
            style="height: 44px; width: 64px"
            class="mr-1"
            :class="[rsi == true ? 'btn-selected' : 'btn-default']"
            @click="onFilterRSI"
          >
            <span style="color: rgb(97, 100, 255); font-size: 12px"> RSI </span>
          </v-btn>

          <div style="width: 5%; display: inline-block"></div>
          <v-btn depressed @click="onFilterColumn()">
            <div class="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                class="v-icon__svg"
              >
                <path
                  d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                ></path>
              </svg>
              <div class="mt-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  class="v-icon__svg"
                  style="font-size: 14px; height: 14px; width: 14px"
                >
                  <path
                    d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                  ></path>
                </svg>
              </div>
            </div>
          </v-btn>

          <v-btn
            depressed
            @click="clickFavorite()"
            :color="check_favorite ? '#6164ff' : 'default'"
          >
            <div class="d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                class="v-icon__svg"
              >
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                ></path>
              </svg>
              <div class="mt-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  class="v-icon__svg"
                  style="font-size: 14px; height: 14px; width: 14px"
                >
                  <path
                    d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                  ></path>
                </svg>
              </div>
            </div>
          </v-btn>
        </div>
        <!-- <div style="width: 15%; display: inline-block">

        </div> -->
      </div>

      <v-data-table
        :search="search"
        :custom-filter="customSearch"
        dark
        dense
        class="elevation-1"
        sort-by="calories"
        :items-per-page="30"
        :footer-props="{
          'items-per-page-options': [30],
        }"
        :loading="loadingTable"
        :page="1"
        :headers="headers"
        :items="items"
        v-if="count > 1 && items.length > 0"
        :style="[
          items.length > 15
            ? {
                height: 'calc(100vh - 36px - 48px - 37px)',
                'overflow-y': 'auto',
              }
            : {},
        ]"
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
              <td class="text-row" v-if="index % 3 === 0" rowspan="3">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                      @click="showPopup(item.coin_symbol)"
                      class="d-flex align-center justify-evenly coin-name"
                    >
                      <v-btn
                        small
                        width="40"
                        depressed
                        @click.stop="addFavorite(item)"
                        class="mr-2"
                        color="transparent"
                      >
                        <div
                          class="d-flex"
                          style="
                            position: -webkit-sticky;
                            position: sticky;
                            left: 0;
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-hidden="true"
                            class="v-icon__svg"
                            :class="[
                              checkFavorite(item) ? 'color-favorite' : '',
                            ]"
                          >
                            <path
                              d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            ></path>
                          </svg>
                        </div>
                      </v-btn>
                      <img
                        style="
                          width: 30px;
                          padding-right: 8px;
                          vertical-align: middle;
                        "
                        :src="getSrc(item.coin_symbol)"
                      />
                      <div
                        class="ml-3 text-left"
                        style="width: 150px; font-size: 17px"
                      >
                        {{ item.symbol_name }}
                        <span class="text-caption">{{ item.coin_symbol }}</span>

                        <div>
                          <i
                            v-if="
                              getColorToChange(item.percent_change_5min) ==
                              `red--text`
                            "
                            style="
                              font-size: 9px;
                              color: red;
                              margin-right: 8px;
                            "
                            class="fa-solid fa-chevron-down"
                          ></i>
                          <i
                            v-else
                            style="
                              font-size: 9px;
                              color: green;
                              margin-right: 8px;
                            "
                            class="fa-solid fa-chevron-up"
                          ></i>
                          <span
                            v-bind:class="
                              getColorToChange(item.percent_change_5min)
                            "
                            class="text-subtitle-2 mr-2"
                            >${{ getPrice(item.coin_price) }}</span
                          >
                          <span
                            class="text-caption"
                            v-bind:class="
                              getColorToChange(item.percent_change_5min)
                            "
                            >{{ item.percent_change_5min }}</span
                          >
                        </div>
                        <div>
                          <span class="text-caption mr-1">Technical:</span>
                          <span
                            v-bind:class="getColorToScore(item.technical_score)"
                            class="text-caption"
                            >{{ item.technical_score }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </template>
                  <span class="white--text text-caption"
                    >Click show details
                  </span>
                </v-tooltip>
              </td>
              <td class="text-row" v-if="item.type == 'TREND' && trend">
                {{ item.type }}
              </td>
              <td class="text-row" v-else-if="item.type == 'MACD' && macd">
                {{ item.type }}
              </td>
              <td class="text-row" v-else-if="item.type == 'RSI' && rsi">
                {{ item.type }}
              </td>
              <!-- <td class="text-row" v-else></td> -->
              <td
                class="text-row"
                v-if="item.type == 'TREND' && trend && filterColumn('24H')"
              >
                <span :class="getColor(getState(item?.signals, `24h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "24h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'MACD' && macd && filterColumn('24H')"
              >
                <span :class="getColor(getState(item?.signals, `24h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "24h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'RSI' && rsi && filterColumn('24H')"
              >
                <span :class="getColor(getState(item?.signals, `24h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "24h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <!-- <td v-else></td> -->

              <td
                class="text-row"
                v-if="item.type == 'TREND' && trend && filterColumn('4H')"
              >
                <span :class="getColor(getState(item?.signals, `4h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "4h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'MACD' && macd && filterColumn('4H')"
              >
                <span :class="getColor(getState(item?.signals, `4h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "4h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'RSI' && rsi && filterColumn('4H')"
              >
                <span :class="getColor(getState(item?.signals, `4h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "4h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <!-- <td v-else></td> -->

              <td
                class="text-row"
                v-if="item.type == 'TREND' && trend && filterColumn('1H')"
              >
                <span :class="getColor(getState(item?.signals, `1h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "1h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'MACD' && macd && filterColumn('1H')"
              >
                <span :class="getColor(getState(item?.signals, `1h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "1h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'RSI' && rsi && filterColumn('1H')"
              >
                <span :class="getColor(getState(item?.signals, `1h`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "1h") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <!-- <td class="text-row" v-else></td> -->

              <td
                class="text-row"
                v-if="item.type == 'TREND' && trend && filterColumn('30 Min')"
              >
                <span :class="getColor(getState(item?.signals, `30min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "30min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="
                  item.type == 'MACD' && macd && filterColumn('30 Min')
                "
              >
                <span :class="getColor(getState(item?.signals, `30min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "30min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'RSI' && rsi && filterColumn('30 Min')"
              >
                <span :class="getColor(getState(item?.signals, `30min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "30min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <!-- <td v-else></td> -->

              <td
                class="text-row"
                v-if="item.type == 'TREND' && trend && filterColumn('15 Min')"
              >
                <span :class="getColor(getState(item?.signals, `15min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "15min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="
                  item.type == 'MACD' && macd && filterColumn('15 Min')
                "
              >
                <span :class="getColor(getState(item?.signals, `15min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "15min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'RSI' && rsi && filterColumn('15 Min')"
              >
                <span :class="getColor(getState(item?.signals, `15min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "15min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <!-- <td v-else></td> -->

              <td
                class="text-row"
                v-if="item.type == 'TREND' && trend && filterColumn('5 Min')"
              >
                <span :class="getColor(getState(item?.signals, `5min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "5min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'MACD' && macd && filterColumn('5 Min')"
              >
                <span :class="getColor(getState(item?.signals, `5min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "5min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <td
                class="text-row"
                v-else-if="item.type == 'RSI' && rsi && filterColumn('5 Min')"
              >
                <span :class="getColor(getState(item?.signals, `5min`))">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on">
                        {{ getState(item?.signals, "5min") }}</span
                      >
                    </template>
                    <span class="white--text"
                      >Timestamp:
                      {{ getTimeStampToolip(item.updated_at) }}</span
                    >
                  </v-tooltip>
                </span>
              </td>
              <!-- <td v-else></td> -->
            </tr>
          </tbody>
        </template>
        <template #footer>
          <v-spacer />
        </template>
      </v-data-table>
      <PopUp ref="formCoin" />
    </v-card>
    <ColumnDialog
      ref="columnDialog"
      :listFields="listFields"
      @reset="reset"
    ></ColumnDialog>
  </v-col>
</template>
<script>
import PopUp from "./PopUp.vue";
import ColumnDialog from "./ColumnDialog.vue";
import axios from "axios";
import {
  getSrc,
  getTimeTableRight,
  getColor,
  getState,
  getPrice,
  getColorToChange,
  getColorToScore,
  getTimeStampToolip,
} from "./helper.js";

export default {
  components: {
    PopUp,
    ColumnDialog,
  },
  props: {
    loadingTable: { type: Boolean, required: true },
    items: { type: Array, required: true },
    count: { type: Number },
  },
  data: () => ({
    search: "",
    oldHeaders: [
      { sortable: true, text: "", value: "symbol_name", width: "16%" },
      { sortable: false, text: "", value: "type" },
      { sortable: false, text: "24H", align: "center" },
      { sortable: false, text: "4H", align: "center" },
      { sortable: false, text: "1H", align: "center" },
      { sortable: false, text: "30 Min", align: "center" },
      { sortable: false, text: "15 Min", align: "center" },
      { sortable: false, text: "5 Min", align: "center" },
    ],
    headers: [
      { sortable: true, text: "", value: "symbol_name", width: "16%" },
      { sortable: false, text: "", value: "type" },
      { sortable: false, text: "24H", align: "center" },
      { sortable: false, text: "4H", align: "center" },
      { sortable: false, text: "1H", align: "center" },
      { sortable: false, text: "30 Min", align: "center" },
      { sortable: false, text: "15 Min", align: "center" },
      { sortable: false, text: "5 Min", align: "center" },
    ],
    check_favorite: false,
    items_favorite: [],
    getSrc,

    getTimeTableRight,
    getColor,
    getState,
    getPrice,
    getColorToChange,
    getColorToScore,
    getTimeStampToolip,
    rsi: true,
    macd: true,
    trend: true,
    listFields: [
      {
        text: "24H",
        value: "24h",
      },
      {
        text: "4H",
        value: "4h",
      },
      {
        text: "1H",
        value: "1h",
      },
      {
        text: "30 Min",
        value: "30 min",
      },
      {
        text: "15 Min",
        value: "15 min",
      },
      {
        text: "5 Min",
        value: "5 min",
      },
    ],
    selectedHeaders: ["24H", "4H", "1H", "30 Min", "15 Min", "5 Min"],
  }),
  watch: {
    selectedHeaders: {
      handler(value) {
        const temp1 = value.map((x) => x);
        let temp2 = this.oldHeaders.map((x) => {
          return x.text;
        });
        temp2 = temp2.filter((x) => x);
        if (this.arraysEqual(temp1, temp2)) this.headers = this.oldHeaders;
        else {
          this.headers = this.headers.filter((x) => {
            if (x.text.length > 0) return value.includes(x.text);
            else return true;
          });
        }
      },
    },
  },
  computed: {},
  methods: {
    filterColumn(text) {
      if (this.headers.find((x) => x.text == text)) return true;
      return false;
    },
    showPopup(item) {
      const data = axios.post(
        "https://app.fidata.pro/api/quantifycrypto-coin",
        {
          symbol: item,
        }
      );
      this.$refs.formCoin.showDialog(data.data);
    },
    onFilterTREND() {
      this.trend = !this.trend;
    },
    onFilterRSI() {
      this.rsi = !this.rsi;
    },
    onFilterMACD() {
      this.macd = !this.macd;
    },
    customSearch(value, search, item) {
      return (
        item &&
        (item.symbol_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
          item.coin_symbol
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()))
      );
    },
    onFilterColumn() {
      this.$refs.columnDialog.open();
    },
    reset(value) {
      this.selectedHeaders = value;
    },
    arraysEqual(a1, a2) {
      /* WARNING: arrays must not contain {objects} or behavior may be undefined */
      return JSON.stringify(a1) == JSON.stringify(a2);
    },
    checkFavorite({ coin_name }) {
      const list_coin = localStorage.getItem("COIN_FAVORITE");
      if (!list_coin) return false;
      return JSON.parse(list_coin).includes(coin_name);
    },
    clickFavorite() {
      this.check_favorite = !this.check_favorite;
      let items = this.items;
      if (this.check_favorite) {
        const check_list_coin = localStorage.getItem("COIN_FAVORITE");
        if (!check_list_coin) return;
        const list_coin = JSON.parse(check_list_coin);
        this.items_favorite = items.filter((x) =>
          list_coin.includes(x.coin_name)
        );
      } else {
        this.items_favorite = items;
      }
      this.$emit("filter:items-favorite", this.items_favorite);
    },
    addFavorite({ coin_name }) {
      const list_coin = localStorage.getItem("COIN_FAVORITE");
      if (!list_coin) {
        localStorage.setItem("COIN_FAVORITE", JSON.stringify([coin_name]));
      } else {
        let arr = JSON.parse(list_coin);
        if (arr.includes(coin_name)) {
          arr = arr.filter((x) => x != coin_name);
        } else {
          arr.unshift(coin_name);
        }
        localStorage.setItem("COIN_FAVORITE", JSON.stringify(arr));
        this.$emit("fetch-data");
      }
    },
  },
};
</script>
<style scoped>
.btn-selected {
  background-color: rgb(72 73 113) !important;
}
.btn-default {
  background-color: rgb(81, 76, 76) !important;
}
td {
  text-align: center;
}
.color-favorite {
  color: #ff9800;
}
.color-default {
  color: #ffffff;
}
</style>
