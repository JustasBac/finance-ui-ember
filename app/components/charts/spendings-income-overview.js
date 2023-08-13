import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ChartsSpendingsIncomeOverviewComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('requests') requestService;

  get chartOptions() {
    const _this = this;

    return {
      chart: {
        type: 'column',
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
      plotOptions: {
        column: {
          stacking: 'normal',
          shared: true,
          dataLabels: {
            enabled: true,
            formatter: function () {
              const currencySymbol = _this.userService.getCurrencySymbol(
                this.point.currencyCode
              );

              return this.y + currencySymbol;
            },
          },
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
    return this.financeService.financeDataList.map((el) =>
      moment(el.datetime).format('MMMM YYYY')
    );
  }

  get chartData() {
    if (!this.financeService.financeDataList.length) {
      return null;
    }

    return [
      {
        name: 'Income',
        marker: {
          symbol: 'square',
        },
        data: this.financeService.financeDataList.map((el) => {
          return { y: +el.income, currencyCode: el.currencyCode };
        }),
      },
      {
        name: 'Spendings',
        marker: {
          symbol: 'diamond',
        },
        data: this.financeService.financeDataList.map((el) => {
          return { y: +el.spendings, currencyCode: el.currencyCode };
        }),
      },
    ];
  }
}
