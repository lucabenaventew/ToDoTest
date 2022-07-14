const dragDropSorting = (task, listObject) => {
  const swapTasks = (fromTask, toTask) => {
    const taskOne = document.querySelector(`[data-index="${fromTask}"]`);
    const taskTwo = document.querySelector(`[data-index="${toTask}"]`);
    taskOne.parentNode.insertBefore(taskOne, taskTwo);
    listObject.sortByDomIndex(taskTwo.parentNode.children);
    taskOne.setAttribute('data-index', toTask);
    taskTwo.setAttribute('data-index', fromTask);
  };

  document.querySelector('#list').addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  task.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragged');
  });

  task.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragged');
  });

  task.addEventListener('drop', (e) => {
    const draggedTask = +document.querySelector('.dragged').getAttribute('data-index');
    const dropedOn = +e.target.closest('li').getAttribute('data-index');
    swapTasks(draggedTask, dropedOn);
  });
};

export default dragDropSorting;
