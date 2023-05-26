import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SavingPlanDetailedViewController extends Controller {
  @service('currency') currencyService;

  get currency() {
    return this.currencyService.getCurrencySymbol(this.model.currencyCode);
  }

  chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    tooltip: {
      pointFormat: `<b>{point.percentage:.1f}%</b> ({point.custom.extraInformation})`,
    },
    accessibility: {
      point: {
        valueSuffix: 'eur',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
  };

  get chartData() {
    const { savedAmount, targetAmount } = this.model;

    const alreadySavedInPercent = (savedAmount * 100) / targetAmount;

    return [
      {
        colorByPoint: true,
        type: 'pie',
        // name: 'opa',
        data: [
          {
            name: 'Left to save',
            y: 100 - alreadySavedInPercent,
            sliced: true,
            custom: {
              extraInformation: `${targetAmount - savedAmount}${this.currency}`,
            },
          },
          {
            name: 'Already saved',
            y: alreadySavedInPercent,
            custom: {
              extraInformation: `${savedAmount}${this.currency}`,
            },
          },
        ],
      },
    ];
  }

  @action
  showMe() {
    console.log('this.model;', this.model.targetAmount);
  }
}
