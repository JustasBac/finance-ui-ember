import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SavingPlan {
  id;
  @tracked title = '';
  @tracked targetAmount;
  @tracked currencyCode = '';
  @tracked startDate;
  @tracked deadlineDate;
  @tracked savingsPerMonth = [];
  @tracked startingCapital;
  @tracked totalSavings;
  @tracked monthsListUntilDeadline = [];

  constructor(
    id = 0,
    title = '',
    targetAmount = null,
    currencyCode = '',
    startDate = moment(),
    deadlineDate = moment().add(1, 'days'),
    savingsPerMonth = [],
    startingCapital = 0
  ) {
    this.id = id;
    this.title = title;
    this.targetAmount = targetAmount;
    this.currencyCode = currencyCode;
    this.startDate = startDate;
    this.deadlineDate = deadlineDate;
    this.savingsPerMonth = savingsPerMonth;
    this.startingCapital = startingCapital;
    this.totalSavings = this.calculateTotalSavings();
    this.monthsListUntilDeadline = this.getMonthsListUntilDeadline();
  }

  copy() {
    return new SavingPlan(
      this.id,
      this.title,
      this.targetAmount,
      this.currencyCode,
      this.startDate,
      this.deadlineDate,
      this.savingsPerMonth,
      this.startingCapital,
      this.totalSavings,
      this.monthsListUntilDeadline
    );
  }

  calculateTotalSavings() {
    let sum = 0;

    this.savingsPerMonth.forEach((el) => {
      sum += el.amountSaved;
    });

    return sum + +this.startingCapital; //+ in front to 'integrify'
  }

  getMonthsListUntilDeadline() {
    const { targetAmount, startDate, deadlineDate, totalSavings } = this;

    const monthsListUntilDeadline = this.getListedMonthsUntilDeadline();

    let monthlySavingPlanningInfo = [];

    let savingsPerFullMonthNeeded =
      (targetAmount - totalSavings) / monthsListUntilDeadline.length; // when selecting full months meaning, for example, 1st to 31st of May 2023

    if (monthsListUntilDeadline.length <= 2) {
      //if there are just 1 or 2 months to save the calculation logic is different
      return this.getShortTimeMonthsListWithInfo(
        monthsListUntilDeadline,
        savingsPerFullMonthNeeded,
        startDate,
        deadlineDate,
        targetAmount
      );
    }

    const startingMonthInfo = this.getSavingPlanningForNotAFullMonth(
      monthsListUntilDeadline,
      startDate,
      savingsPerFullMonthNeeded
    );

    savingsPerFullMonthNeeded += startingMonthInfo.missingAmountPerFullMonth;

    const endingMonthInfo = this.getSavingPlanningForNotAFullMonth(
      monthsListUntilDeadline,
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

    monthlySavingPlanningInfo[
      monthlySavingPlanningInfo.length - 1
    ].targetSavings = endingMonthInfo.monthSavingsTarget; //overwrite last month needed savings

    return monthlySavingPlanningInfo;
  }

  getShortTimeMonthsListWithInfo(
    monthsListUntilDeadline,
    savingsPerFullMonthNeeded,
    startDate,
    deadlineDate,
    targetAmount
  ) {
    return monthsListUntilDeadline.map((month, index) => {
      let targetSavings = savingsPerFullMonthNeeded;

      if (monthsListUntilDeadline.length === 2) {
        const daysBetweenStartAndDeadlineDate =
          deadlineDate.diff(startDate, 'days') + 1; // +1 to include start date

        let diff;

        if (index === 0) {
          //first month
          const endOfMonth = moment(startDate).endOf('month');
          diff = endOfMonth.diff(startDate, 'days') + 1; // +1 to include start date
        }

        if (index === 1) {
          //second (last) month
          const startOfMonth = moment(deadlineDate).startOf('month');
          diff = deadlineDate.diff(startOfMonth, 'days');
        }

        targetSavings = (diff / daysBetweenStartAndDeadlineDate) * targetAmount;
      }

      return {
        formatedDate: month.date,
        targetSavings,
        momentDate: month.momentObject,
        savedAmount: month.savedAmount,
      };
    });
  }

  getListedMonthsUntilDeadline() {
    // we need to clone the dates (comes from momentjs) so the dates don't get changed (because of two way binding):
    const stardDateClone = this.startDate.clone();
    const endDateClone = this.deadlineDate.clone();

    const betweenMonths = [];

    if (stardDateClone < endDateClone) {
      const date = stardDateClone.startOf('month');

      while (date < endDateClone.endOf('month')) {
        const monthlySavings = this.savingsPerMonth.find(
          (el) => el.month === moment(date).format('MMMM YYYY')
        )?.amountSaved;

        betweenMonths.push({
          date: date.format('MMMM YYYY'),
          momentObject: moment(date),
          savedAmount: monthlySavings ? monthlySavings : null,
        });
        date.add(1, 'month');
      }
    }

    return betweenMonths;
  }

  getSavingPlanningForNotAFullMonth(
    monthsListUntilDeadline,
    date,
    savingsPerFullMonthNeeded,
    isEndMonth = false
  ) {
    const dateClone = date.clone(); //clone so the original date doesn't get overwritten in the logic below

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
