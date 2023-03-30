<template>
  <div class="text-center">
    <v-dialog
      overlay-color="black"
      overlay-opacity="1"
      v-model="dialog"
      width="1200"
    >
      <v-row>
        <v-col class="mb-3" cols="12" sm="12">
          <Xrp1 />
        </v-col>
        <v-col cols="12" sm="12">
          <Xrp2 />
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>
<script>
import Xrp1 from "./filldata/Xrp1";
import Xrp2 from "./filldata/Xrp2";
export default {
  name: "pop-up",
  components: {
    Xrp1,
    Xrp2,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
  },
};
</script>
