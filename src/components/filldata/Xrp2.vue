<template>
  <v-card color="#202022" class="rounded-lg" flat>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card color="#292828">
          <!-- <v-btn color="green" small>
            <v-icon color="white">far fa-dollar-sign</v-icon>
          </v-btn>
          <h2 class="white--text">$8.779,58</h2>
          <h6 class="grey--text">Availlable Ballance</h6>
          <v-btn color="#524EED" dark class="withoutupercase mt-2"
            >Link Accounts</v-btn
          > -->
          <div>
            <highcharts :options="highchartOptions"></highcharts>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card color="#292828">
          <v-card-title class="white--text">Filldata Crytop Trend</v-card-title>
          <div>
            <Bar
              :chart-options="chartOptions"
              :chart-data="chartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="5">
        <v-card color="#292828">
          <v-card-title class="white--text">Key Price</v-card-title>
          <v-row>
            <v-col cols="12" sm="6">
              <h4 class="white--text">Entry Price Level</h4>
              <v-simple-table dense dark fixed-header height="100%">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">#</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col cols="12" sm="6">
              <h4 class="white--text">Tager Price Level</h4>
              <v-simple-table dense dark fixed-header height="100%">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">#</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts2" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          "5 minutes",
          "15 minutes",
          "30 minutes",
          "1h",
          "2h",
          "4h",
          "24h",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: [
              "#ff6384",
              "#36a2eb",
              "#cc65fe",
              "#ffce56",
              "#ffce56",
              "#ff6384",
              "#ffce56",
            ],
            data: [10, 20, 12, 39, 55, 70, 66],
          },
        ],
      },
      chartOptions: {
        indexAxis: "y",
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                stepSize: 20,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
        barThickness: 15,
        categoryPercentage: 0.6,
      },

      highchartOptions: {
        chart: {
          type: "gauge",
          plotBackgroundColor: "#363434",
          plotBackgroundImage: "#363434",
          plotBorderWidth: 0,
          plotShadow: false,
          height: "80%",
          backgroundColor: "#363434",
        },
        exporting: { enabled: false },

        title: {
          text: "Speedometer",
        },

        pane: {
          startAngle: -90,
          endAngle: 89.9,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 200,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor: "#363434",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
            },
          },
          plotBands: [
            {
              from: 0,
              to: 120,
              color: "#55BF3B", // green
              thickness: 20,
            },
            {
              from: 120,
              to: 160,
              color: "#DDDF0D", // yellow
              thickness: 20,
            },
            {
              from: 160,
              to: 200,
              color: "#DF5353", // red
              thickness: 20,
            },
          ],
        },

        series: [
          {
            name: "Speed",
            data: [80],
            tooltip: {
              valueSuffix: " km/h",
            },
            dataLabels: {
              format: "{y} km/h",
              borderWidth: 0,
              color: "#363434",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
            },
          },
        ],
      },

      desserts: [
        {
          name: "Entry 1",
          calories: 159,
        },
        {
          name: "Entry 2",
          calories: 159,
        },
        {
          name: "Entry 3",
          calories: 159,
        },
      ],
      desserts2: [
        {
          name: "Taget 1",
          calories: 159,
        },
        {
          name: "Taget 2",
          calories: 159,
        },
        {
          name: "Taget 3",
          calories: 159,
        },
      ],
    };
  },
};
</script>
<style scoped></style>
