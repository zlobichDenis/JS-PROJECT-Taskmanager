import AbstractComponent from "./abstract-component";
import { Chart } from "chart.js";
import { RenderPosition, render } from "../render";


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
      <div class="statistic__line-graphic visually-hidden">
        <canvas class="statistic__days" width="550" height="150"></canvas>
      </div>
    </div>

    <div class="statistic__circle">
      <div class="statistic__colors-wrap visually-hidden">
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

    }

    getTemplate() {
        return createStatisticTemplate();
    }

    _createCanvas() {
        const chartWrapper = this.getElement().querySelector('.statistic__days').getContext('2d');
    }
}