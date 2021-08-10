const filterNames  = ['all', 'overdue', 'today', 'favorites', 'repeating', 'archive'];

const generateFilters = () => {
   return filterNames.map((filterName) => {
        return {
            name: filterName,
            count: parseInt(Math.random() * 20),
        }
   });
};

export { generateFilters };

