import returnRandomKey from "./lib/uid.js";

// C.R.U.D.

// container for out tasks
let tasks = [];

// a type of task object
class TaskObject {
  constructor(label = "not defined") {
    this.label = label;
    this.timestamp = new Date().toLocaleDateString();
    this.id = returnRandomKey();
    this.color = `--bg-color: hsl(${Math.round(
      Math.random() * 359
    )}, 100%, 75%)`;
  }
}

// generate HTML from a task Object
const generatetaskHTML = (task = new TaskObject()) => {
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
        
        <span class="sr-only">Delete task</span>
        `;

  const card = document.createElement("li");
  const article = document.createElement("article");
  const header = document.createElement("header");
  const label = document.createElement("h3");
  const uid = document.createElement("p");
  const footer = document.createElement("footer");
  const delButton = document.createElement("button");

  card.classList.add("task-card");
  card.title = `Date added: ${task.timestamp}`;
  card.style = task.color;

  label.textContent = task.label;
  uid.classList.add("task-id");
  uid.textContent = task.id;

  header.appendChild(label);
  header.appendChild(uid);

  delButton.classList.add("del-btn");
  delButton.title = "delete task";
  delButton.ariaLabel = "delete task";
  delButton.innerHTML = delButtonContents;
  delButton.addEventListener("click", () => {
    return deletetask(task);
  });

  footer.appendChild(delButton);
  article.appendChild(header);
  article.appendChild(footer);
  card.appendChild(article);

  return card;
};

console.log(generatetaskHTML());

// Create a task
const createTask = (e) => {
  e.preventDefault();

  const { taskInput } = e.target.children;
  if (taskInput.value.trim()) {
    const taskObj = new TaskObject(taskInput.value.trim());
    tasks.push(taskObj);
    renderTasks();
  }
};

// Read tasks
const renderTasks = () => {
  const tasksElement = document.querySelector("#Tasks");
  tasksElement.innerHTML = null;
  tasks.forEach((task) => {
    tasksElement.appendChild(generatetaskHTML(task));
  });
  console.log(tasks);
};

// Update a task

const updatetask = (task = new TaskObject()) => {};

// Delete a task
const deletetask = (task = new TaskObject()) => {
  tasks = [...tasks.filter((t) => t.id !== task.id)];
  renderTasks();
};

document.querySelector("#addTaskButton").addEventListener("click", () => {});

// create a task when the form is submitted
const form = document.querySelector("#addTaskForm");
form.addEventListener("submit", createTask);

// render tasks when the page loads
window.addEventListener("load", renderTasks);
