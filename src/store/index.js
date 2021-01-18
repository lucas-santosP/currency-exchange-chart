import Vue from "vue";
import Vuex from "vuex";
import currencyServices from "@/services";
import { getDateBeforeDays } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyCode: {
      to: "BRL",
      from: "USD",
    },
    startDate: getDateBeforeDays(7),
    currenciesOptions: [],
    chartData: null,
    onLoading: false,
  },

  mutations: {
    setCurrencyCode(state, { newValue, key }) {
      if (key === "to" || key === "from") {
        state.currencyCode[key] = newValue;
      }
    },
    setStartDate(state, newValue) {
      state.startDate = newValue;
    },
    setCurrenciesOptions(state, newValue) {
      state.currenciesOptions = newValue;
    },
    setChartData(state, newValue) {
      state.chartData = newValue;
    },
    setLoading(state, newValue) {
      if (newValue) state.onLoading = newValue;
      else setTimeout(() => (state.onLoading = newValue), 500); //minimum waiting time
    },
  },

  actions: {
    async getCurrenciesOptions({ commit }) {
      commit("setLoading", true);
      const currencies = await currencyServices.getAllCurrencies();
      const currenciesNormalized = Object.values(currencies);

      commit("setCurrenciesOptions", currenciesNormalized);
      commit("setLoading", false);
    },
    async getCurrencyRates({ commit }, { from, to, startDate }) {
      commit("setLoading", true);

      const today = getDateBeforeDays();
      const rates = await currencyServices.getRatesHistory({
        from,
        to,
        startDate,
        endDate: today,
      });

      const dates = [];
      const RatesCurrency = [];

      for (const date of Object.keys(rates)) {
        dates.push(date.replace(/-/g, "/"));
        RatesCurrency.push(rates[date][to]);
      }

      commit("setChartData", {
        title: `${from} to ${to} Chart`,
        labels: dates,
        datasets: [
          {
            label: `${from} to ${to}`,
            data: RatesCurrency,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            borderColor: "#42b983",
            lineTension: 0,
            pointBorderColor: "#2c3e50",
            pointBackgroundColor: "#2c3e50",
          },
        ],
      });

      commit("setLoading", false);
    },
  },
});
