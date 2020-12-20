import api from "./api";

export default {
  async get() {
    try {
      const response = await api.get("/symbols");
      const currencies = [];

      for (const currency of Object.values(response.data.symbols)) {
        currencies.push(currency);
      }

      return currencies;
    } catch (error) {
      console.log(error);
    }
  },
  async getRates({ from, to, startDate, endDate }) {
    const response = await api.get(
      `/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=${to}&base=${from}`
    );
    return response.data.rates;
  }
};
