import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ChartsSpendingsIncomeOverviewComponent extends Component {
  @service('user') userService;
  @service('economy') economyService;
  @service('requests') requestService;

  get chartOptions() {
    return {
      chart: {
        type: 'spline',
        height: '360px',
        backgroundColor: 'transparent',
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: this.xAxisCategories,
        accessibility: {
          description: 'Months of the year',
        },
      },
      yAxis: {
        title: {
          text: this.userService.selectedCurrency.symbol,
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: this.userService.selectedCurrency.symbol,
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
    if (!this.economyService.financeDataList.length) {
      return null;
    }

    return [
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
