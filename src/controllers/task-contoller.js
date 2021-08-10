import AbstractSmartComponent from "../components/abstract-smart-component.js";
import Task from "../components/cardExample.js";
import EditForm from "../components/cardForm.js";
import { render, replace, RenderPosition } from "../render.js";

const Mode = {
  EDIT: 'edit',
  DEFAULT: 'default',
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

    render(task) {
        const oldTaskComponent = this._taskComponent;
        const oldTaskEditComponent = this._taskEditComponent;
        const clickOnEditBtn = () => {
            replace(this._taskEditComponent , this._taskComponent);
          };
        
          const submitEditForm = (evt) => {
            replace(this._taskComponent , this._taskEditComponent);
          };
        
          this._taskComponent = new Task(task);
          this._taskEditComponent = new EditForm(task);
        
        
          this._taskComponent.setEditButtonClickHandler(() => {
            clickOnEditBtn()
          });
        
          this._taskEditComponent.setSubmitHandler((evt) => {
            evt.preventDefault();
            submitEditForm();
          });

          this._taskComponent.setArchiveButtonClickHandler(() => {
            this._onDataChange(this, task, Object.assign({}, task, { isArchive: !task.isArchive, }));
          });

          this._taskComponent.setFavoritesButtonClickHandler(() => {
            this._onDataChange(this, task, Object.assign({}, task, { isFavorite: !task.isFavorite, }))
          });

          if(oldTaskEditComponent && oldTaskComponent) {
              replace(this._taskComponent, oldTaskComponent);
              replace(this._taskEditComponent, oldTaskEditComponent);
          } else {
              render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
          }
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._replaceEditToTask();
        }
    }

    _replaceEditToTask() {
        this._onViewChange();
        replace(this._taskEditComponent, this._taskComponent);
        this.mode = Mode.EDIT;
    }
}