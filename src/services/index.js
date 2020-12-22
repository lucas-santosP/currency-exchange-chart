import api from "./api";

export default {
  async getAllCurrencies() {
    try {
      const response = await api.get("/symbols");
      if (!("data" in response) || !("symbols" in response.data)) {
        throw new Error("Response error, invalid data received.");
      }

      return response.data.symbols;
    } catch (error) {
      console.log("Error on getAllCurrencies\n", error);
      return {};
    }
  },
  async getRatesHistory({ from, to, startDate, endDate }) {
    try {
      const response = await api.get(
        `/timeseries?start_date=${startDate}&end_date=${endDate}&symbols=${to}&base=${from}&places=3`,
      );
      if (!("data" in response) || !("rates" in response.data)) {
        throw new Error("Response error, invalid data received.");
      }

      return response.data.rates;
    } catch (error) {
      console.log("Error on getRates\n", error);
      return null;
    }
  },
};
