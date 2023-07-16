import Component from '@glimmer/component';

export default class ChartsSavingProgressPieComponent extends Component {
  chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
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
    const { totalBalance, targetAmount, currencyCode } = this.args.data;

    const alreadySavedInPercent = (totalBalance * 100) / targetAmount;

    return [
      {
        colorByPoint: true,
        data: [
          {
            name: 'Left to save',
            y: 100 - alreadySavedInPercent,
            sliced: true,
            custom: {
              extraInformation: `${
                targetAmount - totalBalance
              } ${currencyCode}`,
            },
            color: 'var(--light-gray)',
          },
          {
            name: 'Already saved',
            y: alreadySavedInPercent,
            custom: {
              extraInformation: `${totalBalance} ${currencyCode}`,
            },
            color: 'var(--success-green)',
          },
        ],
      },
    ];
  }
}
