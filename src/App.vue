<template>
  <div id="app">
    <h1 class="title">Currency Exchange Chart</h1>
    <InputGroup />
    <div class="chart-container">
      <Chart
        v-if="chartData"
        :chartData="chartData"
        :options="{
          resposive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          title: {
            display: true,
            fontSize: 16,
            text: 'USD to BRL Chart'
          },
          lineTension: 1
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { InputGroup, Chart } from "@/components";

export default {
  name: "App",
  components: {
    InputGroup,
    Chart
  },
  computed: {
    ...mapState(["chartData"])
  }
};
</script>

<style lang="scss">
body {
  background-color: #f8f8f8;
}
#app {
  text-align: center;
  color: #2c3e50;
  padding-top: 2rem;
  width: 100%;
}

.chart-container {
  position: relative;
  margin: 0 auto;
  padding: 1rem;
  height: auto;
  width: 100%;
  max-width: 1600px;
}
</style>
