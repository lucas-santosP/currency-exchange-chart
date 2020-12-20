<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "Chart",
  mixins: [Line, reactiveProp],
  props: {
    chartdata: { type: Object, default: null },
    options: { type: Object, default: null }
  },

  mounted() {
    console.log(this.chartData);

    this.renderChart(this.chartData, { responsive: true });
  }
};
</script>
