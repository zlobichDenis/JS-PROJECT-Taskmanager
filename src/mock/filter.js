import { getTasksByFilter } from "../util";

const generateFilters = (filterName, allTasks) => {
    return {
        name: filterName,
        count: getTasksByFilter(allTasks, filterName).length,
    }
};

export { generateFilters };

