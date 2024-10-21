const activeTasks = document.querySelector("#list_active");
const doneTasks = document.querySelector("#list_done");
const inputTask = document.querySelector("#tasklist");
const button = document.querySelector("button");

//Model
let list;
list = [
  { description: "Agurk", amount: 1, done: false },
  { description: "Tomat", amount: 4, done: true },
  { description: "Pasta", amount: 2, done: false },
  { description: "appelsin", amount: 2, done: true },
];
// list = ["støvsug", "vask tøj", "tag opvask", "spise"];

//Controlller
init();

function init() {
  button.addEventListener("click", createClick);

  updateView();
}

function addTaskToList(task) {
  list.push(task);
}

function removeTaskFromList(id) {
  list.splice(id, 1);
}

function updateView() {
  // Tømmer listerne
  activeTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  list.forEach((each, i) => {
    if (each.done === true) {
      console.log("harry potter");
      doneTasks.innerHTML += `<li><input type="checkbox" name="done" id="done" > ${each.description}<button data-id="${i}" class="trash">slet</button></li>`;
    } else {
      console.log("ron weasley");
      activeTasks.innerHTML += `<li><input type="checkbox" name="done" id="done" > ${each.description}<button data-id="${i}" class="trash">slet</button></li>`;
      console.log(i);
    }
  });

  document.querySelectorAll(".trash").forEach((each) => {
    each.addEventListener("click", trashClick);
  });
}

function isChecked() {
  if (this.checked) {
    console.log("checked");
  }
}

//View
function createClick() {
  addTaskToList({ description: inputTask.value, amount: 1, done: false });
  updateView();
}

function trashClick(evt) {
  removeTaskFromList(evt.target.dataset.id);
  console.log(evt.target.dataset.id);
  updateView();
}
