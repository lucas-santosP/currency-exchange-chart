<template>
  <div id="app">
    <h1 class="title">Currency Exchange Chart</h1>
    <InputGroup />
    <div class="chart-container">
      <Chart
        v-if="chartData"
        :chartData="chartData"
        :options="{ responsive: true }"
        :style="'position:relative'"
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  vertical-align: baseline;
  list-style: none;
  border: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}
button {
  cursor: pointer;
}

.chart-container {
  width: 100%;
  max-height: 650px;
  max-width: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
