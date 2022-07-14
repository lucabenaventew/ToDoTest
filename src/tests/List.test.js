/* eslint-disable */

import List from '../js/List.js';
import Task from '../js/Task.js';

describe('Test all of the List class functionalities', () => {
  let task;
  let list;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    task = new Task('Task', 1);
    list = new List();
  });

  test('Should add to localStorage', () => {
    list.add(task);
    expect(list.tasks.length).toBe(1);
    expect(localStorage.__STORE__['tasks']).toBe(
      JSON.stringify(list.tasks)
    );
  });

  test('Should delete in localStorage', () => {
    list.add(task);
    list.delete(task.id);
    expect(list.tasks.length).toBe(0);
    expect(localStorage.__STORE__['tasks']).toBe(
      JSON.stringify(list.tasks)
    );
  });

  test('Should edit the task description', () => {
    list.add(task);
    task.description = 'Updated description';
    list.update(task);
    expect(list.tasks[0].description).toBe(task.description);
    expect(localStorage.__STORE__['tasks']).toBe(
      JSON.stringify(list.tasks)
    );
  });

  test('Should edit the task status', () => {
    list.add(task);
    task.complete = true;
    list.update(task);
    expect(list.tasks[0].complete).toBe(true);
    expect(localStorage.__STORE__['tasks']).toBe(
      JSON.stringify(list.tasks)
    );
  });

  test('Should remove all completed tasks', () => {
    for (let i = 0; i < 10; i += 1) {
      list.add(new Task(`Task ${i}`, i, i % 2 == 0 ? true : false));
    }

    list.tasks.forEach((task) => {
      if (task.complete) {
        list.delete(task.id);
      }
    });

    expect(list.tasks.length).toBe(5);
    expect(localStorage.__STORE__['tasks']).toBe(
      JSON.stringify(list.tasks)
    );
  });
});
