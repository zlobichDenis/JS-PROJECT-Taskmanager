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
import { formatDate } from "../util";


const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];


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

const getGroupTasksByDays = (allTasks) => {
    return allTasks.reduce((acc, task) => {
        const date = task.dueDate;
        if (date) {
            if (acc[date]) {
                acc[date].push(task);
            } else {
                acc[date] = [task];
            }
        }
        return acc;
    }, {});
};

const getSortTasks = (allTasks) => {
    return allTasks.sort((a, b) => a.dueDate - b.dueDate);
};

const getLineChartLabels = (keys) => {
    return keys.map((key) => {
        return formatDate(key);
    });
}

const getLineChartData = (tasks) => {
    const dates = Object.keys(tasks);
    return dates.map((date) => {
        return tasks[date].length
    });
};

export default class StatisticController {
    constructor(taskModel) {
        this._taskModel = taskModel;

        this._allTasks = this._taskModel.getAllTasks();
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
        const sortedTasks = getSortTasks(this._allTasks);
        const groupedTasksByDays = getGroupTasksByDays(sortedTasks);
        console.log(groupedTasksByDays)

        this._chartDays = new Chart(daysChartWrapper, {
            type: 'line',
            data: {
                labels: getLineChartLabels(Object.keys(groupedTasksByDays)),
                datasets: [{
                  label: 'Tasks By Days',
                  backgroundColor: '#ffffff',
                  borderColor: 'rgb(0, 0, 0)',
                  data: getLineChartData(groupedTasksByDays),
                }]
              },
            options: {},
        });
    }
  
      _createChartOfColors() {
        const colorsChartWrapper = this._statisticComponent.getElement().querySelector('.statistic__colors');
        this._allTasks = this._taskModel.getAllTasks();
        const groupedTasksByColors = getTasksByColors(this._allTasks);
        const chartData = getColorProportion(groupedTasksByColors, this._allTasks);
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
