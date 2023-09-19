// live todo array that we read for the current list of todos
let todos = [];

const addToDoForm = document.querySelector("#addToDoForm");

// when the page loads
window.addEventListener("load", () => {
  //   check to see if the user has any todos from a previous session
  const savedToDos = JSON.parse(localStorage.getItem("todos"));
  if (savedToDos?.length) {
    // if the user has todos set todos to the saved ones
    todos = savedToDos;
  } else {
    // if they haven't... create a new save
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  renderToDos();
});

// Add the todos to the site
const renderToDos = () => {
  const toDosListElement = document.querySelector("#ToDos");

  toDosListElement.innerHTML = null;
  if (todos.length) {
    todos.forEach((todo, i) => {
      const toDoItem = document.createElement("li");

      toDoItem.textContent = `${todo.label} - ${new Date(
        todo.timestamp
      ).toISOString()}`;

      toDosListElement.appendChild(toDoItem);
    });
  } else {
    const toDoItem = document.createElement("li");
    toDoItem.textContent = "Please add todos above";
    toDosListElement.appendChild(toDoItem);
  }

  console.log(`To Dos Rendered`, todos);
};

// add todos to the array when the form is submitted
addToDoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { taskInput } = e.target.children;
  if (taskInput.value.trim()) {
    todos.push({
      label: taskInput.value.trim(),
      timestamp: new Date(),
    });
    // update localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    renderToDos();
  }
});
