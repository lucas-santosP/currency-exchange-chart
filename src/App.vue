<template>
  <div id="app">
    <h1 class="title">Currency Exchange</h1>
    <InputGroup />
    <!-- <Chart /> -->
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup";
// import Chart from "@/components/Chart";

export default {
  name: "App",
  components: {
    InputGroup
    // Chart
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
</style>
