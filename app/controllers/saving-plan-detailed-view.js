import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

export default class SavingPlanDetailedViewController extends Controller {
  @service('currency') currencyService;

  @tracked activeTab = 'planning'; //default

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
          enabled: true,
          format: '{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
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

  get timeUntilDeadline() {
    const now = moment();
    const end = moment(this.model.deadlineDate);
    const duration = moment.duration(end.diff(now), 'ms');

    return moment.duration(duration).format();
  }

  get monthsListUntilDeadline() {
    const startDate = moment(); //now
    const endDate = this.model.deadlineDate; //it is already saved as a moment class, so we don't need to format it
    const betweenMonths = [];

    if (startDate < endDate) {
      const date = startDate.startOf('month');

      while (date < endDate.endOf('month')) {
        betweenMonths.push(date.format('YYYY-MM'));
        date.add(1, 'month');
      }
    }
    return betweenMonths;
  }
}
