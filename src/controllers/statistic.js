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
import { COLORS_CARD } from "../const";
import { render, RenderPosition, remove } from "../render";
import StatisticComponent from "../components/statistic";
import { all } from "prelude-ls";


const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const lineChartData = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: '#ffffff',
    borderColor: 'rgb(0, 0, 0)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};
const pieChartData = {
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

const getColorProportion = (tasksByColors, allTasks) => {
    return tasksByColors.map((group) => {
        const colorProportion = Math.round((100 * group.length) / allTasks.length);
        return colorProportion * 10;
    })
    
};

const getTasksByColors = (tasks) => {
    return COLORS_CARD.map((color) => {
        return tasks.filter((task) => task.color === color);
    });
};

export default class StatisticController {
    constructor(taskModel) {
        this._taskModel = taskModel;
    }

    createCharts() {
        this._createChartOfColors();
        this._createChartOfDays();
    }

    render(container) {
        this._container = container;

        this._statisticComponent = new StatisticComponent();
        render(this._container, this._statisticComponent, RenderPosition.BEFOREEND);
        this.createCharts();
    }

    removeElement() {
        remove(this._statisticComponent)
    }
  
      _createChartOfDays() {
          const daysChartWrapper = this._statisticComponent.getElement().querySelector('.statistic__days');
          this._chartDays = new Chart(daysChartWrapper, {
            type: 'line',
            data: lineChartData,
            options: {},
        });
    }
  
      _createChartOfColors() {
        const colorsChartWrapper = this._statisticComponent.getElement().querySelector('.statistic__colors');
        const allTasks = this._taskModel.getAllTasks();
        const groupedTasksByColors = getTasksByColors(allTasks);
        const chartData = getColorProportion(groupedTasksByColors, allTasks);
        console.log(chartData)
        this._chartColors = new Chart(colorsChartWrapper, {
          type: 'doughnut',
          data: {
            labels: COLORS_CARD,
            datasets: [{
              label: 'Tasks By Colors',
              data: chartData,
              backgroundColor: [
                'rgb(0, 0, 0)',
                '#f11a1a',
                '#31b55c',
                '#ffe125',
                '#ff3cb9',
              ],
              hoverOffset: 4,
            }]
          },
          options: {},
        })
    }
}
