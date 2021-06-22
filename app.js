// Load UI Vars
const form = document.querySelector('#task-form');
const task = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filterTask = document.querySelector('#filter');
const clearTask = document.querySelector('.clear-tasks');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear all task event
	clearTask.addEventListener('click', clearTasks);
	// Filter task event
	filterTask.addEventListener('keyup', filterTasks);
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

		task.value = '';

		console.log(li);
		e.preventDefault();
	}
}

// Remove single task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure')) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

// Clear all task
function clearTasks() {
	if (taskList.firstChild === null) {
		alert("There's nothing to delete here");
		// return;
	} else {
		if (confirm("You're about to clear all task?")) {
			while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
		}
	}
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
