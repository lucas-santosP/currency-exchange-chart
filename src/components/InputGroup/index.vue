<template>
  <div class="input-group">
    <label for="to">From:</label>
    <select id="from" list="currencies" v-model="currencyCodeFrom">
      <option
        v-for="currency in currenciesOptions"
        :key="currency.code"
        :value="currency.code"
      >
        {{ currency.code + " - " + currency.description }}
      </option>
    </select>

    <label for="to">To:</label>
    <select id="to" list="currencies" v-model="currencyCodeTo">
      <option
        v-for="currency in currenciesOptions"
        :key="currency.code"
        :value="currency.code"
      >
        {{ currency.code + " - " + currency.description }}
      </option>
    </select>

    <label for="to">Initial date:</label>
    <input type="date" v-model="startDate" :max="currentDate" />

    <button class="button" @click="handleGetRates">
      SHOW CHART
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getCurrentDate } from "@/utils";

export default {
  name: "InputGroup",
  data() {
    return {
      currentDate: getCurrentDate()
    };
  },
  created() {
    this.getCurrenciesOptions();
  },

  methods: {
    ...mapActions(["getCurrenciesOptions", "getRatesHistory"]),

    handleGetRates() {
      const { currencyCodeFrom, currencyCodeTo, startDate } = this;

      this.getRatesHistory({
        from: currencyCodeFrom,
        to: currencyCodeTo,
        startDate
      });
    }
  },

  computed: {
    ...mapState(["currenciesOptions"]),

    currencyCodeTo: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "to" });
      },
      get() {
        return this.$store.state.currencyCode.to;
      }
    },
    currencyCodeFrom: {
      set(newValue) {
        this.$store.commit("setCurrencyCode", { newValue, key: "from" });
      },
      get() {
        return this.$store.state.currencyCode.from;
      }
    },
    startDate: {
      set(newValue) {
        this.$store.commit("setDate", { newValue, key: "start" });
      },
      get() {
        return this.$store.state.date.start;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 0 1rem;

  > select,
  input {
    width: 100%;
    max-width: 500px;
    min-width: 200px;
    margin: 1rem;
    margin-top: 0.5rem;
    height: 3rem;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    border: #2c3e50 solid 2px;
  }

  .button {
    width: 200px;
    margin: 1rem;
    height: 3rem;
    padding: 0 0.5rem;
    font-weight: bold;
    color: #ffff;
    background-color: #42b983;
    transition: filter ease 200ms;

    &:hover {
      filter: brightness(110%);
    }
  }
}
</style>
