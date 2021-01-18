<template>
  <div id="app">
    <h1 class="title">Currency Exchange Chart</h1>
    <InputGroup />

    <div class="chart-container">
      <LineChart v-if="chartData && !onLoading" :chartData="chartData" />
    </div>

    <LoadingView :state="onLoading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { InputGroup, LineChart, LoadingView } from "@/components";

export default {
  name: "App",
  components: { InputGroup, LineChart, LoadingView },
  computed: {
    ...mapState(["chartData", "onLoading"]),
  },
};
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  .title {
    font-size: 2rem;
    margin: 1rem 0;
  }

  .chart-container {
    position: relative;
    margin: 0 auto;
    padding: 0 1rem;
    padding-bottom: 1rem;
    height: auto;
    width: 100%;
    min-height: 400px;
  }
}
</style>
