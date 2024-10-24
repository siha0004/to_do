# Refleksion

## Opbygning

Vores tilgang til kodeprocessen har været med MVC modellen.
Vi benytter local storage til at gemme vores array.

Vores Todo liste er bygget op med to `ul` hvor der er en liste til aktive opgaver og en til færdige opgaver.
Hver opgave/objekt/`li` har en datastruktur bestående af en som indeholder et id, en description, amount og en boolean som indeholder status for done.

### Kode

#### Opsætning af et listeelement

Vi har lavet en funktion som hedder udateView(), hvor vi til en start tømmer listerne, så vi er sikker på at der ikke er noget indhold. Dette gør vi ved at sætte både `done.tasks` & `active.tasks` med et `innerHTML = ""`
Herefter kan vi bygge listerne igen, hvor vi looper igennem hver element i listen. Vi tjekker om done er true eller false, og tilføjer herefter `li`-elementerne til de respektive `ul`

Hver `li`består af nogle inputfelter med henholdsvis en checkbox, number, og text. I elementer der er done, er inputfeltet for text, erstattet med et `<p>`, da det ikke skal være muligt at ændre i en færdig task. Derudover er der en sletknap på hvert element.

```
list.forEach((each) => {
    if (each.done === true) {
        doneTasks.innerHTML +=`<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox" checked><input type="number" name="number" id="number" value=${each.amount}><span>x</span><p>${each.description}</p>
        <button data-type="trash" ></button></li>`;
    } else {
      activeTasks.innerHTML += `<li data-id="${each.id}"><input type="checkbox" name="done" id="done" class="checkbox"><input type="number" name="number" id="number" value=${each.amount}><span>x</span><input type="text" name="" id="" value="${each.description}" /><button data-type="trash" ></button></li>`;
        }
  });

```

#### Eventhandler

Vi har lavet en funktion, hvor vi ved brug af eventdelegation, lytter på om der er et click på hvert `li`-element. Derefter har vi med et if-else statement undersøgt præcist hvilket element i `li` vi har klikket på.

I denne funktion har vi fire betingelser, her vil vi gennemgå en af betingelserne:

Et af de klik der kan foregå er på et inputfelt med type=text, som vi finder ved hjælp af target.
I vores if-statement starter vi med at gemme den værdi, som description har i arrayet, som en variabel.
Hernæst giver vi inputfeltets value, den værdi som vi lige har gemt. Dette gør vi for, at man som bruger, ikke skal skrive hele teksten forfra, men blot kan lave en ændring i den eksisterende tekst.

Derefter lytter vi på, et tastaturtast på _enter_. Hvis dette event indtræffer, så skal den gemme den nye value, som brugeren har indtastet i det relevante objekt i arrayet.
Til slut kører vi `updateLocalStorage();` `updateView();`

```
const target = evt.target;
const clickedId = currentTarget.dataset.id;
const relevantObj = list.find((element) => element.id === clickedId);

if (target.type === "text") {
    const oldValue = relevantObj.description;
    target.value = oldValue;
    target.focus();
    target.addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        relevantObj.description = e.target.value;
        updateLocalStorage();
        updateView();
      }
    });
  }
```

#### Tilføj opgave

Hvis der bliver klikke på create-knappen, ender man i funktionen `createClick()`.
I denne funktion insender man data fra viewet over til vores controller som med funktionen `addTaskToList(task)` håndterer at tilføje tasken til opgaven med arraymetoden `.push`. Da man tilføjer et objekt til arrayet, bliver der rettet i modellen. Når `addTaskToList()` er kørt, kører vi funktionen `clearInput()` tømme inputfeltet for indhold, så brugeren ikke manuelt skal gøre det.

I `createClick()` funktionen kan man også se vores datastruktur.
Vi sørger for at hver opgave får et unikt ID, ved at bruge `self.crypto.randomUUID()` til at generere id'et.
Description og amount defineres ud fra hvert inputs value (som brugeren har tastet)
Done er per default false.

```
function createClick() {
  addTaskToList({
    id: self.crypto.randomUUID(),
    description: inputTask.value,
    amount: inputAmount.value,
    done: false,
  });
  clearInput();
  updateView();
}
```

```
function addTaskToList(task) {
  list.push(task);
  updateLocalStorage();
}
```

## Perspektivering

Undervejs i projektet har vi flere gange været frustreret over vores `li` som vi indsætter med `innerHTML`. I `li` er der mange HTML tags nestet i hinanden, som gør at det bliver en meget lang streng.
Vi har derfor overvejet, om det til en anden gang kunne være en god løsning at benytte sig af `<template/>` istedet.

I vores løsning har vi implementeret at man kan indsende en ny value til tasks ved hjælp af "enter". Dog er denne løsning ikke implementeret, når man skal oprette en task på ny. Hvis vi skulle arbejde videre med vores opgave, kunne vi derfor forholdsvis nemt implementere denne løsning, når man skal tilføje en ny task.
