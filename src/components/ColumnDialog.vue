<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent width="640">
      <v-card class="pa-2">
        <v-card-text>
          <div class="d-flex align-center">
            <div style="font-size: 20px">
              Customize the time fields you want to display
            </div>
            <v-btn class="ml-auto" icon @click="show = false">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </div>
          <div class="mt-2" v-if="list_column_show.length">
            <v-chip
              v-for="(item, index) in list_column_show"
              :key="`chip_${index}`"
              color="#6164ff"
              class="ma-2"
              close
              @click:close="clearColumn(item)"
            >
              {{ item.text || null }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="resetToDefault()">
            Reset to default
          </v-btn>
          <v-btn color="blue-darken-1" text @click="save()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    listFields: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    show: false,
    list_column_show: [],
  }),
  mounted() {
    this.list_column_show = this.listFields;
  },
  methods: {
    open() {
      this.show = true;
    },
    clearColumn({ value }) {
      this.list_column_show = this.list_column_show.filter((x) => {
        return x.value != value;
      });
    },
    resetToDefault() {
      this.list_column_show = this.listFields;
    },
    save() {
      localStorage.setItem(
        "TREND_COLUMN",
        JSON.stringify(this.list_column_show)
      );
      this.setCoumnShow();
    },
    setCoumnShow() {
      const headers = this.list_column_show.map((x) => {
        return x.text;
      });
      this.$emit("reset", headers);
      this.show = false;
    },
  },
};
</script>
