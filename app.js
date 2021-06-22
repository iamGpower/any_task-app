// Load UI Vars
const form = document.querySelector('#task-form');
const task = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filterTask = document.querySelector('#filter');
const clearTask = document.querySelector('.clear-tasks');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// Load task event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear all task event
	clearTask.addEventListener('click', clearTasks);
	// Filter task event
	filterTask.addEventListener('keyup', filterTasks);
}

// Load task
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function (task) {
		// create a list item
		const li = document.createElement('li');
		li.className = 'collection-list';

		// create text node
		li.appendChild(document.createTextNode(task));

		// create link element
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link);

		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	// console.log(task.value);
	if (task.value === '') {
		alert('Please input a task');
		return;
	} else {
		// create a list item
		const li = document.createElement('li');
		li.className = 'collection-list';

		// create text node
		li.appendChild(document.createTextNode(task.value));

		// create link element
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link);

		taskList.appendChild(li);

		// add task to LS
		storeTaskToLocalStorage(task.value);

		task.value = '';

		console.log(li);
		e.preventDefault();
	}
}

// Store tasks to LS
function storeTaskToLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove single task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure')) {
			e.target.parentElement.parentElement.remove();
			deleteTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove task from LS
function deleteTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
			// console.log(index, task, taskItem.textContent);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
	console.log('Task after', tasks);
}

// Clear all task
function clearTasks() {
	if (taskList.firstChild === null) {
		alert("There's nothing to delete here");
		// return;
	} else {
		if (confirm("You're about to clear all task?")) {
			while (taskList.firstChild) {
				taskList.removeChild(taskList.firstChild);
			}
			deleteAllTasks();
		}
	}
}

// Delete all tasks from LS
function deleteAllTasks() {
	localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-list').forEach(function (task) {
		const listContent = task.firstChild.textContent;
		if (listContent.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
		// console.log(task.firstChild, task.firstElementChild);
	});
	// console.log(text);
}
