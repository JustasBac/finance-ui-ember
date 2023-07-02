import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ChartsEconomyOverviewComponent extends Component {
  @tracked savedData = [];

  get chartOptions() {
    return {
      chart: {
        type: 'spline',
        height: '350px',
        backgroundColor: 'transparent',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        accessibility: {
          description: 'Months of the year',
        },
      },
      yAxis: {
        title: {
          text: 'Temperature',
        },
        labels: {
          format: '{value}°',
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
      },
    };
  }

  get chartData() {
    return [
      {
        name: 'Tokyo',
        marker: {
          symbol: 'square',
        },
        data: [
          5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 26.4, 22.8, 17.5, 12.1, 7.6,
        ],
      },
      {
        name: 'Bergen',
        marker: {
          symbol: 'diamond',
        },
        data: [1.5, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6],
      },
      {
        name: 'Total',
        marker: {
          symbol: 'diamond',
        },
        data: [
          10.5, 10.6, 3.3, 50.9, 10.5, 130.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6,
        ],
      },
    ];
  }
}
