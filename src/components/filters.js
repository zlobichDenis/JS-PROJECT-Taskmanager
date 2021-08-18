import { defaultReapeatingDays } from "../util.js";
import AbstractComponent from "./abstract-component.js";

export const getOverdueTasks = (tasks, date) => {
   return tasks.filter((task) => {
        const dueDate = task.dueDate;

        if (!dueDate) {
            return false;
        }

        if (dueDate < Date.now ()) {
            return task
        }
    })
};

export const getTodaysTasks = (tasks) => {
    return tasks.filter((task) => {
        const dueDate = task.dueDate;

        if (!dueDate) {
            return false;
        }

        if (Date.now === dueDate) {
            return task;
        }
    })
};

export const getFavoritesTasks = (tasks) => {
    return tasks.filter((task) => task.isFavorite)
};

export const getRepeatingTasks = (tasks) => {
    return tasks.filter((task) => {
        if (task.reapeatingDays === defaultReapeatingDays) {
            return false;
        }

        if (Object.values(task.reapeatingDays).some(Boolean)) {
            return task;
        }
    })
};

export const getNotArchiveTasks = (tasks) => {
    return tasks.filter((task) => !task.isArchive);
};

export const getArchiveTasks = (tasks) => {
    return tasks.filter((task) => task.isArchive);
}

const createInput = (filter, isChecked) => {
    const {name, count} = filter;
    return `<input
            type="radio"
            id="filter__${name}"
            class="filter__input visually-hidden"
            name="filter"
            ${isChecked ? 'checked' : ''} />
        <label for="filter__${name}" class="filter__label">
            ${name} <span class="filter__${name}-count">${count}</span>
        </label>
        `
};

const createFilterTemplate = (filters) => {
    const filtersMarkup = filters.map((filter, i) => {
        return createInput(filter, i === 0)}).join('\n');

    return `<section class="main__filter filter container">${filtersMarkup}</section> 
    `
};

export default class Filter extends AbstractComponent {
    constructor(filters) {
        super();

        this._filters = filters;
    }
    
    getTemplate() {
        return createFilterTemplate(this._filters);
    }
}
