import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ChartsEconomyOverviewComponent extends Component {
  @service('currency') currencyService;
  @service('economy') economyService;

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
        pointFormatter: function () {
          return `<b>${this.series.name}:</b> ${this.y} ${this.currencyCode} <br/>`;
        },
      },
    };
  }

  get xAxisCategories() {
    return this.economyService.financeDataList.map((el) => el.month); //assuming all three have the same date
  }

  get chartData() {
    return [
      {
        name: 'Total Savings',
        marker: {
          symbol: 'diamond',
        },
        data: this.economyService.financeDataList.map((el) => {
          return { y: +el.totalBalance, currencyCode: el.currencyCode };
        }),
      },
      {
        name: 'Spendings',
        marker: {
          symbol: 'diamond',
        },
        data: this.economyService.financeDataList.map((el) => {
          return { y: +el.spendings, currencyCode: el.currencyCode };
        }),
      },
      {
        name: 'Income',
        marker: {
          symbol: 'square',
        },
        data: this.economyService.financeDataList.map((el) => {
          return { y: +el.income, currencyCode: el.currencyCode };
        }),
      },
    ];
  }
}
