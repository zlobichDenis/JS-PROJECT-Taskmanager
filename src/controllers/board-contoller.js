import LoadMoreBtnComponent from '../components/btnLoadMore.js';
import EditFormComponent from '../components/cardForm.js';
import TaskComponent from '../components/cardExample.js';
import SortComponent from '../components/boardFilters.js'
import NoTaskComponent from '../components/no-tasks-component.js';
import TaskList from '../components/tasks-list-component.js';


import { render, RenderPosition, replace, remove } from "../render.js"
import { SortType } from '../components/boardFilters.js';
import TaskController from './task-contoller.js';



const SHOW_TASK_START = 8;
const SHOW_TASK_BY_BTN = 4;

const renderTasks = (tasksList, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(tasksList, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  })
};

const getSortedTasks = (tasks, sortType, from, to) => {
    let sortedTasks = [];
    const showingTaks = tasks.slice();

    switch (sortType){
        case SortType.DATE_UP:
            sortedTasks = showingTaks.sort((a, b) => a.dueDate - b.dueDate);
            break;
        case SortType.DATE_DOWN:
            sortedTasks = showingTaks.sort((a, b) => b.dueDate - a.dueDate);
            break;
        case SortType.DEFAULT:
            sortedTasks = showingTaks;
            break;
    }

    return sortedTasks.slice(from, to);
};



export default class BoardController {
    constructor(container) {
        this._container = container;
        this._tasks = [];
        this._showedTaskContollers = [];
        this._showingTasksCount = SHOW_TASK_START;
        
        this._noTaskComponent = new NoTaskComponent();
        this._tasksComponent = new TaskList();
        this._sortComponent = new SortComponent();
        this._loadMoreButtonComponent = new LoadMoreBtnComponent();

        this._onDataChange = this._onDataChange.bind(this);
        this._onSortTypeChange = this._onSortTypeChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);

        this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }

    render(tasks) {
        this._tasks = tasks;
        const container = this._container.getElement()

        const isAllTasksArchived = this._tasks.every((task) => task.isArchive);
        if (isAllTasksArchived) {
            render(container, this._noTaskComponent, RenderPosition.BEFOREEND);
            return;
        }
        render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
        render(container, this._tasksComponent, RenderPosition.BEFOREEND);
        const tasksList = this._tasksComponent.getElement();

        const newTasks = renderTasks(tasksList, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
        this._showedTaskContollers = this._showedTaskContollers.concat(newTasks);
        
        this._renderLoadMoreButton();
    };

    _renderLoadMoreButton() {
      if (this._showingTasksCount >= this._tasks.length) {
        return;
      }
      const taskList = this._tasksComponent.getElement();

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = this._showingTasksCount;
        this._showingTasksCount = this._showingTasksCount + SHOW_TASK_BY_BTN;
        
        const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
        const newTasks = renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);
  
        this._showedTaskContollers = this._showedTaskContollers.concat(newTasks);
        render(taskList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
        if (this._showingTasksCount >= this._tasks.length) {
          remove(this._loadMoreButtonComponent);
        };
      })
      render(taskList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    }

/*     _onDataChange(taskController, oldData, newData) {
      const index = this._tasks.findIndex((it) => it === oldData);

      if (index === -1) {
        return;
      }

      this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

      taskController.render(this._tasks[index]);
    } */

    _onSortTypeChange(sortType) {
      this._showingTasksCount = this._showedTaskContollers.length;

      const taskListElement = this._tasksComponent.getElement();
      taskListElement.innerHTML = ``;
      const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
      const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
      this._showedTaskContollers = newTasks;

      this._renderLoadMoreButton();
    }

    _onViewChange() {
      this._showedTaskContollers.forEach((it) => {
        it.setDefaultView(it);
      })
    }
}

