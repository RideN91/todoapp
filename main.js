let inputField = document.getElementById('inputField');
let toDoContainer = document.getElementById('toDoContainer');
let submitButton = document.getElementById('submitButton');

const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

for (i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (!savedTodos.includes(key)) {
    localStorage.removeItem(key);
  }
}

for (i = 0; i < savedTodos.length; i++) {
  const todoItem = savedTodos[i];
  const paragraph = document.createElement('p');

  paragraph.setAttribute('contentEditable', true);
  paragraph.innerText = todoItem.text;

  if (todoItem.completed) {
    paragraph.style.textDecoration = 'line-through';
  }

  toDoContainer.appendChild(paragraph);

  paragraph.addEventListener('click', function () {
    paragraph.style.textDecoration = 'line-through';
    todoItem.completed = true;
    localStorage.setItem('todos', JSON.stringify(savedTodos));
  });

  paragraph.addEventListener('dblclick', function () {
    toDoContainer.removeChild(paragraph);

    const index = savedTodos.indexOf(todoItem);
    if (index > -1) {
      savedTodos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(savedTodos));
  });
}

submitButton.addEventListener('click', function () {
  const inputText = inputField.value.trim();
  if (inputText !== '') {
    const todoItem = {
      text: inputText,
      completed: false
    };

    savedTodos.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(savedTodos));

    const paragraph = document.createElement('p');
    paragraph.innerText = inputText;
    toDoContainer.appendChild(paragraph);

    inputField.value = '';

    paragraph.addEventListener('click', function () {
      paragraph.style.textDecoration = 'line-through';
      todoItem.completed = true;
      localStorage.setItem('todos', JSON.stringify(savedTodos));
    });

    paragraph.addEventListener('dblclick', function () {
      toDoContainer.removeChild(paragraph);

      const index = savedTodos.indexOf(todoItem);
      if (index > -1) {
        savedTodos.splice(index, 1);
      }
      localStorage.setItem('todos', JSON.stringify(savedTodos));
    });
  }
});

window.addEventListener('beforeunload', function () {
  localStorage.setItem('todos', JSON.stringify(savedTodos));
});
//Time and date
function updateTime() {
  var date = new Date();

  var current_time = date.getHours().toString().padStart(2, 'O') + ':'
    + date.getMinutes().toString().padStart(2, '0') + ':'
    + date.getSeconds().toString().padStart(2, '0');

  var current_date = date.getFullYear() + '-'
    + (date.getMonth() + 1).toString().padStart(2, '0') + '-'
    + date.getDate().toString().padStart(2, '0');

  var current_time_date = current_time + ' - ' + current_date

  document.getElementById('date_time').textContent = `${current_time_date}`;
}
setInterval(updateTime, 1000);

