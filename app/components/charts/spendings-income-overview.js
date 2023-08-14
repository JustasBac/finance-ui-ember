import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ChartsSpendingsIncomeOverviewComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('requests') requestService;
  @service intl;

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

    const incomeData = this.getDataByType('income');

    const spendingsData = this.getDataByType('spendings');

    if (!incomeData.length && !spendingsData.length) {
      return null;
    }

    return [
      {
        name: this.intl.t('home-page.income'),
        marker: {
          symbol: 'square',
        },
        data: incomeData,
      },
      {
        name: this.intl.t('home-page.spendings'),
        marker: {
          symbol: 'diamond',
        },
        data: spendingsData,
      },
    ];
  }

  getDataByType(type) {
    return this.financeService.financeDataList
      .map((el) => {
        if (el[type] === null) {
          return;
        }

        return { y: +el[type], currencyCode: el.currencyCode };
      })
      .filter((el) => el);
  }
}
