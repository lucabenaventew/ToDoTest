import { store, getFromStorage } from './utilities.js';

export default class List {
  constructor() {
    this.tasks = [];
    this.tasks = getFromStorage('tasks');
  }

  add(task) {
    this.tasks.push(task);
    store(this.tasks, 'tasks');
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.#sort();
    store(this.tasks, 'tasks');
  }

  update(task) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (this.tasks[i].id === task.id) {
        this.tasks[i].index = task.index;
        this.tasks[i].title = task.title;
        this.tasks[i].complete = task.complete;
        store(this.tasks, 'tasks');
      }
    }
  }

  sortByDomIndex(list) {
    const indexArray = [];
    Object.values(list).forEach((task) => {
      indexArray.push(task.getAttribute('data-index'));
    });

    const tasks = [];
    for (let i = 0; i < indexArray.length; i += 1) {
      const b = this.tasks.filter((task) => Number(indexArray[i]) === task.index)[0];
      tasks.push(b);
    }

    this.tasks = tasks;
    this.#sort();
    store(this.tasks, 'tasks');
  }

  #sort() {
    const sorted = [];

    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i;
    }

    let count = 0;
    while (count < this.tasks.length) {
      const item = count;
      sorted.push(this.tasks.filter((t) => t.index === item)[0]);
      count += 1;
    }

    this.tasks = sorted;
  }
}
