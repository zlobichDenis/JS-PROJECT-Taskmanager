"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCardTemplate = void 0;

var _const = require("../const.js");

var addCardTemplate = function addCardTemplate(task) {
  var description = task.description,
      color = task.color,
      reapeatingDays = task.reapeatingDays,
      dueDate = task.dueDate,
      isArchive = task.isArchive,
      isFavorite = task.isFavorite;
  var isExpired = dueDate instanceof Date && dueDate < Date.now();
  var isDateShowing = !!dueDate; // написать фкнцию для возврата значений

  var date = isDateShowing ? "".concat(dueDate.getDate()) : "".concat(_const.MONTH_NAMES[dueDate.getMonth()]); // для карточки задачи 

  var month = _const.MONTH_NAMES[dueDate.getMonth()];

  var isRepeat = function isRepeat(element) {
    return element === true;
  };

  var deadlineClass = isExpired ? "card--deadline" : ""; // для карточки задачи 

  var isRepeated = Object.values(reapeatingDays).some(isRepeat);
  var repeatClass = isRepeated ? 'card--repeat' : '';
  return "\n    <article class=\"card card--".concat(color, " ").concat(repeatClass, " ").concat(deadlineClass, "\"\n    >\n    <div class=\"card__form\">\n      <div class=\"card__inner\">\n        <div class=\"card__control\">\n          <button type=\"button\" class=\"card__btn card__btn--edit\">\n            edit\n          </button>\n          <button type=\"button\" class=\"card__btn card__btn--").concat(isArchive ? 'archive' : 'disabled', "\">\n            archive\n          </button>\n          <button\n            type=\"button\"\n            class=\"card__btn card__btn--favorites card__btn--").concat(isFavorite ? 'favorite' : 'disabled', "\"\n          >\n            favorites\n          </button>\n        </div>\n\n        <div class=\"card__color-bar\">\n          <svg class=\"card__color-bar-wave\" width=\"100%\" height=\"10\">\n            <use xlink:href=\"#wave\"></use>\n          </svg>\n        </div>\n\n        <div class=\"card__textarea-wrap\">\n          <p class=\"card__text\">").concat(description, "</p>\n        </div>\n\n        <div class=\"card__settings\">\n          <div class=\"card__details\">\n            <div class=\"card__dates\">\n              <div class=\"card__date-deadline\">\n                <p class=\"card__input-deadline-wrap\">\n                  <span class=\"card__date\">").concat(isDateShowing ? month : '', "</span>\n                  <span class=\"card__time\">16:15</span>\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </article>\n    ");
};

exports.addCardTemplate = addCardTemplate;