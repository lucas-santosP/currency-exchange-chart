import Vue from "vue";
import Vuex from "vuex";
import currencyServices from "@/services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyCode: {
      to: "",
      from: ""
    },
    date: {
      start: "",
      end: ""
    },
    currenciesOptions: [],
    rates: {}
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
    setRates(state, newValue) {
      state.rates = newValue;
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
      const currentDate = new Date().toJSON().slice(0, 10);
      console.log(from, to, startDate);

      const rates = await currencyServices.getRates({
        from,
        to,
        startDate,
        endDate: currentDate
      });

      commit("setRates", rates);
    }
  },

  modules: {}
});
