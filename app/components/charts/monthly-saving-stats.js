import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { roundNumber } from 'finance-ui-ember/helpers/round-number';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default class ChartsMonthlySavingStatsComponent extends Component {
  @service intl;

  @tracked savedData = [];

  @computed('intl.locale')
  get chartOptions() {
    const _this = this;

    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
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
          text: this.args.currencySymbol,
        },
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          tooltip: {
            pointFormatter: function () {
              const { currencySymbol } = _this.args;

              const savedAmount = this.custom.savedAmount
                ? this.custom.savedAmount
                : 0;

              return `${_this.intl.t(
                'charts.monthly-saving-stats.target'
              )} <b>${roundNumber(
                this.custom.targetSavings
              )}</b>${currencySymbol}<br/>${_this.intl.t(
                'charts.monthly-saving-stats.saved'
              )} <b>${savedAmount}</b>${currencySymbol}`;
            },
            shared: true,
          },
        },
      },
    };
  }

  get xAxisCategories() {
    return this.args.data.map((el) => el.formatedDate);
  }

  get chartData() {
    return [
      {
        name: this.intl.t('charts.monthly-saving-stats.left-to-save'), //if saved amount is higher than (or equal to) target amount, then show target amount pecentage as 0%, so it looks that saved amount is 100%
        data: this.args.data.map((el) => {
          return {
            y:
              +el.savedAmount >= el.targetSavings
                ? 0
                : roundNumber(el.targetSavings - +el.savedAmount),
            custom: {
              //needed for tooltip
              savedAmount: +el.savedAmount,
              targetSavings: el.targetSavings,
            },
          };
        }),
        color: 'var(--light-gray)', //very light gray
      },
      {
        name: this.intl.t('charts.monthly-saving-stats.saved-amount'),
        data: this.args.data.map((el) => {
          return {
            y: +el.savedAmount ? +el.savedAmount : 0,
            custom: {
              //needed for tooltip
              savedAmount: +el.savedAmount,
              targetSavings: el.targetSavings,
            },
          };
        }),
        color: 'var(--success-green)', //green
      },
    ];
  }
}
