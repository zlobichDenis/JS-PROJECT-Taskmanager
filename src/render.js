export const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstChild;
};

export const RenderPosition = {
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
};

export const render = (container, component, place) => {
    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(component.getElement());
            break;
        case RenderPosition.BEFOREEND:
            container.append(component.getElement())
            break;
    }
};

export const replace = (newComponent, oldComponent) => {
    const parentElement = oldComponent.getElement().parentElement;
    const newElement = newComponent.getElement();
    const oldElement = oldComponent.getElement();

    const isExistElement = (parentElement && newElement && oldElement);

    if(isExistElement && parentElement.contains(oldElement)) {
        parentElement.replaceChild(newElement, oldElement);
    }
};

export const remove = (component) => {
    component.getElement().remove();
    component.removeElement();
}