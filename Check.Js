(function() {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  var taskForm = document.getElementById('taskForm');
  var taskInput = document.getElementById('newTaskInput');
  var taskList = document.getElementById('taskList');

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
      var listItem = document.createElement('li');
      listItem.classList.add('task', task.completed ? 'completed' : null);

      var taskContentDiv = document.createElement('div');
      taskContentDiv.classList.add('task-content');
      taskContentDiv.textContent = task.text;

      var taskButtonsDiv = document.createElement('div');
      taskButtonsDiv.classList.add('task-buttons');

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Видалити';
      deleteButton.addEventListener('click', function() {
        deleteTask(index);
      });

      var completedButton = document.createElement('button');
      completedButton.textContent = 'Виконано';
      completedButton.addEventListener('click', function() {
        toggleCompleted(index);
      });

      taskButtonsDiv.appendChild(deleteButton);
      taskButtonsDiv.appendChild(completedButton);

      listItem.appendChild(taskContentDiv);
      listItem.appendChild(taskButtonsDiv);

      taskList.appendChild(listItem);
    });
    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  window.addTask = function() {
    var newTaskText = taskInput.value.trim();
    if (newTaskText !== '') {
      tasks.push({ text: newTaskText, completed: false });
      taskInput.value = '';
      renderTasks();
    }
  };

  window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
  };

  window.toggleCompleted = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  };

  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
  });

  renderTasks();
})();