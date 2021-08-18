import { render, RenderPosition } from "../render";
import FilterComponent from "../components/filters";
import { generateFilters } from "../mock/filter";

export default class FiltersController {
    constructor(container, taskModel) {
        this._container = container;
        this._taskModel = taskModel;
    }

    render() {
        this._filters = generateFilters();
        render(this._container, new FilterComponent(this._filters), RenderPosition.BEFOREEND)
    }
}