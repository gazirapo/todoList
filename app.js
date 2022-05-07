const form = document.getElementById("todo-form");
const section = document.getElementById("todo-list");
const filtered = document.getElementById("dropdown");

let todos = [];

const todoItem = (item) => {
  return `<div class="list-group">
  <p ${item.isDone ? "class = 'line'" : ""}>${item.title}  </p>
  <div class="list-item">
    <input onchange="changeStatus(event,'${item.id}')" ${
    item.isDone ? "checked" : ""
  }  type="checkbox"  />
    <button onclick="removeItem('${item.id}')" id="delete-btn">SİL</button>
  </div>
</div> `;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = document.getElementById("add-input").value;
  const newItem = {
    title: value,
    id: Math.random().toString(36).substring(2, 10),
    isDone: false,
  };

  todos.push(newItem);

  section.innerHTML = todos.map((item) => todoItem(item)).join("");
  document.getElementById("add-input").value = "";
});

//  remove function

function removeItem(id) {
  if (confirm("Silmek istediğine emin misin ?")) {
    todos = todos.filter((item) => id !== item.id);
    section.innerHTML = todos.map((item) => todoItem(item)).join("");
  }
}

// complated tasks

function changeStatus(event, id) {
  const findItem = todos.find((item) => id === item.id);
  if (event.target.checked) {
    findItem.isDone = true;
  } else {
    findItem.isDone = false;
  }
  section.innerHTML = todos.map((item) => todoItem(item)).join("");
}

//  filter tasks

filtered.addEventListener("change", function (e) {
  let filteredTodos = todos;

  if (e.target.value === "done") {
    filteredTodos = todos.filter((item) => item.isDone === true);
  }
  if (e.target.value === "todo") {
    filteredTodos = todos.filter((item) => item.isDone === false);
  }
  section.innerHTML = filteredTodos.map((item) => todoItem(item)).join("");
});
