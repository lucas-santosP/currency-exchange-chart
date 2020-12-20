<template>
  <div id="app">
    <h1 class="title">Currency Exchange Chart</h1>
    <InputGroup />
    <div class="chart-container">
      <Chart
        v-if="!onLoading && chartData"
        :chartData="chartData"
        :options="{
          resposive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          title: { display: true, fontSize: 16, text: chartData.title }
        }"
      />
      <LoadingView :state="onLoading" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { InputGroup, Chart, LoadingView } from "@/components";

export default {
  name: "App",
  components: { InputGroup, Chart, LoadingView },
  computed: {
    ...mapState(["chartData", "onLoading"])
  }
};
</script>

<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

.title {
  font-size: 2rem;
  margin: 1rem 0;
}

.chart-container {
  position: relative;
  margin: 0 auto;
  padding: 1rem;
  height: auto;
  width: 100%;
  max-width: 1600px;
  min-height: 400px;
}
</style>
