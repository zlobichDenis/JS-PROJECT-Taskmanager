/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/board-tasks.js":
/*!***************************************!*\
  !*** ./src/components/board-tasks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


const createBoardTemplate = () => {
    return `
    <section class="board container">
        <div class="board__tasks"></div>
    </section>
    `
}; 

class Board {
    constructor() {
        this._element = null;
    }

    getTemplate() {
        return createBoardTemplate();
    }

    getElement() {
        if(!this._element) {
            this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}

/***/ }),

/***/ "./src/components/boardFilters.js":
/*!****************************************!*\
  !*** ./src/components/boardFilters.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sort)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


const createSortTemplate = () => {
    return `
        <div class="board__filter-list">
            <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
            <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
            <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
        </div>
    `
};

class Sort {
    constructor () {
        this._element = null;
    }

    getTemplate() {
        return createSortTemplate();
    }

    getElement() {
        if (!this._element) {
            return this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}



/***/ }),

/***/ "./src/components/btnLoadMore.js":
/*!***************************************!*\
  !*** ./src/components/btnLoadMore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadMoreBtn)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


const createBtnLoadMore = () => {
    return `
    <button class="load-more" type="button">load more</button>
    `
};

class LoadMoreBtn {
    constructor() {
        this._element = null;
    }

    getTemplate() {
        return createBtnLoadMore();
    }

    getElement() {
        if(!this._element) {
            this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate())
        }

        return this._element
    }

    removeElement() {
        this._element = null;
    }
};


/***/ }),

/***/ "./src/components/cardExample.js":
/*!***************************************!*\
  !*** ./src/components/cardExample.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");




const createCardTemplate = (task) => {

  const {description, color, reapeatingDays, dueDate,  isArchive, isFavorite} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now(); 
  const isDateShowing = !!dueDate; 

  const date = isDateShowing ? `${dueDate.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[dueDate.getMonth()]}` : '';  
  const time = isDateShowing ? (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(dueDate) : '';
 
  const isRepeat = (element) => {
   return element === true;
  };

  const deadlineClass = isExpired ? `card--deadline` : ``; 
  const isRepeated = Object.values(reapeatingDays).some(isRepeat); 

  const repeatClass = isRepeated ? 'card--repeat' : '';

    return `
    <article class="card card--${color} ${repeatClass} ${deadlineClass}"
    >
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--${isArchive ? 'archive' : 'disabled'}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--${isFavorite ? 'favorite' : 'disabled'}"
          >
            favorites
          </button>
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

class Task {
    constructor(task) {
      this._task = task;

      this._element = null;
    }

    getTemplate() {
      return createCardTemplate(this._task);
    }

    getElement() {
      if (!this._element) {
        this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(this.getTemplate())
      }

      return this._element;
    }

    removeElement() {
      this._element = null;
    }
}




/***/ }),

/***/ "./src/components/cardForm.js":
/*!************************************!*\
  !*** ./src/components/cardForm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditForm)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");





const createColorsMarkup = () => {
  return _const_js__WEBPACK_IMPORTED_MODULE_0__.COLORS_CARD.map((color) => {
    return `
    <input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color"value="${color}"
    ${color === 'black' ? 'checked' : ''}/>
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

  const {description, color, reapeatingDays, dueDate} = task;



  const reapeatingDaysMarkup = createRepeatingDaysMarkup(reapeatingDays); 
  const colors = createColorsMarkup(); 

  const isExpired = dueDate instanceof Date && dueDate < Date.now(); 
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_0__.MONTH_NAMES[dueDate.getMonth()]}` : '';  
  const time = isDateShowing ? (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(dueDate) : '';
  const deadlineClass = isExpired ? `card--deadline` : ``; // для карточки задачи 


  const isRepeat = (element) => {
   return element === true;
  };
  const isRepeated = Object.values(reapeatingDays).some(isRepeat); 

  const repeatClass = isRepeated ? 'card--repeat' : '';

    return `
    <article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
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
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDateShowing ? 'yes' : 'no'}</span>
              </button>
              ${isDateShowing ? `
                    <fieldset class="card__date-deadline">
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder=""
                          name="date"
                          value="${date} ${time}"
                        />
                      </label>
                    </fieldset>`
               : ''}
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeated ? 'yes' : 'no'}</span>
              </button>

              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${reapeatingDaysMarkup}
                </div>
              </fieldset>
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


class EditForm {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createEditCardForm(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createElement)(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/filters.js":
/*!***********************************!*\
  !*** ./src/components/filters.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Filter)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


const createInput = (filter, isChecked) => {
    const {name, count} = filter;
    return `
        <input
            type="radio"
            id="filter__${name}"
            class="filter__input visually-hidden"
            name="filter"
            ${isChecked ? 'checked' : ''} />
        <label for="filter__${name}" class="filter__label">
            ${name} <span class="filter__${name}-count">${count}</span>
        </label>
        `
};

const createFilterTemplate = (filters) => {
    const filtersMarkup = filters.map((filter, i) => {
        return createInput(filter, i === 0)}).join('\n');

    return `
    <section class="main__filter filter container">${filtersMarkup}</section> 
    `
};

class Filter {
    constructor(filters) {
        this._filters = filters;
        this._element = null;
    }

    getTemplate() {
        return createFilterTemplate(this._filters);
    }

    getElement() {
        if (!this._element) {
            this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SiteMenu)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


const createSiteMenuTemplate = () => {
    return `
        <section class="control__btn-wrap">
            <input
                type="radio"
                name="control"
                id="control__new-task"
                class="control__input visually-hidden"
            />
            <label for="control__new-task" class="control__label control__label--new-task"
                >+ ADD NEW TASK</label
            >
            <input
                type="radio"
                name="control"
                id="control__task"
                class="control__input visually-hidden"
                checked
            />
            <label for="control__task" class="control__label">TASKS</label>
            <input
                type="radio"
                name="control"
                id="control__statistic"
                class="control__input visually-hidden"
            />
            <label for="control__statistic" class="control__label"
                >STATISTICS</label
            >
            </section>
    `
};

class SiteMenu {
    constructor() {
        this._element = null;
    }

    getTemplate() {
        return createSiteMenuTemplate()
    }

    getElement() {
        if(!this._element) {
            this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COLORS_CARD": () => (/* binding */ COLORS_CARD),
/* harmony export */   "MONTH_NAMES": () => (/* binding */ MONTH_NAMES),
/* harmony export */   "TASK_DESC": () => (/* binding */ TASK_DESC)
/* harmony export */ });
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


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateFilters": () => (/* binding */ generateFilters)
/* harmony export */ });
const filterNames  = ['all', 'overdue', 'today', 'favorites', 'repeating', 'archive'];

const generateFilters = () => {
   return filterNames.map((filterName) => {
        return {
            name: filterName,
            count: parseInt(Math.random() * 20),
        }
   });
};





/***/ }),

/***/ "./src/mock/task.js":
/*!**************************!*\
  !*** ./src/mock/task.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateTasks": () => (/* binding */ generateTasks),
/* harmony export */   "generateTask": () => (/* binding */ generateTask)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const generateTask = () => {
    const dueDate =  Math.random() > 0.5 ? null : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomDate)();

    return {
        description: (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElemFromArray)(_const_js__WEBPACK_IMPORTED_MODULE_1__.TASK_DESC),
        color: (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElemFromArray)(_const_js__WEBPACK_IMPORTED_MODULE_1__.COLORS_CARD),
        isArchive: Math.random() * 0.5,
        isFavorite: Math.random() * 0.5,
        dueDate,
        reapeatingDays: dueDate ? _util_js__WEBPACK_IMPORTED_MODULE_0__.defaultReapeatingDays : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.generateRepeatingDays)(),
    };
};

const generateTasks = (count) => {
    return new Array(count).fill('').map(generateTask);
};




/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "getRandomIntNumber": () => (/* binding */ getRandomIntNumber),
/* harmony export */   "getRandomElemFromArray": () => (/* binding */ getRandomElemFromArray),
/* harmony export */   "getRandomDate": () => (/* binding */ getRandomDate),
/* harmony export */   "formatTime": () => (/* binding */ formatTime),
/* harmony export */   "generateRepeatingDays": () => (/* binding */ generateRepeatingDays),
/* harmony export */   "defaultReapeatingDays": () => (/* binding */ defaultReapeatingDays)
/* harmony export */ });
const defaultReapeatingDays = {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
};

const getRandomIntNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

const getRandomElemFromArray = (array) => {
    return array[getRandomIntNumber(0, array.length - 1)];
};

const getRandomDate = () => {
    const targetDate = new Date;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const diffValue = sign * getRandomIntNumber(0, 8);

    targetDate.setDate(targetDate.getDate() + diffValue);

    return targetDate
};

const castTimeFormat = (value) => {
    return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
    const hours = castTimeFormat(date.getHours() % 12);
    const minutes = castTimeFormat(date.getMinutes())

    return `${hours}:${minutes}`
};

const generateRepeatingDays = () => {
    return Object.assign({}, defaultReapeatingDays,{ 'mo': Math.random() > 0.5});
};

const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement;
};

const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(element);
            break;
        case RenderPosition.BEFOREEND:
            container.append(element)
            break;
    }
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_board_tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/board-tasks.js */ "./src/components/board-tasks.js");
/* harmony import */ var _components_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/filters.js */ "./src/components/filters.js");
/* harmony import */ var _components_btnLoadMore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/btnLoadMore.js */ "./src/components/btnLoadMore.js");
/* harmony import */ var _components_cardForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cardForm.js */ "./src/components/cardForm.js");
/* harmony import */ var _components_cardExample_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cardExample.js */ "./src/components/cardExample.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_boardFilters_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/boardFilters.js */ "./src/components/boardFilters.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _mock_task_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/task.js */ "./src/mock/task.js");














// Variables


const TASK_COUNT = 22;
const SHOW_TASK_START = 8;
const SHOW_TASK_BY_BTN = 4;


//
const renderTask = (taskList, task) => {
  const clickOnEditBtn = () => {
    taskList.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const submitEditForm = (evt) => {
    evt.preventDefault();
    taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new _components_cardExample_js__WEBPACK_IMPORTED_MODULE_4__.default(task);
  const editBtn = taskComponent.getElement().querySelector('.card__btn--edit');
  const taskEditComponent = new _components_cardForm_js__WEBPACK_IMPORTED_MODULE_3__.default(task);
  const editForm = taskEditComponent.getElement().querySelector('.card__form');

  editBtn.addEventListener('click', clickOnEditBtn);
  editForm.addEventListener('submit', submitEditForm);

  (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(taskList, taskComponent.getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
};


const renderBoard = (tasks) => {
  (0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(boardComponent.getElement(), new _components_boardFilters_js__WEBPACK_IMPORTED_MODULE_6__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

  const taskList = boardComponent.getElement().querySelector('.board__tasks');

  let showingTasksCounter = SHOW_TASK_START;
  console.log(tasks.slice(0, showingTasksCounter))
    tasks.slice(0, showingTasksCounter).forEach(task => {
      renderTask(taskList, task);
    })

  ;(0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(boardComponent.getElement(), new _components_btnLoadMore_js__WEBPACK_IMPORTED_MODULE_2__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
  const loadMoreBtn = document.querySelector('.load-more');

  loadMoreBtn.addEventListener('click', () => {
    const prevTasksCount = showingTasksCounter;
    showingTasksCounter = showingTasksCounter + SHOW_TASK_BY_BTN;

    tasks.slice(prevTasksCount, showingTasksCounter).forEach((task) => {
      renderTask(taskList, task);
    });

    if (showingTasksCounter >= tasks.length) {
      loadMoreBtn.remove();
      loadMoreBtn.removeElement();
    }
  });
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');


const tasks = (0,_mock_task_js__WEBPACK_IMPORTED_MODULE_9__.generateTasks)(TASK_COUNT);
const filters = (0,_mock_filter_js__WEBPACK_IMPORTED_MODULE_8__.generateFilters)();

(0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(siteHeaderElement, new _components_menu_js__WEBPACK_IMPORTED_MODULE_5__.default().getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
(0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(siteMainElement, new _components_filters_js__WEBPACK_IMPORTED_MODULE_1__.default(filters).getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);

const boardComponent = new _components_board_tasks_js__WEBPACK_IMPORTED_MODULE_0__.default();
(0,_util_js__WEBPACK_IMPORTED_MODULE_7__.render)(siteMainElement, boardComponent.getElement(), _util_js__WEBPACK_IMPORTED_MODULE_7__.RenderPosition.BEFOREEND);
renderBoard(tasks);
//



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map