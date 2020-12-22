<template>
  <div class="input-group">
    <label for="from">From:</label>
    <select id="from" class="input input-currency" v-model="currencyCodeFrom">
      <option
        v-for="currency in currenciesOptions"
        :key="currency.code"
        :value="currency.code"
      >
        {{ currency.code + " - " + currency.description }}
      </option>
    </select>

    <label for="to">To:</label>
    <select id="to" class="input input-currency" v-model="currencyCodeTo">
      <option
        v-for="currency in currenciesOptions"
        :key="currency.code"
        :value="currency.code"
      >
        {{ currency.code + " - " + currency.description }}
      </option>
    </select>

    <label for="date">Initial date:</label>
    <input
      type="date"
      id="date"
      class="input input-date"
      :max="yeterday"
      :min="lastYear"
      v-model="startDate"
    />

    <button type="button" class="button" @click="handleGetCurrencyRates">
      SHOW CHART
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getDateBeforeDays } from "@/utils";

export default {
  name: "InputGroup",
  data() {
    return {
      yeterday: getDateBeforeDays(1),
      lastYear: getDateBeforeDays(360),
    };
  },
  created() {
    this.getCurrenciesOptions();
  },

  methods: {
    ...mapActions(["getCurrenciesOptions", "getCurrencyRates"]),

    handleGetCurrencyRates() {
      const { currencyCodeFrom, currencyCodeTo, startDate } = this;

      this.getCurrencyRates({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        startDate,
      });
    },
  },

  computed: {
    ...mapState(["currenciesOptions"]),

    currencyCodeTo: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "to" });
      },
      get() {
        return this.$store.state.currencyCode.to;
      },
    },
    currencyCodeFrom: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "from" });
      },
      get() {
        return this.$store.state.currencyCode.from;
      },
    },
    startDate: {
      set(newValue) {
        this.$store.commit("setStartDate", newValue);
      },
      get() {
        return this.$store.state.startDate;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 0 1rem;
  color: #2c3e50;

  > .input {
    width: 100%;
    margin: 1rem;
    margin-top: 0.5rem;
    height: 3rem;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    border: #2c3e50 solid 2px;
    &.input-currency {
      max-width: 500px;
    }
    &.input-date {
      max-width: 200px;
      text-align: center;
    }
  }

  > .button {
    width: 100%;
    max-width: 200px;
    margin: 1rem;
    height: 3rem;
    padding: 0 0.5rem;
    font-weight: bold;
    color: #ffff;
    background-color: #42b983;
    border: #2c3e50 solid 2px;
    transition: filter ease 200ms;
    &:hover {
      filter: brightness(110%);
    }
  }
}
</style>
