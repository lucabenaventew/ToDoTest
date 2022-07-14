import './scss/index.scss';
import Task from './js/Task.js';
import List from './js/List.js';
import { insertTasksIntoDom, taskBlur, taskFocus } from './js/utilities.js';
import dragDropSorting from './js/sorting.js';

const listElement = document.querySelector('#list');
const addTaskForm = document.querySelector('#add-task');
const btnDeleteDoneTasks = document.querySelector('#btn-delete-done-tasks');

const list = new List();
let { tasks } = list;

const updateIndex = () => {
  listElement.childNodes.forEach((task) => {
    dragDropSorting(task, list);
  });
};

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.querySelector('#task-input');
  if (!taskInput.value.trim()) return;
  const task = new Task(taskInput.value, tasks.length, false);
  list.add(task);
  listElement.innerHTML = '';
  insertTasksIntoDom(tasks);
  addTaskForm.reset();
  updateIndex();
});

window.onload = () => {
  insertTasksIntoDom(tasks);
  updateIndex();
};

const updateList = () => {
  tasks = list.tasks;
  listElement.innerHTML = '';
  insertTasksIntoDom(tasks);
};

const taskById = (id) => tasks.filter((t) => t.id === id)[0];

let focused;
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('control-indicator')) {
    const checkbox = event.target.parentElement.children[1];
    if (checkbox.checked) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
    const task = taskById(checkbox.getAttribute('data-check-id'));
    task.complete = checkbox.checked;
    list.update(task);
    updateList();
  }

  if (focused && !focused.contains(event.target)) {
    taskBlur(focused.getAttribute('id'));
    focused = '';
  }

  const taskButton = event.target.parentElement;
  const taskId = taskButton.getAttribute('data-btn-id');
  const taskButtonStatus = taskButton.getAttribute('data-status');

  if (taskButtonStatus === 'delete' && event.target === taskButton.firstChild) {
    list.delete(taskId);
    updateList();
    focused = '';
    return;
  }

  if (taskId) {
    const focusOnTask = taskFocus(taskId);
    if (focusOnTask) {
      focused = focusOnTask;
    }
  }
  updateIndex();
});

document.addEventListener('input', (e) => {
  const input = e.target;
  const id = input.getAttribute('data-input-id');
  if (id) {
    const task = taskById(id);
    task.description = input.value;
    list.update(task);
  }
});

btnDeleteDoneTasks.addEventListener('click', () => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].complete) {
      list.delete(tasks[i].id);
    }
  }
  updateList();
});
