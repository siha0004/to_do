const activeTasks = document.querySelector("#list_active");
const doneTasks = document.querySelector("#list_done");
const inputTask = document.querySelector("#tasklist");
const inputAmount = document.querySelector("#amount");
const button = document.querySelector("button");
const tasksArrayLS = localStorage.getItem("taskArray");

//Model
let list;
if (tasksArrayLS === null) {
  list = [];
} else {
  list = JSON.parse(tasksArrayLS);
}
// list = [
//   { description: "RandomUUId", amount: 1, done: false },
//   { description: "Event delegation", amount: 1, done: false },
//   { description: "Change done status", amount: 1, done: false },
//   { description: "Create localstorage", amount: 1, done: false },
//   { description: "Create objects", amount: 2, done: true },
//   { description: "Create HTML structure", amount: 2, done: true },
// ];

//Controlller
init();

function init() {
  button.addEventListener("click", createClick);

  updateView();
}

function addTaskToList(task) {
  list.push(task);
  updateLocalStorage();
}

function updateLocalStorage() {
  console.log("update list", list);
  localStorage.setItem("taskArray", JSON.stringify(list));
}

function updateView() {
  // Tømmer listerne
  activeTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  list.forEach((each) => {
    if (each.done === true) {
      doneTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox" checked><input type="text" name="number" id="number" placeholder=${each.amount}><p>${each.description}</p>
 <button data-type="trash" ></button></li>`;
    } else {
      activeTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"><input type="text" name="number" id="number" placeholder=${each.amount}><input type="text" name="" id="" placeholder="${each.description}" />
  <button data-type="trash" ></button></li>`;
    }
  });
  document.querySelectorAll("li").forEach((elm) => {
    elm.addEventListener("click", liClick);
  });
}

function liClick(evt) {
  const currentTarget = evt.currentTarget;
  const target = evt.target;
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
  updateLocalStorage();
  updateView();
}
//View
function createClick() {
  addTaskToList({
    id: self.crypto.randomUUID(),
    description: inputTask.value,
    amount: inputAmount.value,
    done: false,
  });
  updateView();
}

function trashClick(evt) {
  removeTaskFromList(evt.target.dataset.id);
  updateView();
}
