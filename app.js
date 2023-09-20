// C.R.U.D.
class ToDoObject {
  constructor(label = "not defined") {
    this.label = label;
    this.timestamp = new Date();
    this.id = returnRandomKey();
  }
}

// container for out todos
const toDos = [
  new ToDoObject("1"),
  new ToDoObject("2"),
  new ToDoObject("3"),
  new ToDoObject("4"),
];

function returnRandomKey() {
  const randomValues = new Uint8Array(20);

  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, (byte) => byte.toString(16)).join("");
}

// generate HTML from a todo Object
const generateToDoHTML = (todo = new ToDoObject()) => {
  const delButtonContents = `<svg
          class="del-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
        
        <span class="sr-only">Delete ToDo</span>
        `;

  const delButton = document.createElement("button");
  const footer = document.createElement("footer");
  const header = document.createElement("header");
  const article = document.createElement("article");
  const card = document.createElement("li");

  card.classList.add("todo-card");
  card.title = `Date added: ${todo.timestamp}`;

  header.textContent = todo.label;

  delButton.classList.add("del-btn");
  delButton.title = "delete todo";
  delButton.ariaLabel = "delete todo";
  delButton.innerHTML = delButtonContents;

  footer.appendChild(delButton);
  article.appendChild(header);
  article.appendChild(footer);
  card.appendChild(article);

  return card;
};

console.log(generateToDoHTML());

const renderTodos = () => {
  toDos.forEach((todo) => {
    document.querySelector("#ToDos").appendChild(generateToDoHTML(toDos));
  });
};

// Create a todo
const createTodo = (e) => {
  e.preventDefault();

  const { taskInput } = e.target.children;
  if (taskInput.value.trim()) {
    const toDoObj = new ToDoObject(taskInput.value.trim());
  }
};
// Read a todo
const readTodo = () => {};
const readTodos = () => {};

// Update a todo
const updateTodo = (todo = new ToDoObject()) => {};

// Delete a todo
const deleteTodo = (todo = new ToDoObject()) => {};

document.querySelector("#addToDoButton").addEventListener("click", () => {
  document.querySelector("#ToDos").appendChild(generateToDoHTML());
  // document.body.appendChild(generateToDoHTML());
});

const form = document.querySelector("#addToDoForm");
form.addEventListener("submit", createTodo);
renderTodos();
