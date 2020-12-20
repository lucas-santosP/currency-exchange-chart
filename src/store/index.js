import Vue from "vue";
import Vuex from "vuex";
import currencyServices from "@/services";
import { getCurrentDate, getDateBefore } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyCode: {
      to: "BRL",
      from: "USD"
    },
    date: {
      start: getDateBefore(7),
      end: ""
    },
    currenciesOptions: [],
    chartData: null
  },

  mutations: {
    setCurrencyCode(state, { newValue, key }) {
      if (key === "to" || key === "from") {
        state.currencyCode[key] = newValue;
      }
    },
    setDate(state, { newValue, key }) {
      if (key === "start" || key === "end") {
        state.date[key] = newValue;
      }
    },
    setCurrenciesOptions(state, newValue) {
      state.currenciesOptions = newValue;
    },
    setChartData(state, newValue) {
      state.chartData = newValue;
    }
  },

  actions: {
    async getCurrenciesOptions({ commit }) {
      try {
        const currencies = await currencyServices.get();
        commit("setCurrenciesOptions", currencies);
      } catch (error) {
        console.log(error);
      }
    },
    async getRatesHistory({ commit }, { from, to, startDate }) {
      const currentDate = getCurrentDate();
      const rates = await currencyServices.getRates({
        from,
        to,
        startDate,
        endDate: currentDate
      });

      const dates = [];
      const dataCodeTo = [];
      const dataCodeFrom = [];

      for (const date of Object.keys(rates)) {
        dates.push(date.replace(/-/g, "/"));
        dataCodeTo.push(rates[date][to]);
        dataCodeFrom.push(rates[date][from]);
      }

      commit("setChartData", {
        labels: dates,
        datasets: [
          {
            label: `${from} to ${to}`,
            data: dataCodeTo,
            backgroundColor: ["rgba(54, 162, 235, 0.3)"]
          }
        ]
      });
    }
  },

  modules: {}
});
