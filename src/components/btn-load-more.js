import AbstractComponent from "./abstract-component.js";

const createBtnLoadMore = () => {
    return `<button class="load-more" type="button">load more</button>
    `
};

export default class LoadMoreBtn extends AbstractComponent {
    getTemplate() {
        return createBtnLoadMore();
    }

    setClickHandler(handler) {
        this.getElement().addEventListener('click', handler);
    }
};
