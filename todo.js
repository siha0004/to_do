const activeTasks = document.querySelector("#list_active");
const doneTasks = document.querySelector("#list_done");
const inputTask = document.querySelector("#tasklist");
const button = document.querySelector("button");
let container;

//Model
let list;
list = [
  { description: "RandomUUId", amount: 1, done: false },
  { description: "Event delegation", amount: 1, done: false },
  { description: "Change done status", amount: 1, done: false },
  { description: "Create localstorage", amount: 1, done: false },
  { description: "Create objects", amount: 2, done: true },
  { description: "Create HTML structure", amount: 2, done: true },
];

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

function changeDoneToList(task) {
  list.push(task);
}

function updateView() {
  // Tømmer listerne
  activeTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  list.forEach((each) => {
    if (each.done === true) {
      doneTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox" checked> ${each.description} <input type="number" name="" id="">
 <button data-type="trash" >slet</button></li>`;
    } else {
      activeTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"> ${each.description} <input type="number" name="" id="">
  <button data-type="trash" >slet</button></li>`;
    }
  });
  document.querySelectorAll("li").forEach((elm) => {
    elm.addEventListener("click", liClick);
  });
}

function liClick(evt) {
  const currentTarget = evt.currentTarget;
  const target = evt.target;
  // console.log("currentTarget", currentTarget);
  // console.log("target", target);
  const clickedId = currentTarget.dataset.id;

  if (target.type === "checkbox") {
    evt.preventDefault();

    //  find taskobjektet i arrayet  ved hjælp af id
    const relevantObj = list.find((element) => element.id === clickedId);

    // gør noget ved objektet // arrayet
    relevantObj.done = !relevantObj.done;
  }
  if (target.dataset.type === "trash") {
    const arrayIndex = list.findIndex((element) => element.id === clickedId);
    list.splice(arrayIndex, 1);
  }
  updateView();
}
//View
function createClick() {
  addTaskToList({
    id: self.crypto.randomUUID(),
    description: inputTask.value,
    amount: 1,
    done: false,
  });
  updateView();
}

function trashClick(evt) {
  removeTaskFromList(evt.target.dataset.id);
  updateView();
}
