import TasksModel from "./models/tasks.js";
import BoardComponent from "./components/board-tasks.js";
import FilterComponent from "./components/filters.js";
import SiteMenuComponent, {MenuItem} from './components/menu.js';
import BoardController from "./controllers/board-contoller.js";

import { render, RenderPosition, replace, remove} from "./render.js";
import { generateFilters } from "./mock/filter.js";
import { generateTasks } from "./mock/task.js";
import FiltersController from "./controllers/filters.js";



const TASK_COUNT = 22;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMenu = new SiteMenuComponent()

render(siteHeaderElement, siteMenu, RenderPosition.BEFOREEND);
const filterController = new FiltersController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render();

siteMenu.setOnChangeHandler((menuItem) => {
    switch (menuItem) {
        case MenuItem.NEW_TASK:
            siteMenu.setActiveItem(MenuItem.TASKS);
            boardController.createTask();
            break;
    }
}); 



