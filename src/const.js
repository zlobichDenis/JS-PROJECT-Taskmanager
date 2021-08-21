import { getArchiveTasks } from "./components/filters";

const TASK_DESC = ['Сделать домашку', 'Изучить теорию', 'Приготовить еду'];
const COLORS_CARD = ['black', 'yellow', 'blue', 'green', 'pink'];
const MONTH_NAMES = [
    'January',
    'Febrary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Semtember',
    'October',
    'November',
    'December',
];

export const DAYS = [`mo`,`tu`,'we',`th`,`fr`, `sa`,`su`];

export const FilterType = {
    ALL: 'all',
    ARCHIVE: 'archive',
    OVERDUE: 'overdue',
    FAVORITES: 'favorites',
    TODAYS: 'todays',
    REPEATING: 'repeating',
};

export { COLORS_CARD, MONTH_NAMES, TASK_DESC };