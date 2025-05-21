const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const toggleThemeBtn = document.getElementById("toggleTheme");
const body = document.body;

let dragSrcEl = null;

// Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  taskInput.value = "";
});

// Create task list item element
function createTaskElement(text) {
  const li = document.createElement("li");
  li.draggable = true;
  li.classList.add("task-item");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.className = "delete";
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(delBtn);

  // Drag events
  li.addEventListener("dragstart", dragStart);
  li.addEventListener("dragover", dragOver);
  li.addEventListener("drop", drop);
  li.addEventListener("dragend", dragEnd);

  return li;
}

// Drag & Drop Handlers
function dragStart(e) {
  dragSrcEl = this;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  if (this !== dragSrcEl) {
    this.style.borderTop = "2px solid #4a90e2";
  }
}

function drop(e) {
  e.stopPropagation();
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  this.style.borderTop = "";
  return false;
}

function dragEnd() {
  this.classList.remove("dragging");
  document.querySelectorAll(".task-item").forEach((item) => {
    item.style.borderTop = "";
  });
}

// Theme toggle
toggleThemeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleThemeBtn.textContent = body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});
