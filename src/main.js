import {API} from './api.js';
import TasksModel from "./models/tasks.js";
import BoardComponent from "./components/board-tasks.js";
import SiteMenuComponent, {MenuItem} from './components/menu.js';
import BoardController from "./controllers/board-contoller.js";

import { render, RenderPosition, replace, remove} from "./render.js";
import { generateTasks } from "./mock/task.js";
import FiltersController from "./controllers/filters.js";
import StatisticController from "./controllers/statistic.js";



const TASK_COUNT = 22;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');

const AUTHORIZATION = `Basic: asdfasdfasdfasdf`;
const dateTo = new Date();
const dateFrom = (() => {
    const d = new Date(dateTo);
    d.setDate(d.getDate() - 7);

    return d;
});

const tasks = generateTasks(TASK_COUNT);
const api = new API('some url',AUTHORIZATION);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const siteMenu = new SiteMenuComponent()
const filterController = new FiltersController(siteMainElement, tasksModel);
const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, api);
const statisticController = new StatisticController(tasksModel);

render(siteHeaderElement, siteMenu, RenderPosition.BEFOREEND);
filterController.render();
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
            break;
    }
}); 


api.getTasks()
    .then((tasks) => {
        taskModel.setTasks(tasks);
        boardController.render();
    });


