// variabler for at hente dom elementer
const activeTasks = document.querySelector("#list_active");
const doneTasks = document.querySelector("#list_done");
const inputTask = document.querySelector("#tasklist");
const inputAmount = document.querySelector("#amount");
const button = document.querySelector("button");
const tasksArrayLS = localStorage.getItem("taskArray");

//MODEL
// Hvis local storage er tomt skal arrayet også være det
// Ellers skal arrayet indeholde, dataen man indsendt
let list;
if (tasksArrayLS === null) {
  list = [];
} else {
  list = JSON.parse(tasksArrayLS);
}

//CONTROLLER
init();

// lytter på klik og kører funktionen updateView()
function init() {
  button.addEventListener("click", createClick);
  updateView();
}

// tilføjer en task til list arrayet og opdatere localstorage
function addTaskToList(task) {
  list.push(task);
  updateLocalStorage();
}

// funktion for at opdatere local storage
function updateLocalStorage() {
  localStorage.setItem("taskArray", JSON.stringify(list));
}

function clearInput() {
  // sætter value til at være tom
  inputTask.value = "";
  // gør at elementet ikke er i fokus
  inputTask.blur();
  inputAmount.value = "1";
  inputAmount.blur();
}

// funktion for at generere liste elementer i både don og active UL
function updateView() {
  // Tømmer listerne
  activeTasks.innerHTML = "";
  doneTasks.innerHTML = "";

  // sammensætter liste elementer ved at loope igennem liste arrayet, og indsætte relevante værdier
  list.forEach((each) => {
    if (each.done === true) {
      doneTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox" checked><input type="number" name="number" id="number" value=${each.amount}><span>x</span><p>${each.description}</p>
 <button data-type="trash" ></button></li>`;
    } else {
      activeTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"><input type="number" name="number" id="number" value=${each.amount}><span>x</span><input type="text" name="" id="" value="${each.description}" />
  <button data-type="trash" ></button></li>`;
    }
  });
  // lytter på hvert li-element og starter funktionen liClick
  document.querySelectorAll("li").forEach((elm) => {
    elm.addEventListener("click", liClick);
  });
}

// håndtere hvad der skal ske, alt efter hvad der er klikket på inde i li-elementet
function liClick(evt) {
  const currentTarget = evt.currentTarget;
  const target = evt.target;
  // id'et på det klikkede element
  const clickedId = currentTarget.dataset.id;

  //  find taskobjektet i arrayet  ved hjælp af id
  const relevantObj = list.find((element) => element.id === clickedId);

  // hvis man har klikket på en checkbox ...
  if (target.type === "checkbox") {
    //forhindre en ændring på checkbox (ændringen skal ske pga. vores model - arrayet)
    evt.preventDefault();

    // gør noget ved objektet // arrayet
    // vi ændrer i done-status i arrayet
    relevantObj.done = !relevantObj.done;
    updateLocalStorage();
    updateView();
  }

  // hvis man har klikket på -(slet)knappen ...
  if (target.dataset.type === "trash") {
    // Denne linje fjerner et element fra `list`-arrayet ved at bruge `splice()`
    // det første argument er indekset (`arrayIndex`)
    // det andet angiver, hvor mange elementer der skal fjernes (her 1)
    list.splice(arrayIndex, 1);
    updateLocalStorage();
    updateView();
  }

  // hvis man har klikket på textfeltet  ...
  if (target.type === "text") {
    // vi gemmer den gamle værdi, ud fra den description som er i arrayet
    const oldValue = relevantObj.description;
    // skriver det i input feltet, som vores old value er (så man ikke skal skrive hele sætningen forfra)
    target.value = oldValue;
    // aktivere at man kan skrive i feltet
    target.focus();
    // lytter på et enter-tryk
    target.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        // retter objektet description i arrayet, så den bliver fastsat til en ny value
        relevantObj.description = e.target.value;
        updateLocalStorage();
        updateView();
      }
    });
  }

  // hvis man har klikket på talfeltet ...
  if (target.type === "number") {
    // vi gemmer den gamle værdi, ud fra den amount som er i arrayet
    const oldAmountValue = relevantObj.amount;
    // skriver det i input feltet, som vores old amount value er (så man ikke skal skrive hele tallet forfra)
    target.value = oldAmountValue;
    // aktivere at man kan skrive i feltet
    target.focus();
    // lytter på et enter-tryk
    target.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        // retter objektet amount i arrayet, så den bliver fastsat til en ny value
        relevantObj.amount = e.target.value;
        updateLocalStorage();
        updateView();
      }
    });
  }
}

//VIEW
// funktionen der gør at man kan gemme en ny task
function createClick() {
  // bruger funktionen til at indsætte værdier på de rigtige pladser i vores array struktur
  addTaskToList({
    id: self.crypto.randomUUID(),
    description: inputTask.value,
    amount: inputAmount.value,
    done: false,
  });
  // tømmer inputfelterne for det man har indtastet, og opdatere view'en
  clearInput();
  updateView();
}
// fjerne li-elementer ved at køre removeTaskFromList-funktionen og opdatere view'et efterfølgende
function trashClick(evt) {
  removeTaskFromList(evt.target.dataset.id);
  updateView();
}
