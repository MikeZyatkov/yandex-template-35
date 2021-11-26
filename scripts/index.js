const TODO_LIST = [
    { title: 'Съесть печеньку 🍪' },
    { title: 'Изучить React ⚛️' },
    { title: 'Полить цветы 🌸' },
    { title: 'Сделать свой сайт 👨‍💻' },
    { title: 'Погулять в парке 🌳' },
];


const listContainerEl = document.querySelector('.todo__list');
const templateEl = document.querySelector('.template');

const addButtonEl = document.querySelector('.button_add');
const inputEl = document.querySelector('.input');

let editing;

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

    const removeBtn = newItem.querySelector('.button_remove');
    removeBtn.addEventListener('click', handleDelete);

    const duplicateBtn = newItem.querySelector('.button_duplicate');
    duplicateBtn.addEventListener('click', (event) => handleDuplicate(event));

    const editBtn = newItem.querySelector('.button_edit');
    editBtn.addEventListener('click', handleEdit);

    return newItem;
}

function handleAdd() {
    const inputText = inputEl.value;
    const listItem = getItem({title: inputText});
    listContainerEl.prepend(listItem);

    inputEl.value = '';
}

function handleDelete(event) {
    const targetEl = event.target;
    const listItem = targetEl.closest('.card');
    listItem.remove();
}

function handleDuplicate(event) {
    const targetEl = event.target;
    const listItem = targetEl.closest('.card');
    const headerEl = listItem.querySelector('.card__title');
    const title = headerEl.textContent;

    const newItem = getItem({title});
    listItem.after(newItem);
}

function handleEdit(event) {
    const targetEl = event.target;
    editing = targetEl.closest('.card');

    inputEl.value = editing.querySelector('.card__title').textContent;

    addButtonEl.classList.remove('button_add');
    addButtonEl.classList.add('button_edit');

    addButtonEl.removeEventListener('click', handleAdd);
    addButtonEl.addEventListener('click', handleEditConfirm);
}

function handleEditConfirm() {
    editing.querySelector('.card__title').textContent = inputEl.value;

    addButtonEl.classList.remove('button_edit');
    addButtonEl.classList.add('button_add');

    inputEl.value = ''

    editing = null;

    addButtonEl.removeEventListener('click', handleEditConfirm);
    addButtonEl.addEventListener('click', handleAdd);
}

addButtonEl.addEventListener('click', handleAdd);

render();
