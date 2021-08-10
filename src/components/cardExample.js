import { COLORS_CARD, TASK_DESC, MONTH_NAMES } from "../const.js";
import { formatTime } from "../util.js";
import AbstractComponent from "./abstract-component.js";

const createButtonMarkup = (name, isActive = true) => {
  return (
    `<button type="button" class="card__btn card__btn--${name} ${isActive ? '' : 'card__btn--disabled'}">
    ${name}
  </button>`
  )
};


const createCardTemplate = (task) => {

  const {description, color, reapeatingDays, dueDate} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now(); 
  const isDateShowing = !!dueDate; 

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';  
  const time = isDateShowing ? formatTime(dueDate) : '';
 
  const isRepeat = (element) => {
   return element === true;
  };

  const editButton = createButtonMarkup('edit');
  const archiveButton = createButtonMarkup('archive', !task.isArchive);
  const favoritesButton = createButtonMarkup('favorites', !task.isFavorite);

  const deadlineClass = isExpired ? `card--deadline` : ``; 
  const isRepeated = Object.values(reapeatingDays).some(isRepeat); 

  const repeatClass = isRepeated ? 'card--repeat' : '';


    return `<article class="card card--${color} ${repeatClass} ${deadlineClass}"
    >
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          ${editButton}
          ${archiveButton}
          ${favoritesButton}
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${isDateShowing ? date : ''}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
    `
};

export default class Task extends AbstractComponent {
    constructor(task) {
      super();
      this._task = task;
    }

    getTemplate() {
      return createCardTemplate(this._task);
    }

    setEditButtonClickHandler(handler) {
      this.getElement().querySelector('.card__btn--edit').addEventListener('click', handler)
    }

    setFavoritesButtonClickHandler(handler) {
      this.getElement().querySelector('.card__btn--favorites')
      .addEventListener('click', handler);
    }

    setArchiveButtonClickHandler(handler) {
      this.getElement().querySelector('.card__btn--archive')
      .addEventListener('click', handler);
    }
}


