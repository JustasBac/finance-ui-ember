import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class ChartsSavingProgressPieComponent extends Component {
  @service intl;

  chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: { text: null },
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
    const { totalSavings, targetAmount, currencyCode } = this.args.data;

    const alreadySavedInPercent = (totalSavings * 100) / targetAmount;

    return [
      {
        colorByPoint: true,
        data: [
          {
            name: this.intl.t('charts.saving-progress-pie.left-to-save-label'),
            y: 100 - alreadySavedInPercent,
            sliced: true,
            custom: {
              extraInformation: `${
                targetAmount - totalSavings
              } ${currencyCode}`,
            },
            color: 'var(--light-gray)',
          },
          {
            name: this.intl.t('charts.saving-progress-pie.already-saved-label'),
            y: alreadySavedInPercent,
            custom: {
              extraInformation: `${totalSavings} ${currencyCode}`,
            },
            color: 'var(--success-green)',
          },
        ],
      },
    ];
  }
}
