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

  get timeUntilDeadline() {
    const now = moment();
    const end = moment(this.model.deadlineDate);
    const duration = moment.duration(end.diff(now), 'ms');

    return moment.duration(duration).format();
  }

  get monthsListUntilDeadline() {
    const {
      targetAmount,
      startDate,
      deadlineDate,
      startingCapital,
      monthsListUntilDeadline,
    } = this.model;

    let monthlySavingPlanningInfo = [];

    let savingsPerFullMonthNeeded =
      (targetAmount - startingCapital) / monthsListUntilDeadline.length; // when selecting full months meaning, for example, 1st to 31st of May 2023

    const startingMonthInfo = this.getSavingPlanningForNotAFullMonth(
      startDate,
      savingsPerFullMonthNeeded
    );

    savingsPerFullMonthNeeded += startingMonthInfo.missingAmountPerFullMonth;

    const endingMonthInfo = this.getSavingPlanningForNotAFullMonth(
      deadlineDate,
      savingsPerFullMonthNeeded,
      true
    );

    savingsPerFullMonthNeeded += endingMonthInfo.missingAmountPerFullMonth;

    monthlySavingPlanningInfo = monthsListUntilDeadline.map((month) => {
      return {
        formatedDate: month.date,
        targetSavings: savingsPerFullMonthNeeded,
        momentDate: month.momentObject,
        savedAmount: month.savedAmount,
      };
    });

    monthlySavingPlanningInfo[0].targetSavings =
      startingMonthInfo.monthSavingsTarget; //overwrite first month needed savings

    // monthlySavingPlanningInfo[0].formatedData =
    //   startDate.format('MMM DD, YYYY'); //overwrite first month saving date (to include a day)

    monthlySavingPlanningInfo[
      monthlySavingPlanningInfo.length - 1
    ].targetSavings = endingMonthInfo.monthSavingsTarget; //overwrite last month needed savings

    // monthlySavingPlanningInfo[
    //   monthlySavingPlanningInfo.length - 1
    // ].formatedData = deadlineDate.format('MMM DD, YYYY'); //overwrite end month saving date (to include a day)

    return monthlySavingPlanningInfo;
  }

  getSavingPlanningForNotAFullMonth(
    date,
    savingsPerFullMonthNeeded,
    isEndMonth = false
  ) {
    const dateClone = date.clone(); //clone so the original date doesn't get overwritten in the logic below

    const { monthsListUntilDeadline } = this.model;

    const totalDaysInFirstMonth =
      monthsListUntilDeadline[
        isEndMonth ? monthsListUntilDeadline.length - 1 : 0
      ].momentObject.daysInMonth(); //how many days does a month have

    const dayOfMonthAsLimit = dateClone.format('DD'); // if we save for example until 12 of April then it returns 12

    const daysWhereSavingIsNeeded = isEndMonth
      ? +dayOfMonthAsLimit
      : totalDaysInFirstMonth - dayOfMonthAsLimit; //amount of days that are within the interval until deadline (days on which we still save money)

    const monthSavingPercentageRatio =
      daysWhereSavingIsNeeded / totalDaysInFirstMonth; //if for example we need to save until 15 of April, then it is 0.5

    const monthSavingsTarget =
      savingsPerFullMonthNeeded * monthSavingPercentageRatio; //how much do we still have to save per month, considering, that we don't have the whole month to save

    const missingSavingsFromMonth =
      savingsPerFullMonthNeeded - monthSavingsTarget; //amount of money that won't be saved, because we don't save the whole month. Needs to be 'compensated' by other months

    const missingAmountPerFullMonth =
      missingSavingsFromMonth /
      (monthsListUntilDeadline.length - (isEndMonth ? 2 : 1)); //if the calculation is performed for the last month than we have to except first and last month (2 months). If just for the first month, then we need to except just the first month (1)

    return { missingAmountPerFullMonth, monthSavingsTarget };
  }
}
