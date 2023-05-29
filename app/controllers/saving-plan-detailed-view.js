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

    return moment.duration(duration).format('MM', {
      usePlural: true,
      trim: 'both',
    });
  }

  get monthsListUntilDeadline() {
    const { targetAmount, deadlineDate } = this.model;

    const startDate = moment(); //now (TO-DO Start date for saving plan)

    const monthsUntilDeadline = this.getMonthsUntilDeadline(
      startDate,
      deadlineDate
    );

    let monthlySavingPlanningInfo = [];

    let savePerFullMonth = targetAmount / monthsUntilDeadline.length; // when selecting full months meaning, for example, 1st to 31st of May 2023

    const startingMonthInfo = this.getSavingPlanningForNotAFullMonth(
      monthsUntilDeadline,
      startDate,
      savePerFullMonth
    );

    savePerFullMonth += startingMonthInfo.missingAmountPerFullMonth;

    const endingMonthInfo = this.getSavingPlanningForNotAFullMonth(
      monthsUntilDeadline,
      deadlineDate,
      savePerFullMonth,
      true
    );

    savePerFullMonth += endingMonthInfo.missingAmountPerFullMonth;

    monthlySavingPlanningInfo = monthsUntilDeadline.map((el) => {
      return {
        month: el.month,
        year: el.year,
        targetSavings: savePerFullMonth,
      };
    });

    monthlySavingPlanningInfo[0].targetSavings =
      startingMonthInfo.monthSavingsTarget; //overwrite first month needed savings

    monthlySavingPlanningInfo[0].month = startDate.format('MMMM DD'); //overwrite first month saving date (to include a day)

    monthlySavingPlanningInfo[
      monthlySavingPlanningInfo.length - 1
    ].targetSavings = endingMonthInfo.monthSavingsTarget; //overwrite last month needed savings

    monthlySavingPlanningInfo[monthlySavingPlanningInfo.length - 1].month =
      deadlineDate.format('MMMM DD'); //overwrite end month saving date (to include a day)

    console.log('monthlySavingPlanningInfo', monthlySavingPlanningInfo);

    return monthlySavingPlanningInfo;
  }

  getSavingPlanningForNotAFullMonth(
    monthsUntilDeadline,
    date,
    savePerFullMonth,
    isEndMonth = false
  ) {
    const dateClone = date.clone(); //clone so the original date doesn't get overwritten in the logic below

    const totalDaysInFirstMonth =
      monthsUntilDeadline[
        isEndMonth ? monthsUntilDeadline.length - 1 : 0
      ].momentObject.daysInMonth(); //how many days does a month have

    const dayOfMonthAsLimit = dateClone.format('DD'); // if we save for example until 12 of April then it returns 12

    const daysWhereSavingIsNeeded = isEndMonth
      ? +dayOfMonthAsLimit
      : totalDaysInFirstMonth - dayOfMonthAsLimit; //amount of days that are within the interval until deadline (days on which we still save money)

    const monthSavingPercentageRatio =
      daysWhereSavingIsNeeded / totalDaysInFirstMonth; //if for example we need to save until 15 of April, then it is 0.5

    const monthSavingsTarget = savePerFullMonth * monthSavingPercentageRatio; //how much do we still have to save per month, considering, that we don't have the whole month to save

    const missingSavingsFromMonth = savePerFullMonth - monthSavingsTarget; //amount of money that won't be saved, because we don't save the whole month. Needs to be 'compensated' by other months

    const missingAmountPerFullMonth =
      missingSavingsFromMonth /
      (monthsUntilDeadline.length - (isEndMonth ? 2 : 1)); //if the calculation is performed for the last month than we have to except first and last month (2 months). If just for the first month, then we need to except just the first month (1)

    return { missingAmountPerFullMonth, monthSavingsTarget };
  }

  getMonthsUntilDeadline(startDate, endDate) {
    // we need to clone the dates (comes from momentjs) so the dates don't get changed (because of two way binding):
    const stardDateClone = startDate.clone();
    const endDateClone = endDate.clone();

    const betweenMonths = [];

    if (stardDateClone < endDateClone) {
      const date = stardDateClone.startOf('month');

      while (date < endDateClone.endOf('month')) {
        betweenMonths.push({
          month: date.format('MMMM'),
          year: date.format('YYYY'),
          momentObject: moment(date),
        });
        date.add(1, 'month');
      }
    }

    return betweenMonths;
  }
}
