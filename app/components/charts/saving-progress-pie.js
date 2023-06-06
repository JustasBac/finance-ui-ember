import Component from '@glimmer/component';

export default class ChartsSavingProgressPieComponent extends Component {
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
    const { totalSavings, targetAmount, currencyCode } = this.args.data;

    const alreadySavedInPercent = (totalSavings * 100) / targetAmount;

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
              extraInformation: `${
                targetAmount - totalSavings
              } ${currencyCode}`,
            },
          },
          {
            name: 'Already saved',
            y: alreadySavedInPercent,
            custom: {
              extraInformation: `${totalSavings} ${currencyCode}`,
            },
          },
        ],
      },
    ];
  }
}
