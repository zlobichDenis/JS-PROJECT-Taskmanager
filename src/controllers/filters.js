import { render, RenderPosition } from "../render";
import FilterComponent from "../components/filters";
import { generateFilters } from "../mock/filter";
import { FilterType } from "../const";
import { getTasksByFilter } from "../util";
import Filter from "../components/filters";

export default class FiltersController {
    constructor(container, taskModel) {
        this._container = container;
        this._taskModel = taskModel;

    }

    render() {
        const allTasks = this._taskModel.getAllTasks();
        this._filters = Object.values(FilterType).map((filter) => {
            return generateFilters(filter, allTasks);
        })

        this._filterComponent = new FilterComponent(this._filters);
        render(this._container, this._filterComponent, RenderPosition.BEFOREEND)

        this._filterComponent._setActiveFilterAll(() => {
            this._taskModel.setFilterType(FilterType.ALL);
        });

        this._filterComponent._setActiveFilterOverdue(() => {
            this._taskModel.setFilterType(FilterType.OVERDUE)
        });

        this._filterComponent._setActiveFilterArchive(() => {
            this._taskModel.setFilterType(FilterType.ARCHIVE);
        });

        this._filterComponent._setActiveFilterFavorites(() => {
            this._taskModel.setFilterType(FilterType.FAVORITES);
        });

        this._filterComponent._setActiveFilterTodays(() => {
            this._taskModel.setFilterType(FilterType.TODAYS);
        });

        this._filterComponent._setActiveFilterRepeating(() => {
            this._taskModel.setFilterType(FilterType.REPEATING);
        })

    }

    _onFilterChange(filterType) {
        this._taskModel.setFilter(filterType);
        this._activeFilterType = filterType;
    }


    
}