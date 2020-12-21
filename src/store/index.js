import Vue from "vue";
import Vuex from "vuex";
import currencyServices from "@/services";
import { getDateBeforeDays } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyCode: {
      to: "BRL",
      from: "USD"
    },
    date: {
      start: getDateBeforeDays(7),
      end: ""
    },
    currenciesOptions: [],
    chartData: null,
    onLoading: false
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
    },
    setLoading(state, newValue) {
      if (newValue) state.onLoading = newValue;
      else
        setTimeout(() => {
          state.onLoading = newValue;
        }, 500);
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
      commit("setLoading", true);

      const today = getDateBeforeDays();
      const rates = await currencyServices.getRates({
        from,
        to,
        startDate,
        endDate: today
      });

      const dates = [];
      const RatesCurrencyTo = [];

      for (const date of Object.keys(rates)) {
        dates.push(date.replace(/-/g, "/"));
        RatesCurrencyTo.push(rates[date][to]);
      }

      commit("setChartData", {
        title: `${from} to ${to} Chart`,
        labels: dates,
        datasets: [
          {
            label: `${from} to ${to}`,
            data: RatesCurrencyTo,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            borderColor: "#42b983",
            lineTension: 0,
            pointBorderColor: "#2c3e50",
            pointBackgroundColor: "#2c3e50"
          }
        ]
      });

      commit("setLoading", false);
    }
  }
});
