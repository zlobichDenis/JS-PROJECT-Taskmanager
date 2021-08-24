import moment from "moment";
import { getArchiveTasks, getFavoritesTasks, getOverdueTasks, getRepeatingTasks, getTodaysTasks } from "./components/filters";
import { FilterType } from "./const";

export const defaultReapeatingDays = {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
};

export const getRandomIntNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

export const getRandomElemFromArray = (array) => {
    return array[getRandomIntNumber(0, array.length)];
};

export const getRandomDate = () => {
    const targetDate = new Date;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const diffValue = sign * getRandomIntNumber(0, 8);

    targetDate.setDate(targetDate.getDate() + diffValue);

    return targetDate
};

export const castTimeFormat = (value) => {
    return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
    return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
    return moment(date).format(`DD MMMM`);
};

export const generateRepeatingDays = () => {
    return Object.assign({}, defaultReapeatingDays,{ 'mo': Math.random() > 0.5});
};

export const getTasksByFilter = (tasks, filter) => {
    switch (filter) {
        case 'all': return tasks;
        case 'overdue': return getOverdueTasks(tasks);
        case 'todays': return getTodaysTasks(tasks);
        case 'favorites': return getFavoritesTasks(tasks);
        case 'repeating': return getRepeatingTasks(tasks);
        case 'archive': return getArchiveTasks(tasks);
    }
};





