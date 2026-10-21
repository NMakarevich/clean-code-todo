const taskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.button-add');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const task = document.createElement('li');
  task.classList.add('task-item');

  const isDone = document.createElement('input');
  const taskText = document.createElement('label');
  const editInput = document.createElement('input');
  const editTaskButton = document.createElement('button');

  const deleteTaskButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  taskText.innerText = taskString;
  taskText.className = 'task-text';

  isDone.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task-input';

  editTaskButton.innerText = 'Edit';
  editTaskButton.className = 'edit';

  deleteTaskButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteTaskButton.appendChild(deleteIcon);

  task.append(isDone, taskText, editInput, editTaskButton, deleteTaskButton);
  return task;
};

const addTask = function () {
  if (!taskInput.value) return;
  const task = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const task = this.parentNode;

  const editInput = task.querySelector('.task-input');
  const taskText = task.querySelector('.task-text');
  const editTaskButton = task.querySelector('.edit');
  const isEditMode = task.classList.contains('edit-mode');

  if (isEditMode) {
    taskText.innerText = editInput.value;
    editTaskButton.innerText = 'Edit';
  } else {
    editInput.value = taskText.innerText;
    editTaskButton.innerText = 'Save';
  }

  task.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const task = this.parentNode;
  const taskList = task.parentNode;
  taskList.removeChild(task);
};

const taskCompleted = function () {
  const task = this.parentNode;
  completedTasksHolder.appendChild(task);
  bindTaskEvents(task, taskIncomplete);
};

const taskIncomplete = function () {
  const task = this.parentNode;
  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, taskCompleted);
};

addTaskButton.onclick = addTask;
addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (task, checkBoxEventHandler) {
  const isDone = task.querySelector('input[type=checkbox]');
  const editTaskButton = task.querySelector('button.edit');
  const deleteTaskButton = task.querySelector('button.delete');

  editTaskButton.onclick = editTask;
  deleteTaskButton.onclick = deleteTask;
  isDone.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
