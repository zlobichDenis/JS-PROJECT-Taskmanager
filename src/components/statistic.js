import AbstractComponent from "./abstract-component";
Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
import { Chart, ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle } from "chart.js";
import { RenderPosition, render } from "../render";


import { COLORS_CARD } from "../const";
export const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
export const lineChartData = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: '#ffffff',
    borderColor: 'rgb(0, 0, 0)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};
export const pieChartData = {
  labels: COLORS_CARD,
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100, 100, 50],
    backgroundColor: [
      'rgb(0, 0, 0)',
      '#f11a1a',
      '#31b55c',
      '#ffe125',
      '#ff3cb9',
    ],
    hoverOffset: 4,
  }]
};
const createStatisticTemplate = () => {
    return `<section class="statistic container">
    <div class="statistic__line">
      <div class="statistic__period">
        <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

        <div class="statistic-input-wrap">
          <input
            class="statistic__period-input"
            type="text"
            placeholder="01 Feb - 08 Feb"
          />
        </div>

        <p class="statistic__period-result">
          In total for the specified period
          <span class="statistic__task-found">0</span> tasks were fulfilled.
        </p>
      </div>
      <div class="statistic__line-graphic">
        <canvas class="statistic__days" width="550" height="150"></canvas>
      </div>
    </div>

    <div class="statistic__circle">
      <div class="statistic__colors-wrap">
        <canvas class="statistic__colors" width="400" height="300"></canvas>
      </div>
    </div>
  </section>
    `
};

export default class StatisticComponent extends AbstractComponent {
    constructor(taskModel) {
        super();
        this._taskModel = taskModel;
        this._container = null;

        this._chartDays = null;
        this._chartColors = null;
    }

    getTemplate() {
        return createStatisticTemplate();
    }

    createCharts() {
      this._createChartOfColors();
      this._createChartOfDays();
    }

    _createChartOfDays() {
        const daysChartWrapper = this.getElement().querySelector('.statistic__days');
        this._chartDays = new Chart(daysChartWrapper, {
          type: 'line',
          data: lineChartData,
          options: {},
      });
    }

    _createChartOfColors() {
      const colorsChartWrapper = this.getElement().querySelector('.statistic__colors');
      this._chartColors = new Chart(colorsChartWrapper, {
        type: 'doughnut',
        data: pieChartData,
        options: {},
      })
    }
}