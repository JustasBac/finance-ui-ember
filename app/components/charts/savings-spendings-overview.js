import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ChartsSavingsSpendingsOverviewComponent extends Component {
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
          text: this.intl.t('home-page.income'),
        },
        stackLabels: {
          enabled: true,
          formatter: function () {
            const currencySymbol =
              this.axis.chart.userOptions.series[0].data[0].currencySymbol;

            return this.total + currencySymbol;
          },
        },
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + this.point.currencySymbol;
            },
          },
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

    const spendingsData = this.getDataByType('spendings');
    const savingsData = this.getDataByType('savings');

    if (!spendingsData.length && !savingsData.length) {
      return null;
    }

    return [
      {
        name: this.intl.t('home-page.savings'),
        marker: {
          symbol: 'diamond',
        },
        data: savingsData,
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
    return this.financeService.financeDataList.map((el) => {
      const currencySymbol = this.userService.getCurrencySymbol(
        el.currencyCode
      );

      if (el[type] === null) {
        return { y: 0, currencySymbol };
      }

      return { y: +el[type], currencySymbol };
    });
  }
}
