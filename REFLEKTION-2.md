# Slutreflektion - Hoover Challenge (Lektion 2)

**Datum:** 2025-10-07  
**Total tid:** 5 timmar  
**Nivåer slutförda:** Nivå 4 KLAR | Nivå 5 KLAR | Nivå 6 KLAR

---

## 🎯 Vad har du lärt dig?

### **Om collision detection (Nivå 4):**
Det handlar om att avläsa x och y värden för att se ifall de är samma.

### **Om game loops och timers (Nivå 5):**
En game loop handlar om hur det innehåll i ett spel som körs om och om igen medan en timer kan t.ex. bestämma hur länge en game loop håller på.

### **Om olika item-typer och spelmekanik (Nivå 6):**
Item-typer bygger alla på samma funktionalitet såsom att de ska öka ett värde eller att deras utseende bestäms av css. Spelmekanik är inte särskillt svårt när det blir nedbrytet i så många steg. Det bygger på att flera olika saker ska fungera samtidigt för att driva spelet.

---

## 🎮 Från App till Spel

### **Vad är skillnaden mellan en app och ett spel?**
En app är ett program som hjälper användaren att utföra en specifik uppgift eller få tillgång till information och är ofta designad för att vara enkel och praktisk att använda.

Ett spel är ett program som skapas för underhållning. Det fokuserar på upplevelse och spelmekanik snarare än praktisk nytta.

### **Vilka nya koncept behövde du lära dig för att göra det till ett spel?**
- Olika states
- setInterval
---

## ✅ Vad känner du dig trygg i nu?

Kryssa för vad du känner dig bekväm med:

**Nivå 4 (Collision Detection):**

- [X] Collision detection (kolla om två objekt är på samma position)
- [X] Spawna items på random positioner (utan duplicates)
- [X] Öka score när items samlas
- [X] Win condition (alla items samlade)

**Nivå 5 (Timer och Game Loop):**

- [X] setInterval för game loops
- [X] clearInterval för att stoppa timers
- [X] Game states (ready, playing, won, lost)
- [X] Win/lose conditions baserat på tid
- [X] Starta och stoppa spel med knapp

**Nivå 6 (Power-ups och Hinder):**

- [X] Hantera flera item-typer i samma array
- [X] switch-satser för olika logik
- [X] Blockera rörelse baserat på items
- [X] Array.filter() för att räkna specifika typer
- [X] Olika emojis för olika item-typer

**Beskriv det du känner dig MEST trygg i:**
Jag tänker att collision detection har blivit mest tydligt för mig under denna uppgift. Det handlar endast om att kolla ifall två x och y värden är likadana mellan två objekt.
---

## 📊 Nivå-för-nivå utvärdering

Rangordna nivåerna (1-3, där 1 = mest värdefull):

- [1] Nivå 4: Collision Detection - **\_**
- [2] Nivå 5: Timer och Game Loop - **\_**
- [3] Nivå 6: Power-ups och Hinder - **\_**

**Vilken nivå var roligast att bygga? Varför?**
Jag tyckte Nivå 6 var mest rolig eftersom att det mest handlade om att bygga på det man hade lärt sig i de tidigare nivåerna och man fick lite frihet att lägga till saker såsom ljudeffekter.

**Vilken nivå var svårast? Varför?**
Jag tyckte nivå 4 var svårast att förstå för att jag hade stora problem med att få skräpet att hamna på rätt plats. Det var svårt för mig att förstå hur jag skulle få dem att få rätt y-värde för att när jag började arbeta med dem så fick de ett inverterat y-värde till det jag ville att de skulle ha. Detta tog en stund att reda ut men jag lyckades tillslut.
---

## 🎯 Aha-moment

**De 3 viktigaste insikterna från övningen:**

### **1.**
Collison handlar endast om kordinater.

### **2.**
Olika objekt kan ha väldigt likadana uppbyggnader.

### **3.**
Använd F12 ofta för att testa ifall ens kod fungerar.
---

## 📝 Från Hoover till Andra Spel

**Hoover hade:**

- Collision detection
- Timer/Game loop
- Items att samla
- Hinder att undvika
- Power-ups med olika effekter

**Vilket annat spel skulle du kunna bygga med samma koncept?**

**Exempel:**

- Snake: ⬜
- Pac-Man: ⬜
- Sokoban: ⬜
- Eget spel: ⬜

**Beskriv kort hur:**

Jag tänker att Snake är ett väldigt likt spel eftersom att den också handlar om att kollidera med äpplen och att inte kollidera med sin svans. Den bygger på att öka ens poäng när man kolliderar med ett äpple och att avsluta spelet när man kollderar med sin svans. Den kör dock fram av sig själv och man kan endast styra åt vilket håll den styr. Den kör alltså moveForward konstant och jag tänker att detta bygger på en intervall.
---

## 💪 Självkänsla-skala

**FÖRE övningen:**  
_"Jag kan bygga ett enkelt spel"_  
[1] - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10

**EFTER övningen:**  
_"Jag kan bygga ett enkelt spel"_  
1 - 2 - 3 - 4 - 5 - [6] - 7 - 8 - 9 - 10

**FÖRE övningen:**  
_"Jag förstår hur collision detection fungerar"_  
1 - [2] - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10

**EFTER övningen:**  
_"Jag förstår hur collision detection fungerar"_  
1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - [10]

**Vad förändrade din självkänsla mest?**
Att förstå hur enkelt collision detection egentligen var.
---

## ✅ Slutsats

**I en mening - vad är den viktigaste lärdomen från Hoover Challenge?**
Den viktigaste lärdomen är att bryta ned spelet i flera mindre steg för att skapa förståelse enklare.
---

**Färdigställd:** 2025-10-07

**Grattis! Du kan nu bygga spel med JavaScript! 🎮🎉**
