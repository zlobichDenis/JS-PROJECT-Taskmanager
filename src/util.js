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





export {getRandomIntNumber, getRandomElemFromArray, getRandomDate, formatTime, generateRepeatingDays, defaultReapeatingDays};