"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _const = require("../const.js");

var _util = require("../util.js");

var _abstractSmartComponent = _interopRequireDefault(require("./abstract-smart-component.js"));

var _flatpickr = _interopRequireDefault(require("flatpickr"));

require("flatpickr/dist/flatpickr.min.css");

var _moment = require("moment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createColorsMarkup = function createColorsMarkup(mainColor) {
  return _const.COLORS_CARD.map(function (color) {
    return "\n    <input type=\"radio\" id=\"color-".concat(color, "-4\" class=\"card__color-input card__color-input--").concat(color, " visually-hidden\" name=\"color\"value=\"").concat(color, "\"\n    ").concat(color === mainColor ? 'checked' : '', "/>\n    <label for=\"color-").concat(color, "-4\" class=\"card__color card__color--").concat(color, "\">").concat(color, "</label\n>\n");
  }).join('\n');
};

var createRepeatingDaysMarkup = function createRepeatingDaysMarkup(reapeatingDays) {
  var keys = Object.keys(reapeatingDays);
  return keys.map(function (key) {
    return "\n    <input class=\"visually-hidden card__repeat-day-input\" type=\"checkbox\" id=\"repeat-".concat(key, "-4\" name=\"repeat\" value=\"").concat(key, "\" ").concat(reapeatingDays[key] ? 'checked = "true"' : '', "/>\n  <label class=\"card__repeat-day\" for=\"repeat-").concat(key, "-4\">").concat(key, "</label>\n");
  }).join('\n');
};

var createEditCardForm = function createEditCardForm(task) {
  var description = task.description,
      color = task.color,
      reapeatingDays = task.reapeatingDays,
      dueDate = task.dueDate;
  var mainColor = color;
  var reapeatingDaysMarkup = createRepeatingDaysMarkup(reapeatingDays);
  var colors = createColorsMarkup(mainColor);
  var isExpired = dueDate instanceof Date && dueDate < Date.now();
  var isDateShowing = !!dueDate;
  /*  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';   */

  var date = isDateShowing ? (0, _util.formatDate)(dueDate) : "";
  var time = isDateShowing ? (0, _util.formatTime)(dueDate) : "";
  console.log(date, time);
  var deadlineClass = isExpired ? "card--deadline" : ""; // для карточки задачи 

  var isRepeated = Object.values(reapeatingDays).some(Boolean);
  var repeatClass = isRepeated ? 'card--repeat' : '';
  return "<article class=\"card card--edit card--".concat(mainColor, " ").concat(repeatClass, " ").concat(deadlineClass, "\">\n    <form class=\"card__form\" method=\"get\">\n      <div class=\"card__inner\">\n        <div class=\"card__color-bar\">\n          <svg class=\"card__color-bar-wave\" width=\"100%\" height=\"10\">\n            <use xlink:href=\"#wave\"></use>\n          </svg>\n        </div>\n\n        <div class=\"card__textarea-wrap\">\n          <label>\n            <textarea\n              class=\"card__text\"\n              placeholder=\"Start typing your text here...\"\n              name=\"text\"\n            >").concat(description, "</textarea>\n          </label>\n        </div>\n\n        <div class=\"card__settings\">\n          <div class=\"card__details\">\n            <div class=\"card__dates\">\n              <button class=\"card__date-deadline-toggle\" type=\"button\">\n                date: <span class=\"card__date-status\">").concat(isDateShowing ? 'yes' : 'no', "</span>\n              </button>\n              ").concat(isDateShowing ? "<fieldset class=\"card__date-deadline\">\n                      <label class=\"card__input-deadline-wrap\">\n                        <input\n                          class=\"card__date\"\n                          type=\"text\"\n                          placeholder=\"".concat(date, " ").concat(time, "\"\n                          name=\"date\"\n                          value=\"").concat(date, " ").concat(time, "\"\n                        />\n                      </label>\n                    </fieldset>") : '', "\n              <button class=\"card__repeat-toggle\" type=\"button\">\n                repeat:<span class=\"card__repeat-status\">").concat(isRepeated ? 'yes' : 'no', "</span>\n              </button>\n              ").concat(isRepeated ? "<fieldset class=\"card__repeat-days\">\n              <div class=\"card__repeat-days-inner\">\n                ".concat(reapeatingDaysMarkup, "\n              </div>\n            </fieldset>") : '', "\n            </div>\n          </div>\n\n          <div class=\"card__colors-inner\">\n            <h3 class=\"card__colors-title\">Color</h3>\n            <div class=\"card__colors-wrap\">\n              ").concat(colors, "\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card__status-btns\">\n          <button class=\"card__save\" type=\"submit\">save</button>\n          <button class=\"card__delete\" type=\"button\">delete</button>\n        </div>\n      </div>\n    </form>\n  </article>\n  ");
};

var EditForm =
/*#__PURE__*/
function (_AbstractSmartCompone) {
  _inherits(EditForm, _AbstractSmartCompone);

  function EditForm(task) {
    var _this;

    _classCallCheck(this, EditForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditForm).call(this));
    _this._task = task;
    _this._submitHandler = null;

    _this._subscribeOnEvents();

    _this._flatpickr = null;

    _this._applyFlatpickr();

    return _this;
  }

  _createClass(EditForm, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createEditCardForm(this._task);
    }
  }, {
    key: "recoveryListeners",
    value: function recoveryListeners() {
      this.setSubmitHandler(this._submitHandler);

      this._subscribeOnEvents();
    }
  }, {
    key: "rerender",
    value: function rerender() {
      _get(_getPrototypeOf(EditForm.prototype), "rerender", this).call(this);

      this._applyFlatpickr();
    }
  }, {
    key: "reset",
    value: function reset() {
      var task = this._task;
      this._isDateShowing = !task.dueDate;
      this._isRepeatingTask = Object.values(task.reapeatingDays).some(Boolean);
      this._activeRepeatingDays = Object.assign({}, task.reapeatingDays);
      this.rerender();
    }
  }, {
    key: "_applyFlatpickr",
    value: function _applyFlatpickr() {
      if (this._flatpickr) {
        this._flatpickr.destroy();

        this._flatpickr = null;
      }

      if (this._task.dueDate) {
        var dateElement = this.getElement().querySelector('.card__date');
        this._flatpickr = (0, _flatpickr["default"])(dateElement, {
          altInput: true,
          allowInput: true,
          defaultDate: this._task.duedate
        });
      }
    }
  }, {
    key: "setSubmitHandler",
    value: function setSubmitHandler(handler) {
      this.getElement().querySelector('form').addEventListener('submit', handler);
      this._submitHandler = handler;
    }
  }, {
    key: "_subscribeOnEvents",
    value: function _subscribeOnEvents() {
      var _this2 = this;

      var element = this.getElement();
      element.querySelector('.card__date-deadline-toggle').addEventListener('click', function () {
        _this2._task.dueDate === null ? _this2._task.dueDate = (0, _util.getRandomDate)() : _this2._task.dueDate = null;

        _this2.rerender();
      });
      element.querySelector('.card__repeat-toggle').addEventListener('click', function () {
        _this2._isRepeatingTask = Object.values(_this2._task.reapeatingDays).some(Boolean) ? _this2._task.reapeatingDays = _util.defaultReapeatingDays : _this2._task.reapeatingDays = Object.assign({}, _util.defaultReapeatingDays, {
          'mo': true
        });

        _this2.rerender();
      });
      element.querySelector('.card__colors-wrap').addEventListener('change', function (evt) {
        _this2._task.color = evt.target.value;

        _this2.rerender();
      });
      var repeatDays = element.querySelector('.card__repeat-days');

      if (repeatDays) {
        repeatDays.addEventListener('change', function (evt) {
          _this2._activeRepeatingDays = _this2._task.reapeatingDays;
          _this2._activeRepeatingDays[evt.target.value] = evt.target.checked;

          _this2.rerender();
        });
      }
    }
  }]);

  return EditForm;
}(_abstractSmartComponent["default"]);

exports["default"] = EditForm;