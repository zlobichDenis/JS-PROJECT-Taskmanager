import { remove, render, RenderPosition } from "../render";
import FilterComponent from "../components/filters";
import { generateFilters } from "../mock/filter";
import { FilterType } from "../const";
import { getTasksByFilter } from "../util";
import Filter from "../components/filters";

export default class FiltersController {
    constructor(container, taskModel) {
        this._container = container;
        this._taskModel = taskModel;

        this._updateFilters = this._updateFilters.bind(this);

        this._taskModel._setDataChangeHandlers(this._updateFilters);
    }

    _getTasksByFilter() {
        const allTasks = this._taskModel.getAllTasks();
        return Object.values(FilterType).map((filter) => {
            return generateFilters(filter, allTasks);
        })
    }

    render() {
        this._filters = this._getTasksByFilter();

        this._filterComponent = new FilterComponent(this._filters);
        render(this._container, this._filterComponent, RenderPosition.BEFOREEND)
        this._subscribeOnEvents();
    }

    _subscribeOnEvents() {

        this._filterComponent._setActiveFilterAll(() => {
            this._onFilterChange(FilterType.ALL);
        });

        this._filterComponent._setActiveFilterOverdue(() => {
            this._onFilterChange(FilterType.OVERDUE);
        });

        this._filterComponent._setActiveFilterArchive(() => {
            this._onFilterChange(FilterType.ARCHIVE);
        });

        this._filterComponent._setActiveFilterFavorites(() => {
            this._onFilterChange(FilterType.FAVORITES);
        });

        this._filterComponent._setActiveFilterTodays(() => {
            this._onFilterChange(FilterType.TODAYS);
        });

        this._filterComponent._setActiveFilterRepeating(() => {
            this._onFilterChange(FilterType.REPEATING);
        })
    }

    _rerender() {
        const newFilters = this._getTasksByFilter();
        const oldElement = this._filterComponent.getElement();
        const container = oldElement.parentElement;

        this._filterComponent.removeElement();

        this._filterComponent = new FilterComponent(newFilters);

        const newElement = this._filterComponent.getElement();

        container.replaceChild(newElement, oldElement);
        this._subscribeOnEvents();
    }

    _updateFilters() {
        this._rerender();
      }

    _onFilterChange(filterType) {
        this._taskModel.setFilterType(filterType);
        this._activeFilterType = filterType;
    }    
}