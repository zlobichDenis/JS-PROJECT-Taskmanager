/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractComponent)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");


class AbstractComponent {
    constructor() {
        if(new.target === AbstractComponent) {
            throw new Error(`Can't instance AbstractComponent, only concrete one.`);
        }
        this._element = null;
    }

    getTemplate() {
        throw new Error ('Abstract method not implemented: getTemplate');
    }

    getElement() {
        if(!this._element) {
            this._element = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}

/***/ }),

/***/ "./src/components/board-tasks.js":
/*!***************************************!*\
  !*** ./src/components/board-tasks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createBoardTemplate = () => {
    return `<section class="board container"></section>
    `
}; 

class Board extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    getTemplate() {
        return createBoardTemplate();
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
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createInput = (filter, isChecked) => {
    const {name, count} = filter;
    return `<input
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

    return `<section class="main__filter filter container">${filtersMarkup}</section> 
    `
};

class Filter extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(filters) {
        super();

        this._filters = filters;
    }
    
    getTemplate() {
        return createFilterTemplate(this._filters);
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
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createSiteMenuTemplate = () => {
    return `<section class="control__btn-wrap">
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

class SiteMenu extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__.default {
    getTemplate() {
        return createSiteMenuTemplate();
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
        isArchive: Math.random() > 0.5,
        isFavorite: Math.random() > 0.5,
        dueDate,
        reapeatingDays: dueDate ? _util_js__WEBPACK_IMPORTED_MODULE_0__.defaultReapeatingDays : (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.generateRepeatingDays)(),
    };
};

const generateTasks = (count) => {
    return new Array(count).fill('').map(generateTask);
};




/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
};

const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

const render = (container, component, place) => {
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(component.getElement());
            break;
        case RenderPosition.BEFOREEND:
            container.append(component.getElement())
            break;
    }
};

const replace = (newComponent, oldComponent) => {
    const parentElement = oldComponent.getElement().parentElement;
    const newElement = newComponent.getElement();
    const oldElement = oldComponent.getElement();

    const isExistElement = !!(parentElement && newElement && oldElement);

    if(isExistElement && parentElement.contains(oldElement)) {
        parentElement.replaceChild(newElement, oldElement);
    }
};

const remove = (component) => {
    component.getElement().remove();
    component.removeElement();
}

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
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './components/board.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _mock_task_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mock/task.js */ "./src/mock/task.js");













// Variables


const TASK_COUNT = 22;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');


const tasks = (0,_mock_task_js__WEBPACK_IMPORTED_MODULE_6__.generateTasks)(TASK_COUNT);
const filters = (0,_mock_filter_js__WEBPACK_IMPORTED_MODULE_5__.generateFilters)();

(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(siteHeaderElement, new _components_menu_js__WEBPACK_IMPORTED_MODULE_2__.default(), _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(siteMainElement, new _components_filters_js__WEBPACK_IMPORTED_MODULE_1__.default(filters), _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.BEFOREEND);

const boardComponent = new _components_board_tasks_js__WEBPACK_IMPORTED_MODULE_0__.default();
const boardController = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './components/board.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(boardComponent);

(0,_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(siteMainElement, boardComponent, _render_js__WEBPACK_IMPORTED_MODULE_4__.RenderPosition.BEFOREEND);
boardController.render(tasks);




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map