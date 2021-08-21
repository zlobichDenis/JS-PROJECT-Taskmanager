import LoadMoreBtnComponent from '../components/btnLoadMore.js';
import EditFormComponent from '../components/cardForm.js';
import TaskComponent from '../components/cardExample.js';
import SortComponent from '../components/boardFilters.js'
import NoTaskComponent from '../components/no-tasks-component.js';
import TaskList from '../components/tasks-list-component.js';


import { render, RenderPosition, replace, remove } from "../render.js"
import { SortType } from '../components/boardFilters.js';
import TaskController, {Mode as TaskControllerMode, EmptyTask} from './task-contoller.js';
import Task from '../components/cardExample.js';
import Filter from '../components/filters.js';



const SHOW_TASK_START = 8;
const SHOW_TASK_BY_BTN = 4;

const renderTasks = (tasksList, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(tasksList, onDataChange, onViewChange);

    taskController.render(task, TaskControllerMode.DEFAULT);

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
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;

    this._showedTaskContollers = [];
    this._showingTasksCount = SHOW_TASK_START;
        
    this._noTaskComponent = new NoTaskComponent();
    this._tasksComponent = new TaskList();
    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreBtnComponent();

    this._creatingTask = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._taskModel._setFilterChangeHandlers(this._onFilterChange);
}

  render() {
    const container = this._container.getElement();
    const tasks = this._taskModel.getTasks();

    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(container, this._noTaskComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    this._renderTasks(tasks.slice(0, this._showingTasksCount));
    
    this._renderLoadMoreButton();
};

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._tasksComponent.getElement();
    this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  }

  _removeTasks() {
    this._showedTaskContollers.forEach((taskController) => taskController.destroy());
    this._showedTaskContollers = [];
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._taskModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._taskModel.getTasks().length) {
      return;
    }
    const taskList = this._tasksComponent.getElement();
    render(taskList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
}

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._taskModel.getTasks();
    const taskList = this._tasksComponent.getElement();
    this._showingTasksCount = this._showingTasksCount + SHOW_TASK_BY_BTN;
      
    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
    const newTasks = renderTasks(taskList, sortedTasks, this._onDataChange, this._onViewChange);

    this._showedTaskContollers = this._showedTaskContollers.concat(newTasks);
    render(taskList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _renderTasks(tasks) {
    const tasksList = this._tasksComponent.getElement();

    const newTasks = renderTasks(tasksList, tasks, this._onDataChange, this._onViewChange);
    this._showedTaskContollers = this._showedTaskContollers.concat(newTasks);
    
    this._showingTasksCount = this._showedTaskContollers.length;
      
  }

  _onDataChange(taskController, oldData, newData) {

    if (oldData === EmptyTask) {
      this._creatingTask = null;
      if (newData === null) {
        taskController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._taskModel.addTask(newData);
        taskController.render(newData, TaskControllerMode.DEFAULT);
        if (this._showingTasksCount % SHOW_TASK_BY_BTN === 0) {
          const destroyedTask = this._showedTaskContollers.pop();
          destroyedTask.destroy();
        }
    
        this._showedTaskContollers = [].concat(taskController, this._showedTaskContollers);
        this._showingTasksCount = this._showedTaskContollers.length;
        console.log(this._showedTaskContollers)
        this._renderLoadMoreButton();
      }
    } else if (newData === null) {
        this._taskModel.removeTask(oldData.id);
        this._updateTasks(this._showingTasksCount);
    } else {
      const isSucces = this._taskModel.updateTask(oldData.id, newData);

      if (isSucces) {
        taskController.render(newData, TaskControllerMode.DEFAULT);
      }
    }
}

    _onSortTypeChange(sortType) {
      this._showingTasksCount = this._showedTaskContollers.length;

      const sortedTasks = getSortedTasks(this._taskModel.getTasks(), sortType, 0, this._showingTasksCount);

      this._removeTasks();
      this._renderTasks(sortedTasks);

      this._renderLoadMoreButton();
    }

    _onViewChange() {
      this._showedTaskContollers.forEach((it) => {
        it.setDefaultView(it);
      })
    }

    _onFilterChange() {
      this._updateTasks(SHOW_TASK_START);
  }
}

