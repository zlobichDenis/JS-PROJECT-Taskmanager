"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCardForm = void 0;

var _const = require("../const.js");

var createColorsMarkup = function createColorsMarkup() {
  return _const.COLORS_CARD.map(function (color) {
    return "\n    <input type=\"radio\" id=\"color-".concat(color, "-4\" class=\"card__color-input card__color-input--").concat(color, " visually-hidden\" name=\"color\"value=\"").concat(color, "\"\n    ").concat(color === 'black' ? 'checked' : '', "/>\n    <label for=\"color-").concat(color, "-4\" class=\"card__color card__color--").concat(color, "\">").concat(color, "</label\n>\n");
  }).join('\n');
};

var createRepeatingDaysMarkup = function createRepeatingDaysMarkup(reapeatingDays) {
  var keys = Object.keys(reapeatingDays);
  return keys.map(function (key) {
    return "\n    <input class=\"visually-hidden card__repeat-day-input\" type=\"checkbox\" id=\"repeat-".concat(key, "-4\" name=\"repeat\" value=\"").concat(key, "\" ").concat(reapeatingDays[key] ? 'checked = "true"' : '', "/>\n  <label class=\"card__repeat-day\" for=\"repeat-").concat(key, "-4\">").concat(key, "</label>\n");
  }).join('\n');
};

var addCardForm = function addCardForm(task) {
  var description = task.description,
      color = task.color,
      reapeatingDays = task.reapeatingDays,
      dueDate = task.dueDate;
  var reapeatingDaysMarkup = createRepeatingDaysMarkup(reapeatingDays);
  var colors = createColorsMarkup();
  var isExpired = dueDate instanceof Date && dueDate < Date.now();
  var isDateShowing = !!dueDate;
  var date = isDateShowing ? "".concat(dueDate.getDate()) : "".concat(_const.MONTH_NAMES[dueDate.getMonth()]); // для карточки задачи 

  var deadlineClass = isExpired ? "card--deadline" : ""; // для карточки задачи 

  var isRepeat = function isRepeat(element) {
    return element === true;
  };

  var isRepeated = Object.values(reapeatingDays).some(isRepeat);
  var repeatClass = isRepeated ? 'card--repeat' : '';
  return "\n    <article class=\"card card--edit card--".concat(color, " ").concat(repeatClass, " ").concat(deadlineClass, "\">\n    <form class=\"card__form\" method=\"get\">\n      <div class=\"card__inner\">\n        <div class=\"card__color-bar\">\n          <svg class=\"card__color-bar-wave\" width=\"100%\" height=\"10\">\n            <use xlink:href=\"#wave\"></use>\n          </svg>\n        </div>\n\n        <div class=\"card__textarea-wrap\">\n          <label>\n            <textarea\n              class=\"card__text\"\n              placeholder=\"Start typing your text here...\"\n              name=\"text\"\n            >").concat(description, "</textarea>\n          </label>\n        </div>\n\n        <div class=\"card__settings\">\n          <div class=\"card__details\">\n            <div class=\"card__dates\">\n              <button class=\"card__date-deadline-toggle\" type=\"button\">\n                date: <span class=\"card__date-status\">").concat(isDateShowing ? 'yes' : 'no', "</span>\n              </button>\n              ").concat(isDateShowing, "\n              <fieldset class=\"card__date-deadline\">\n                <label class=\"card__input-deadline-wrap\">\n                  <input\n                    class=\"card__date\"\n                    type=\"text\"\n                    placeholder=\"\"\n                    name=\"date\"\n                    value=\"").concat(dueDate, "\"\n                  />\n                </label>\n              </fieldset>\n\n              <button class=\"card__repeat-toggle\" type=\"button\">\n                repeat:<span class=\"card__repeat-status\">").concat(isRepeated ? 'yes' : 'no', "</span>\n              </button>\n\n              <fieldset class=\"card__repeat-days\">\n                <div class=\"card__repeat-days-inner\">\n                  ").concat(reapeatingDaysMarkup, "\n                </div>\n              </fieldset>\n            </div>\n          </div>\n\n          <div class=\"card__colors-inner\">\n            <h3 class=\"card__colors-title\">Color</h3>\n            <div class=\"card__colors-wrap\">\n              ").concat(colors, "\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card__status-btns\">\n          <button class=\"card__save\" type=\"submit\">save</button>\n          <button class=\"card__delete\" type=\"button\">delete</button>\n        </div>\n      </div>\n    </form>\n  </article>\n  ");
};

exports.addCardForm = addCardForm;