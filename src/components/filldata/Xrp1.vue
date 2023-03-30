<template>
  <v-card color="#202022" class="rounded-lg" flat>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card color="transparent">
          <!-- A-->
          <div class="d-flex align-baseline ml-2">
            <v-btn color="green" small>
              <v-icon color="white">far fa-dollar-sign</v-icon>
            </v-btn>
            <h2 class="white--text ml-3">XRP</h2>
            <span> <b class="red--text ml-4">XRP</b> </span>
          </div>
          <!-- B-->
          <div class="mt-2 ml-3">
            <div class="mt-2">
              <span class="text-caption grey--text font-weight-light"
                >Website</span
              >
              <v-btn x-small class="ml-4" color="secondary" dark>
                <v-icon class="mr-2" x-small color="white">mdi-link</v-icon>
                ripple.com
              </v-btn>
            </div>
            <div class="mt-2">
              <span class="text-caption grey--text font-weight-light"
                >Explorer</span
              >
              <v-btn x-small class="ml-4" color="secondary" dark>
                <v-icon class="mr-2" x-small color="white"
                  >mdi-search-web</v-icon
                >
                blockchair.com
              </v-btn>
            </div>
            <div class="mt-2">
              <span class="text-caption grey--text font-weight-light"
                >Source code</span
              >
              <v-btn x-small class="ml-4" color="secondary" dark>
                <v-icon class="mr-2" x-small color="white">mdi-github</v-icon>
                github.com
              </v-btn>
            </div>
            <div class="mt-2">
              <span class="text-caption grey--text font-weight-light"
                >Community link</span
              >
              <v-btn x-small class="ml-4" fab color="secondary" dark>
                <v-icon x-small color="white">mdi-docker</v-icon>
              </v-btn>
              <v-btn x-small class="ml-2" fab color="secondary" dark>
                <v-icon color="white">mdi-facebook</v-icon>
              </v-btn>
              <v-btn x-small class="ml-2" fab color="secondary" dark>
                <v-icon x-small color="white">mdi-twitter</v-icon>
              </v-btn>
            </div>
          </div>
          <!-- C-->
          <div class="mt-2">
            <v-card color="#202022" class="scrollable-card" max-height="300">
              <v-card-title class="text-caption white--text font-weight-light"
                >What is speacial about XRP</v-card-title
              >
              <v-card-text class="scrollable-text">
                <p class="text-caption grey--text font-weight-light">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Saepe, enim eveniet vero blanditiis suscipit est, corrupti
                  unde nam id perferendis amet? Id architecto mollitia fugiat
                  magnam dolorem, excepturi totam tenetur? Lorem ipsum dolor sit
                  amet consectetur, adipisicing elit. Saepe, enim eveniet vero
                  blanditiis suscipit est, corrupti unde nam id perferendis
                  amet? Id architecto mollitia fugiat magnam dolorem, excepturi
                  totam tenetur? Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Saepe, enim eveniet vero blanditiis suscipit
                  est, corrupti unde nam id perferendis amet? Id architecto
                  mollitia fugiat magnam dolorem, excepturi totam tenetur? Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
                  enim eveniet vero blanditiis suscipit est, corrupti unde nam
                  id perferendis amet? Id architecto mollitia fugiat magnam
                  dolorem, excepturi totam tenetur?
                </p>
              </v-card-text>
            </v-card>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card color="transparent">
          <v-row>
            <v-col cols="12" sm="4">
              <v-card height="100%" class="pt-3 pl-2" color="transparent">
                <h2 class="red--text">
                  $8.779,58
                  <span class="span-background text-caption"> 0.123 % </span>
                </h2>
                <h6 class="text-caption grey--text font-weight-light">
                  0.00000000123 <span class="white--text font-weight">BTC</span>
                </h6>
              </v-card>
            </v-col>
            <v-col cols="12" sm="8">
              <v-card color="#242426">
                <v-app-bar flat color="rgba(0, 0, 0, 0)">
                  <span class="caption grey--text mt-n6">Sales</span>
                </v-app-bar>
                <v-app-bar flat color="rgba(0, 0, 0, 0)" class="mt-n12">
                  <h4 class="white--text">96,50%</h4>
                  <span class="caption grey--text ml-2"> + 6.7% </span>
                </v-app-bar>

                <v-app-bar flat color="rgba(0, 0, 0, 0)" class="mt-n10">
                  <v-progress-linear
                    color="orange"
                    height="6"
                    value="45"
                  ></v-progress-linear>
                </v-app-bar>
                <v-card-text class="pt-0 mt-n4">
                  <span class="text-caption grey--text font-weight-light"
                    >Website</span
                  >
                </v-card-text>
              </v-card></v-col
            >
            <v-divider class=""></v-divider>
            <v-col class="mt-2" cols="12" sm="12">
              <v-simple-table dark fixed-header height="100%">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-divider class=""></v-divider>
          <v-row>
            <v-col class="mt-2" cols="12" sm="12">
              <v-simple-table dark fixed-header height="100%">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                      <th class="text-left">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts2" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
                      <td>{{ item.calories }}</td>
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
export default {
  name: "xrp1-popup",
  data: () => ({
    desserts: [
      {
        name: "Frozen Yogurt 0",
        calories: 159,
      },
    ],
    desserts2: [
      {
        name: "Frozen Yogurt 1 ",
        calories: 159,
      },
      {
        name: "Frozen Yogurt 2",
        calories: 159,
      },
      {
        name: "Frozen Yogurt 3",
        calories: 159,
      },
      {
        name: "Frozen Yogurt 4",
        calories: 159,
      },
      {
        name: "Frozen Yogurt 5",
        calories: 159,
      },
    ],
  }),
};
</script>
<style scoped>
.scrollable-card {
  overflow-y: auto;
  color: white;
}
.text-card {
  color: white;
}

.scrollable-text {
  max-height: 300px;
  color: white;
}
.scrollable-card::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.scrollable-card::-webkit-scrollbar-track {
  background-color: gainsboro;
}
.scrollable-card::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}
.span-background {
  background-color: green;
  color: white; /* Tùy chỉnh màu chữ nếu cần thiết */
  padding: 2px 6px;
}
</style>
