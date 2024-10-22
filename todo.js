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
// list = ["støvsug", "vask tøj", "tag opvask", "spise"];

//Controlller
init();

function init() {
  button.addEventListener("click", createClick);
  //container.addEventListener("click", handleClick);

  updateView();
}

// function handleClick(event) {
//   if (event.target) {
//   }
//   console.log(event.target);
//   console.log(event.currentTarget);
// }

function addTaskToList(task) {
  list.push(task);
}

function removeTaskFromList(id) {
  list.splice(id, 1);
}

function changeDoneToList(task) {
  list.push(task);
}

// function isChecked(event) {
//   event.preventDefault();
//   if (this.checked) {
//     console.log("checked");
//   } else {
//     console.log("not checked");
//   }
// }

function updateView() {
  // Tømmer listerne
  activeTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  list.forEach((each) => {
    if (each.done === true) {
      doneTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"> ${each.description} <input type="number" name="" id="">
 <button class="trash">slet</button></li>`;
    } else {
      activeTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"> ${each.description} <input type="number" name="" id="">
  <button class="trash">slet</button></li>`;
    }
  });
  document.querySelectorAll("li").forEach((elm) => {
    elm.addEventListener("click", liKlik);
  });
  // document.querySelectorAll(".trash").forEach((each) => {
  //   each.addEventListener("click", trashClick);
  // });

  // document.querySelectorAll(".checkbox").forEach((each) => {
  //   each.addEventListener("click", isChecked);
  // });
}
function liKlik(evt) {
  const currentTarget = evt.currentTarget;
  const target = evt.target;
  console.log("currentTarget", currentTarget);
  console.log("target", target);
  const clickedId = currentTarget.dataset.id;
  console.log(clickedId);

  if (target.type === "checkbox") {
    evt.preventDefault();
    console.log("checkbox is clicked");

    //  find taskobjektet i arrayet  ved hjælp af id
    const idPlacering = list.findIndex((element) => element.id === clickedId);
    console.log(idPlacering);
    // gør noget ved objektet // arrayet

    // update view
  }
  console.log("**************************");
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
