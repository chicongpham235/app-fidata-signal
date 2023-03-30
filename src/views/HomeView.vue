<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
  >
    <main class="ml-2">
      <PageSignal />
      <!-- <v-row>
        <v-col class="mb-3" cols="12" sm="12">
          <Xrp1 />
        </v-col>
        <v-col cols="12" sm="12">
          <Xrp2 />
        </v-col>
      </v-row> -->
    </main>
  </v-app>
</template>

<script>
// import Xrp1 from "../components/filldata/Xrp1";
// import Xrp2 from "../components/filldata/Xrp2";
import PageSignal from "../components/PageSignal";

export default {
  data: () => ({}),
  components: {
    // Xrp1,
    // Xrp2,
    PageSignal,
  },
};
</script>
<style>
.v-btn.withoutupercase {
  text-transform: none !important;
}
.v-btn:not(.v-btn--round).v-size--small {
  min-width: 30px !important;
  padding: 0 5px !important;
}
</style>
