import { getRandomElemFromArray, getRandomIntNumber, getRandomDate, generateRepeatingDays, defaultReapeatingDays } from "../util.js";
import { COLORS_CARD, TASK_DESC } from "../const.js";
const generateTask = () => {
    const dueDate =  Math.random() > 0.5 ? null : getRandomDate();

    return {
        id: String(new Date() + Math.random()),
        description: getRandomElemFromArray(TASK_DESC),
        color: getRandomElemFromArray(COLORS_CARD),
        isArchive: Math.random() > 0.5,
        isFavorite: Math.random() > 0.5,
        dueDate,
        reapeatingDays: dueDate ? defaultReapeatingDays : generateRepeatingDays(),
    };
};

const generateTasks = (count) => {
    return new Array(count).fill('').map(generateTask);
};


export { generateTasks, generateTask};