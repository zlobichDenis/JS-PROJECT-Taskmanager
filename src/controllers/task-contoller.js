import AbstractSmartComponent from "../components/abstract-smart-component.js";
import Task from "../components/task.js";
import EditForm from "../components/task-edit.js";
import { COLORS_CARD } from "../const.js";
import { render, replace, RenderPosition, remove } from "../render.js";

export const Mode = {
  EDIT: 'edit',
  DEFAULT: 'default',
  ADDING: 'adding'
};

export const EmptyTask = {
  description: ``,
  dueDate: null,
  reapeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  color: `black`,
  isFavorite: false,
  isArchive: false,
};

export default class TaskController {
    constructor(container, onDataChange, onViewChange) {
        this._container = container;

        this._onDataChange = onDataChange;
        this._onViewChange = onViewChange;
        this._mode = Mode.DEFAULT;

        this._taskComponent = null;
        this._taskEditComponent = null;
    }

    render(task, mode) {
      const oldTaskComponent = this._taskComponent;
      const oldTaskEditComponent = this._taskEditComponent;
      this._mode = mode;
      
      this._taskComponent = new Task(task);
      this._taskEditComponent = new EditForm(task, this._onDataChange);
        
      
      this._taskComponent.setEditButtonClickHandler(() => {
        this._replaceTaskToEdit();
      });
        
      this._taskEditComponent.setSubmitHandler((evt) => {
        evt.preventDefault();
        const data = this._taskEditComponent.getData();
        this._onDataChange(this, task, data);
      });

      this._taskEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

      this._taskComponent.setArchiveButtonClickHandler(() => {
        this._onDataChange(this, task, Object.assign({}, task, { isArchive: !task.isArchive, }));
      });

      this._taskComponent.setFavoritesButtonClickHandler(() => {
        this._onDataChange(this, task, Object.assign({}, task, { isFavorite: !task.isFavorite, }))
      });
      if (this._mode === Mode.ADDING) {
        render(this._container, this._taskEditComponent, RenderPosition.AFTERBEGIN);
        return;
      }
      if(oldTaskEditComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._taskEditComponent, oldTaskEditComponent);
          this._replaceEditToTask();
      } else {
          render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
      }
  }

    setDefaultView() {
      if (this._mode !== Mode.DEFAULT) {
          this._replaceEditToTask();
      }
    }

    destroy() {
      remove(this._taskEditComponent);
      remove(this._taskComponent);
    }

    _replaceEditToTask() {
      this._taskEditComponent.reset();
      if (document.contains(this._taskEditComponent.getElement())) {
        replace(this._taskComponent, this._taskEditComponent);
      }
      this._mode = Mode.DEFAULT;
    }

    _replaceTaskToEdit() {
      this._onViewChange();
      replace(this._taskEditComponent, this._taskComponent);
      this._mode = Mode.EDIT;
    }
}