import { COLORS_CARD, TASK_DESC, MONTH_NAMES } from "../const.js";
import { defaultReapeatingDays, formatTime, formatDate, generateRepeatingDays, getRandomDate } from "../util.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { DAYS } from "../const.js";
import { encode } from "he";



const createColorsMarkup = (mainColor) => {
  return COLORS_CARD.map((color) => {
    return `
    <input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color"value="${color}"
    ${color === mainColor ? 'checked' : ''}/>
    <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label
>
`
  }).join('\n');
};

const createRepeatingDaysMarkup = (reapeatingDays) => { 
  const keys = Object.keys(reapeatingDays);
  return keys.map((key) => {
    return `
    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${key}-4" name="repeat" value="${key}" ${reapeatingDays[key] ? 'checked = "true"' : ''}/>
  <label class="card__repeat-day" for="repeat-${key}-4">${key}</label>
`
  }).join('\n');
};


const createEditCardForm = (task) => {

  const {description: currentDescription, color, reapeatingDays, dueDate} = task;

  const savedDescription = encode(currentDescription);
  const mainColor = color;
  const reapeatingDaysMarkup = createRepeatingDaysMarkup(reapeatingDays); 
  const colors = createColorsMarkup(mainColor); 

  const isExpired = dueDate instanceof Date && dueDate < Date.now(); 
  const isDateShowing = !!dueDate;
 /*  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';   */
  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``; // для карточки задачи 



  const isRepeated = Object.values(reapeatingDays).some(Boolean); 

  const repeatClass = isRepeated ? 'card--repeat' : '';


    return `<article class="card card--edit card--${mainColor} ${repeatClass} ${deadlineClass}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${savedDescription}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDateShowing ? 'yes' : 'no'}</span>
              </button>
              ${isDateShowing ? `<fieldset class="card__date-deadline">
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder="${date} ${time}"
                          name="date"
                          value="${date} ${time}"
                        />
                      </label>
                    </fieldset>`
               : ''}
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeated ? 'yes' : 'no'}</span>
              </button>
              ${isRepeated ? `<fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                ${reapeatingDaysMarkup}
              </div>
            </fieldset>` : ''}
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colors}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>
  `
};


export default class EditForm extends AbstractSmartComponent {
  constructor(task) {
    super()
    this._task = task;
    this._copyTask = null;
    this._submitHandler = null;
    this._deleteButtonHandler = null;
    this._subscribeOnEvents();
    this._flatpickr = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEditCardForm(this._task);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this._task = this._copyTask;
    this.rerender();
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();

      this._flatpickr = null;
    }

    super.removeElement();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._task.dueDate) {
      const dateElement = this.getElement().querySelector('.card__date');
      this._flatpickr = flatpickr(dateElement, {
/*         altInput: true, */
        allowInput: true,
        enableTime: true,
        dateFormat: 'd M H:i',
        defaultDate: this._task.duedate,
      })
    }
  }


  setSubmitHandler(handler) {
    this.getElement().querySelector('form')
    .addEventListener('submit', handler);

    this._submitHandler = handler;
  }

  getData() {
    const form = this.getElement().querySelector('.card__form');
    /* const formData = new FormData(form); */
     
    /* return parseFormData(formData); */
    return new FormData(form);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector('.card__delete')
    .addEventListener('click', handler);

    this._deleteButtonHandler = handler;
  }

  _subscribeOnEvents() {
    this._copyTask = Object.assign({}, this._task);
    const element = this.getElement();

    element.querySelector('.card__date-deadline-toggle')
    .addEventListener('click', () => {
      this._task.dueDate === null
        ? this._task.dueDate = getRandomDate()
        : this._task.dueDate = null;
      this.rerender();
    });

    element.querySelector('.card__repeat-toggle')
    .addEventListener('click', () => {
      this._isRepeatingTask = Object.values(this._task.reapeatingDays).some(Boolean)
        ? this._task.reapeatingDays = defaultReapeatingDays
        : this._task.reapeatingDays = Object.assign({}, defaultReapeatingDays,{ 'mo': true });
      this.rerender();
    });

    element.querySelector('.card__colors-wrap')
    .addEventListener('change', (evt) => {
      this._task.color = evt.target.value;

      this.rerender();
    });

    const repeatDays = element.querySelector('.card__repeat-days');
    if(repeatDays) {
      repeatDays.addEventListener('change', (evt) => {
        this._activeRepeatingDays = this._task.reapeatingDays;
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;
        this.rerender();
      })
    }
  }
}
