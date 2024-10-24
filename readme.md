Vi har lavet en funktion som hedder udateView(), hvor vi til en start tømmer listerne, så vi er sikker på at der ikke er noget indhold. Dette gør vi ved at sætte både `done.tasks` & `active.tasks` med et `innerHTML = ""`

````list.forEach((each) => {
    if (each.done === true) {
      doneTasks.innerHTML +=`<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox" checked><input type="number" name="number" id="number" value=${each.amount}><span>x</span><p>${each.description}</p>
 <button data-type="trash" ></button></li>`;
    } else {
      activeTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"><input type="number" name="number" id="number" value=${each.amount}><span>x</span><input type="text" name="" id="" value="${each.description}" />
<button data-type="trash" ></button></li>`;
    }
  });```
````
