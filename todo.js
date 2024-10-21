const task = document.querySelector("ul");
const inputTask = document.querySelector("#tasklist");
const button = document.querySelector("button");

//Model
let list;
// list = [
//   { id: 1, task: "Agurk", amount: 1, done: false },
//   { id: 2, task: "Tomat", amount: 4, done: true },
//   { id: 3, task: "Pasta", amount: 2, done: false },
// ];
list = ["støvsug", "vask tøj", "tag opvask", "spise"];

//Controlller
init();

function init() {
  button.addEventListener("click", buttonClick);
  updateView();
}

function addTaskToList(task) {
  list.push(task);
}

function updateView() {
  task.innerHTML = "";
  list.forEach((each) => {
    task.innerHTML += `<li>${each}</li>`;
  });
}

//View
function buttonClick() {
  addTaskToList(inputTask.value);
  updateView();
}
