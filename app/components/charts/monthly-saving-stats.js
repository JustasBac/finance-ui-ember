import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { roundNumber } from 'finance-ui-ember/helpers/round-number';

export default class ChartsMonthlySavingStatsComponent extends Component {
  @tracked savedData = [];

  chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: null,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      categories: this.xAxisCategories,
    },
    yAxis: {
      title: {
        text: '%',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: 'percent',
      },
    },

    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
  };

  get xAxisCategories() {
    const xAxies = this.args.data.map((el) => el.formatedDate);

    console.log('x', xAxies);

    return xAxies;
  }

  get chartData() {
    // const { totalSavings, targetAmount, currencyCode } = this.args.data;

    console.log('thi', this.args.data);

    // const alreadySavedInPercent = (totalSavings * 100) / targetAmount;

    // const chartSeries = this.args.data.map((el) => {
    //   return {
    //     name: el.formatedDate,
    //     data: [8, 2, 3, 5, 6],
    //   };
    // });

    const chartSeries = [
      {
        name: 'Target savings',
        data: this.args.data.map(
          (
            el //if saved amount is higher than (or equal to) target amount, then show target amount pecentage as 0%, so it looks that saved amount is 100%
          ) =>
            el.savedAmount >= el.targetSavings
              ? 0
              : roundNumber(el.targetSavings - el.savedAmount, 2) //2 decimals
        ),
      },
      {
        name: 'Saved amount',
        data: this.args.data.map((el) => (el.savedAmount ? el.savedAmount : 0)),
        color: 'green',
      },
    ];

    console.log('chatr', chartSeries);

    return chartSeries;
  }
}
