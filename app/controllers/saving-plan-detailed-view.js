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
    const endDate = this.model.deadlineDate.clone(); //clone (comes from momentjs) it so we don't use a reference. It is already saved as a moment class, so we don't need to format it
    const betweenMonths = [];

    const daysUntilDeadline = this.getDatesUntilDeadline(startDate, endDate);

    const targetDailySavings =
      this.model.targetAmount / daysUntilDeadline.length;

    if (startDate < endDate) {
      const date = startDate.startOf('month');

      while (date < endDate.endOf('month')) {
        const filtered = daysUntilDeadline.filter(
          (el) => el.month === moment(date).format('YYYY-MM')
        );

        console.log('filtered', filtered);

        betweenMonths.push({
          date: date.format('YYYY-MM'),
          targetMonthSavings: Math.round(filtered.length * targetDailySavings),
          daysThatYouNeedToSaveOn: filtered.length,
          totalDaysInMonth: moment(date).daysInMonth(),
          percentage: (filtered.length * 100) / moment(date).daysInMonth(),
        });
        date.add(1, 'month');
      }
    }

    console.log('between', betweenMonths);
    return betweenMonths;
  }

  getDatesUntilDeadline(startDate, endDate) {
    const nowDate = startDate.clone();
    const daysUntilDeadline = [];

    while (nowDate.isSameOrBefore(endDate)) {
      daysUntilDeadline.push({
        date: nowDate.format('YYYY-MM-DD'),
        month: nowDate.format('YYYY-MM'),
      });
      nowDate.add(1, 'days');
    }

    return daysUntilDeadline;
  }
}
