import { FilterType } from "../const";
import { getTasksByFilter } from "../util";

export default class Tasks {
    constructor() {
        this._tasks = [];
        this._activeFilterType = FilterType.ALL;

        this._dataChangeHandlers = [];
        this._filterChangeHandlers = [];
    }

    getTasks() {
        return getTasksByFilter(this._tasks, this._activeFilterType);
    }

    getAllTasks() {
        return this._tasks;
    }

    setFilterType(filterType) {
        this._activeFilterType = filterType;
        this._callHandlers(this._filterChangeHandlers);
    }

    setTasks(tasks) {
        this._tasks = Array.from(tasks);
        this._callHandlers(this._dataChangeHandlers);
    }

    updateTask(id, task) {
        const index = this._tasks.findIndex((it) => it.id === id);

        if (index === -1) {
            return false;
        }

        this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(0, index + 1));
        this._callHandlers(this._dataChangeHandlers);

        return true;
    }

    _setDataChangeHandlers(handler) {
        this._dataChangeHandlers.push(handler);
    }

    _setFilterChangeHandlers(handler) {
        this._filterChangeHandlers.push(handler);
    }

    _callHandlers(handlers) {
        handlers.forEach((handler) => handler())
    }
}