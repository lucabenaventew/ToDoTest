/* eslint-disable */

import { store, insertTasksIntoDom } from '../js/utilities';

test('should save to localStorage', () => {
  const KEY = 'foo',
    VALUE = [{ description: 'asdfa', completed: true }];
  store(VALUE, KEY);
  expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, JSON.stringify(VALUE));
  expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(VALUE));
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
});
