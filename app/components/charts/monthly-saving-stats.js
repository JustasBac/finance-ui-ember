import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { roundNumber } from 'finance-ui-ember/helpers/round-number';

export default class ChartsMonthlySavingStatsComponent extends Component {
  @tracked savedData = [];

  get chartOptions() {
    const _this = this;

    return {
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
          text: this.args.currency,
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          tooltip: {
            pointFormatter: function () {
              const { currency } = _this.args;

              const savedAmount = this.custom.savedAmount
                ? this.custom.savedAmount
                : 0;

              return `Target amount: <b>${roundNumber(
                this.custom.targetSavings
              )}</b>${currency}<br/>Saved amount: <b>${savedAmount}</b>${currency}`;
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
        name: 'Target savings', //if saved amount is higher than (or equal to) target amount, then show target amount pecentage as 0%, so it looks that saved amount is 100%
        data: this.args.data.map((el) => {
          return {
            y:
              el.savedAmount >= el.targetSavings
                ? 0
                : roundNumber(el.targetSavings - el.savedAmount),
            custom: {
              //needed for tooltip
              savedAmount: el.savedAmount,
              targetSavings: el.targetSavings,
            },
          };
        }),
        color: 'var(--light-gray)', //very light gray
      },
      {
        name: 'Saved amount',
        data: this.args.data.map((el) => {
          return {
            y: el.savedAmount ? el.savedAmount : 0,
            custom: {
              //needed for tooltip
              savedAmount: el.savedAmount,
              targetSavings: el.targetSavings,
            },
          };
        }),
        color: 'var(--success-green)', //green
      },
    ];
  }
}
