/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/boardFilters.js":
/*!****************************************!*\
  !*** ./src/components/boardFilters.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBoardFilter": () => (/* binding */ addBoardFilter)
/* harmony export */ });
const addBoardFilter = () => {
    return `
        <div class="board__filter-list">
            <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
            <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
            <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
        </div>
    `
};



/***/ }),

/***/ "./src/components/btnLoadMore.js":
/*!***************************************!*\
  !*** ./src/components/btnLoadMore.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBtnLoadMore": () => (/* binding */ addBtnLoadMore)
/* harmony export */ });
const addBtnLoadMore = () => {
    return `
    <button class="load-more" type="button">load more</button>
    `
};



/***/ }),

/***/ "./src/components/cardExample.js":
/*!***************************************!*\
  !*** ./src/components/cardExample.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCardTemplate": () => (/* binding */ addCardTemplate)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./src/util.js");




const addCardTemplate = (task) => {

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



/***/ }),

/***/ "./src/components/cardForm.js":
/*!************************************!*\
  !*** ./src/components/cardForm.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCardForm": () => (/* binding */ addCardForm)
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


const addCardForm = (task) => {

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



/***/ }),

/***/ "./src/components/filters.js":
/*!***********************************!*\
  !*** ./src/components/filters.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilterTemplate": () => (/* binding */ createFilterTemplate)
/* harmony export */ });
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
        ${filtersMarkup}   
    `
};



/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addMenu": () => (/* binding */ addMenu)
/* harmony export */ });
const addMenu = () => {
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
    const diffValue = sign * getRandomIntNumber(0, 11);

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
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_filters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/filters.js */ "./src/components/filters.js");
/* harmony import */ var _components_boardFilters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/boardFilters.js */ "./src/components/boardFilters.js");
/* harmony import */ var _components_cardForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cardForm.js */ "./src/components/cardForm.js");
/* harmony import */ var _components_cardExample_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cardExample.js */ "./src/components/cardExample.js");
/* harmony import */ var _components_btnLoadMore_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/btnLoadMore.js */ "./src/components/btnLoadMore.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _mock_task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/task.js */ "./src/mock/task.js");










// Variables
const mainContol = document.querySelector('.main__control');
const mainFilter = document.querySelector('.main__filter');
const board = document.querySelector('.board');
const boardTasks = board.querySelector('.board__tasks');


const filters = (0,_mock_filter_js__WEBPACK_IMPORTED_MODULE_6__.generateFilters)();
const TASK_COUNT = 22;
const SHOW_TASK_START = 8;
const SHOW_TASK_BY_BTN = 4;
const tasks = (0,_mock_task_js__WEBPACK_IMPORTED_MODULE_7__.generateTasks)(TASK_COUNT);

let showingTasksCount = SHOW_TASK_START;

// Create page
  mainContol.insertAdjacentHTML('beforeend', (0,_components_menu_js__WEBPACK_IMPORTED_MODULE_0__.addMenu)());
  mainFilter.insertAdjacentHTML('afterbegin', (0,_components_filters_js__WEBPACK_IMPORTED_MODULE_1__.createFilterTemplate)(filters));
  board.insertAdjacentHTML('afterbegin', (0,_components_boardFilters_js__WEBPACK_IMPORTED_MODULE_2__.addBoardFilter)());
  boardTasks.insertAdjacentHTML('afterbegin', (0,_components_cardForm_js__WEBPACK_IMPORTED_MODULE_3__.addCardForm)(tasks[0]));
  for (let i = 1; i < showingTasksCount; i++) {
    boardTasks.insertAdjacentHTML('beforeend', (0,_components_cardExample_js__WEBPACK_IMPORTED_MODULE_4__.addCardTemplate)(tasks[i]));
  };
board.insertAdjacentHTML('beforeend', (0,_components_btnLoadMore_js__WEBPACK_IMPORTED_MODULE_5__.addBtnLoadMore)());
const addMoreBtn = board.querySelector('.load-more');

// Events
addMoreBtn.addEventListener('click', () => {
  const prevTasksCount = SHOW_TASK_START;
  showingTasksCount = showingTasksCount + SHOW_TASK_BY_BTN;
  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
    boardTasks.insertAdjacentHTML('beforeend', (0,_components_cardExample_js__WEBPACK_IMPORTED_MODULE_4__.addCardTemplate)(task));
  });
  if (showingTasksCount >= tasks.length) {
    addMoreBtn.remove();
  };
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map