const TODO_LIST = [
    { title: 'Съесть печеньку 🍪' },
    { title: 'Изучить React ⚛️' },
    { title: 'Полить цветы 🌸' },
    { title: 'Сделать свой сайт 👨‍💻' },
    { title: 'Погулять в парке 🌳' },
];


const listContainerEl = document.querySelector('.todo__list');
const templateEl = document.querySelector('.template');

function render() {
    const html = TODO_LIST
        .map((item, idx, arr) => {
            return getItem(item);
        });

    listContainerEl.append(...html);
}

function getItem(item) {
    const newItem = templateEl.content.cloneNode(true);
    const headerEl = newItem.querySelector('.card__title');
    headerEl.textContent = item.title;

    return newItem;
}

render();
