import BoardComponent from "./components/board-tasks.js";
import FilterComponent from "./components/filters.js";
import SiteMenuComponent from './components/menu.js';
import BoardController from "./controllers/board-contoller.js";




import { render, RenderPosition, replace, remove} from "./render.js";
import { generateFilters } from "./mock/filter.js";
import { generateTasks } from "./mock/task.js";


// Variables


const TASK_COUNT = 22;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');


const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);



