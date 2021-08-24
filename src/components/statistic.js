import { formatDate } from "../util";
import AbstractComponent from "./abstract-component";

const findDefaultDate = (tasks) => {
  const result = [];
  const tasksContainsDate = tasks.filter((task) => task.dueDate);
  result.push(tasksContainsDate[0].dueDate);
  result.push(tasksContainsDate[tasksContainsDate.length - 1].dueDate)
  return (result);
};

const getDefaultDates = (tasks) => {
  const defaultDates = findDefaultDate(tasks);
  return defaultDates;
}

const createStatisticTemplate = (placeholder) => {
  const [firstDate, secondDate] = placeholder;
  const firstPlaceholder = formatDate(firstDate);
  const secondPlaceholder = formatDate(secondDate);
  return `<section class="statistic container">
    <div class="statistic__line">
      <div class="statistic__period">
        <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

        <div class="statistic-input-wrap">
          <input
            class="statistic__period-input"
            type="text"
            placeholder="${firstPlaceholder} - ${secondPlaceholder}"
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
    constructor(tasks) {
        super();
        this._sortedTasks = tasks;
        this._container = null;
        this._flatpickr = null;

        this._chartDays = null;
        this._chartColors = null;

        this._defaultDates = getDefaultDates(this._sortedTasks);
        this._applyFlatpickr();
    }

    getTemplate() {
      return createStatisticTemplate(this._defaultDates);
    }

    _applyFlatpickr() {
      if (this._flatpickr) {
        this._flatpickr.destroy();
        this._flatpickr = null;
      }
        const dateElement = this.getElement().querySelector('.statistic__period-input');
        this._flatpickr = flatpickr(dateElement, {
          mode: 'range',
          allowInput: true,
          dateFormat: 'd M',
          enable: [
            {
              from: this._defaultDates[0],
              to: this._defaultDates[1],
            }
          ],
          defaultDate: this._defaultDates,
        })
    }

    _setOnDateChange(handler) {
        this._flatpickr.config.onClose.push(() => {
          handler(this._flatpickr);
        });
    }
}