const KEY = "tasknest.tasks";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");

function load() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(value) ? value.filter((item) => item && item.id && typeof item.text === "string") : [];
  } catch {
    return [];
  }
}

let tasks = load();

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = task.done ? "done" : "";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(task.done);
    checkbox.dataset.id = task.id;
    const text = document.createElement("span");
    text.textContent = task.text;
    label.append(checkbox, text);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.dataset.remove = task.id;
    remove.setAttribute("aria-label", "Remove " + task.text);

    item.append(label, remove);
    list.append(item);
  });
  count.textContent = String(tasks.filter((task) => !task.done).length);
  emptyState.hidden = tasks.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: crypto.randomUUID?.() || String(Date.now()) + Math.random(), text, done: false });
  save();
  render();
  form.reset();
  input.focus();
});

list.addEventListener("change", (event) => {
  const task = tasks.find((item) => item.id === event.target.dataset.id);
  if (!task) return;
  task.done = event.target.checked;
  save();
  render();
});

list.addEventListener("click", (event) => {
  const id = event.target.dataset.remove;
  if (!id) return;
  tasks = tasks.filter((item) => item.id !== id);
  save();
  render();
});

render();
