import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ChartsTotalBalanceTimelineComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('requests') requestService;
  @service intl;

  get chartOptions() {
    const _this = this;

    return {
      chart: {
        type: 'areaspline',
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
        areaspline: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + _this.userService.selectedCurrency.symbol;
            },
            padding: 10,
          },
          enableMouseTracking: false,
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
        name: this.intl.t('home-page.total-balance.title'),
        data: this.financeService.financeDataList.map(
          (el) => +el.updatedTotalBalance
        ),
      },
    ];
  }
}
