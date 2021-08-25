import TasksModel from "./models/tasks.js";
import BoardComponent from "./components/board-tasks.js";
import FilterComponent from "./components/filters.js";
import SiteMenuComponent, {MenuItem} from './components/menu.js';
import BoardController from "./controllers/board-contoller.js";
import StatisticComponent from "./components/statistic.js";

import { render, RenderPosition, replace, remove} from "./render.js";
import { generateFilters } from "./mock/filter.js";
import { generateTasks } from "./mock/task.js";
import FiltersController from "./controllers/filters.js";
import StatisticController from "./controllers/statistic.js";



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
const statisticController = new StatisticController(tasksModel);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render();

siteMenu.setOnChangeHandler((menuItem) => {
    switch (menuItem) {
        case MenuItem.NEW_TASK:
            if (MenuItem.STATISTICS === menuItem) {
                statisticController.removeElement();
            }
            siteMenu.setActiveItem(MenuItem.TASKS);
            render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
            boardController._removeTasks();
            boardController.render();
            boardController.createTask();
            break;   
        case MenuItem.TASKS:
            siteMenu.setActiveItem(MenuItem.TASKS);
            statisticController.removeElement();
            render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
            boardController._removeTasks();
            boardController.render();
            break;
        case MenuItem.STATISTICS:
            siteMenu.setActiveItem(MenuItem.STATISTICS);
            remove(boardComponent);
            statisticController.render(siteMainElement);
            /* render(siteMainElement, statisticComponent, RenderPosition.BEFOREEND); */
            break;
    }
}); 



