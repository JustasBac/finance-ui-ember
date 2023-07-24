import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ChartsEconomyOverviewComponent extends Component {
  @service('currency') currencyService;

  @tracked savedData = [];

  get chartOptions() {
    return {
      chart: {
        type: 'spline',
        height: '360px',
        backgroundColor: 'transparent',
      },
      title: {
        text: 'My finance overview',
      },
      xAxis: {
        categories: this.xAxisCategories,
        accessibility: {
          description: 'Months of the year',
        },
      },
      yAxis: {
        title: {
          text: this.currencyService.selectedCurrency.symbol,
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: this.currencyService.selectedCurrency.symbol,
      },
    };
  }

  get xAxisCategories() {
    return this.args.data.income.map((el) => el.date); //assuming all three have the same date
  }

  get chartData() {
    const { income, totalBalance, spendings } = this.args.data;

    return [
      {
        name: 'Total Savings',
        marker: {
          symbol: 'diamond',
        },
        data: totalBalance.map((el) => +el.value),
      },
      {
        name: 'Spendings',
        marker: {
          symbol: 'diamond',
        },
        data: spendings.map((el) => +el.value),
      },
      {
        name: 'Income',
        marker: {
          symbol: 'square',
        },
        data: income.map((el) => +el.value),
      },
    ];
  }
}
