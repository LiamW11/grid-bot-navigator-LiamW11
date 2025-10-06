# Slutreflektion - Grid-Bot Navigator

**Datum:** 2025-10-06  
**Total tid:** 4 Timmar  
**Nivåer slutförda:** Nivå 1 KLAR | Nivå 2 KLAR | Nivå 3 KLAR

---

## 🎯 Vad har du lärt dig?

### **Om state management:**
Det handlar om hur ett objekt är i stunden, exempelvis åt vilket håll det är vridet och det är någonting som går att förändra.

### **Om separation av logik och UI:**
Logik är hur någonting fungerar, till exempel hur en lampas sätts på eller stängs av medan UI kan vara hur den logiken visas genom att lampan ändrar färg.

### **Om asynkron programmering:**
Det handlar om att man väntar in ett svar innan man fortsätter med koden.

---

## 🧠 Hjärna vs. Kropp

### **Förklara konceptet "UI är en spegel av state" med egna ord:**
UI kan användas för att visa vilken state ett objekt har. T.ex. kan UI visas att ett objekt kollar åt höger då den har staten "RIGHT".

### **Konkret exempel:**

Beskriv ett tillfälle under övningen där du insåg vikten av att hålla state och UI separata:
När roboten vred på sig insåg jag hur vikitgt det är att hålla state och UI separerade för att inte bli förvirrad.

---

## ✅ Vad känner du dig trygg i nu?

Kryssa för vad du känner dig bekväm med:

**JavaScript/Logik:**

- [X] Skapa objekt med egenskaper (state)
- [X] Skapa metoder i objekt (actions)
- [X] Använda `this` korrekt
- [X] If/else eller switch-satser för logik
- [X] Manipulera objekts egenskaper

**DOM-manipulation:**

- [X] querySelector / getElementById
- [ ] createElement och appendChild
- [ ] Ändra CSS-klasser dynamiskt
- [ ] CSS Grid för positionering
- [X] CSS transform (rotation)
- [X] Event listeners

**Async/Await (Nivå 3):**

- [X] Använda fetch för att hämta JSON
- [X] async/await syntax
- [X] Hantera errors med try/catch
- [X] Arbeta med loopar och await

**Process:**

- [X] Testa logik isolerat (utan UI först)
- [X] Använda console.log för debugging
- [X] Läsa och förstå felmeddelanden
- [X] Bryta ner problem i mindre steg
- [X] Strukturera kod i funktioner

**Beskriv det du känner dig MEST trygg i:**
Det jag känner mig mest trygg med utav allt detta är att skapa objekt med egenskaper då denna uppgift gav mycket insikt om hur det fungerar och hur man ändrar egenskaperna hoss ett objekt med t.ex. js.

---

## 📊 Nivå-för-nivå utvärdering

Rangordna nivåerna (1-3, där 1 = mest värdefull):

- [2] Nivå 1: Kärnlogiken (ren JavaScript)
- [1] Nivå 2: Visualisering (koppla till UI)
- [3] Nivå 3: API-fjärrstyrning (async/await)

#### Vilken nivå gav mest aha-upplevelse? Varför?
Nivå 2 gav mest aha-upplevlese för att man kunde se hur logiken fungerade med hjälp av UI.

#### Vilken nivå var svårast? Varför?
Nivå 2 var svårast då jag hade problem med att få min robot att faktiskt flytta på sig. Position uppdaterades rent logiskt men UI ville inte följa med. Jag kunde dock lösa detta.

## 🎯 Aha-moment

**De 3 viktigaste insikterna från övningen:**

### **1.**
Viktigt att förstå logiken innan man börjar arbeta med det.

### **2.**
Viktigt att skilja på UI och logikgen för att inte krånga till saker.

### **3.**
UI kan vara bra för att visa hur logiken fungerar och förändras

---

## 📝 Från Robot till Riktiga Appar

**Roboten hade:**

- State: `x`, `y`, `direction`
- Actions: `moveForward()`, `turnRight()`, `turnLeft()`
- UI: Visuellt rutnät som speglar state

**En Todo-app har:**

- State: `Title`, `Content` (grundläggande)
- Actions: `readNote()`, `createNote()`, `updateNote()`, `deleteNote()`, `search()`
- UI: Mobillikanande låda med en list av alla anteckningar och en skapa- samt sökknapp

**Kan du se mönstret?**
Ja
---

## 💪 Självkänsla-skala

**FÖRE övningen:**  
_"Jag förstår separation mellan logik och UI"_  
[1] - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10

**EFTER övningen:**  
_"Jag förstår separation mellan logik och UI"_  
1 - 2 - 3 - 4 - 5 - 6 - 7 - [8] - 9 - 10

**FÖRE övningen:**  
_"Jag kan strukturera JavaScript-kod logiskt"_  
[1] - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10

**EFTER övningen:**  
_"Jag kan strukturera JavaScript-kod logiskt"_  
1 - 2 - 3 - 4 - 5 - 6 - 7 - [8] - 9 - 10

**Vad förändrade din självkänsla mest?**
Tydliga exempel i uppgiften som gjorde det lätt att förstå.
---

## ✅ Slutsats

**I en mening - vad är den viktigaste lärdomen från Grid-Bot Navigator?**
Att separera på Logik och UI
---

**Färdigställd:** 2025-10-06

**Bra jobbat! Du behärskar nu grunderna i state management! 🎉**
