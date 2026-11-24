# Wortland – Grammatik-Abenteuer für DaZ

Spielerischer Grammatiktrainer für Schülerinnen und Schüler mit Deutsch als Zweitsprache (Anfänger, etwa A1–A2). Aufgebaut wie Naturalia: Weltkarte mit Orten, Story, Endgegner, Challenges, Abzeichen und Spielstand zum Sichern. Die Inhalte bauen auf den Grammatik-Kategorien des Kanti-Trainers Deutsch auf, sind aber für Anfänger neu geschrieben (einfache Sprache, Bilder, Vorlesen).

## Die Geschichte

Der Wirrwarr hat im Wortland alle Wörter durcheinandergewirbelt. Lumi, die Eule, begleitet die Kinder durch zehn Orte. In jedem Ort gibt es einen Wort-Kristall. Nach Ort 5 wartet Klau, der Wortdieb, am Schluss der Wirrwarr.

| Nr. | Ort | Thema |
|---|---|---|
| 1 | Hafen der drei Tore | Artikel der/die/das, ein/eine, er/sie/es |
| 2 | Markt der Vielen | Plural |
| 3 | Dorf der Tu-Wörter | Verben im Präsens (regelmässig) |
| 4 | Felsen der Starken | sein, haben, starke Verben (fährt, isst, liest) |
| 5 | Brücke der Ordnung | Satzbau: Verb auf Platz 2, W-Fragen, Ja/Nein-Fragen |
| – | Klau, der Wortdieb | Endgegner 1 (Orte 1–5) |
| 6 | Nebelmoor | nicht / kein |
| 7 | Wald der Verwandlung | Akkusativ (den, einen) |
| 8 | Schloss der Wünsche | Modalverben und Satzklammer |
| 9 | Labyrinth der Orte | Präpositionen mit Dativ (Wo?), im/am |
| 10 | Turm der Erinnerung | Perfekt mit haben/sein |
| – | Der Wirrwarr | Endgegner 2 (alle Orte) |

## Wie sich das Niveau anpasst

- Jeder Ort hat drei Stufen: 🌱 leicht (Auswahl mit Bildern, wenig Optionen), 🌿 mittel (mehr Optionen, Sätze bauen), 🌳 schwer (selber schreiben, längere Sätze).
- Pro Ort gibt es einen Stufenwert. Richtig: +0,25, falsch: −0,35. Nach etwa 4 richtigen Antworten steigt die Stufe, nach 2–3 Fehlern sinkt sie. Mit Hinweis zählt eine richtige Antwort nur halb.
- Die Aufgaben werden einzeln erzeugt, darum passt sich die Stufe schon innerhalb einer Runde an.
- Auf Stufe 2 und 3 kommt jede vierte Aufgabe zur Wiederholung eine Stufe tiefer.
- Beim ersten Start wählen die Kinder selbst, wie gut sie Deutsch können (Start auf Stufe 1, 2 oder 3).
- Falsche Aufgaben kommen in die **Fehlerkiste** und tauchen später wieder auf, bis sie richtig gelöst sind.

## Sterne und Freischalten

- ★ 5 von 8 richtig → Wort-Kristall, der nächste Ort öffnet sich
- ★★ 6 von 8 richtig mit Aufgaben auf Stufe 2
- ★★★ 7 von 8 richtig mit Aufgaben auf Stufe 3
- Ort 6 öffnet sich erst, wenn Klau besiegt ist. Endgegner: 12 Fragen, 4 Herzen.
- **Lehrperson:** Unter Einstellungen → «Alle Orte und Endgegner öffnen» lässt sich alles direkt freischalten.

## Challenges

- **Tages-Quest:** 10 gemischte Aufgaben, einmal pro Tag, +50 XP
- **Sanduhr-Jagd:** 60 Sekunden, so viele richtig wie möglich (Rekord wird gespeichert, verändert die Stufe nicht)
- **Fehlerkiste:** alte Fehler aus allen Orten üben
- Serie 🔥 (Tage nacheinander), Ränge nach XP (Ei bis Wortdrache), 15 Abzeichen

## Schreibwerkstatt mit KI-Korrektur

Die Kinder schreiben einen kurzen Text (frei oder zu einem von zehn Schreibaufträgen, je einer pro Ort). Lumi (Claude von Anthropic) liest ihn und

- lobt etwas Konkretes,
- markiert die Fehlerstellen im Text und gibt pro Stelle einen Denkanstoss in einfachem Deutsch – **ohne Lösung**,
- ordnet jeden Fehler einem Ort in Wortland zu und schlägt die passenden Orte zum Üben vor.

Die Kinder verbessern zuerst selbst («Text selber verbessern») und lassen Lumi nochmals lesen. Die Lösung pro Stelle gibt es erst auf Knopfdruck. Wie viele Fehler gezeigt werden, hängt von der Stufe ab (Stufe 1: höchstens 6, Stufe 3: alle, höchstens 15).

- XP: erster Text +10 (fehlerfrei +20), Überarbeitung mit weniger Fehlern +5 plus 3 pro verbesserte Stelle. Höchstens 60 XP pro Tag aus der Schreibwerkstatt.
- Neue Abzeichen: Erste Feder, Verbesserer, Schreibprofi (10 Texte).
- Die letzten 10 Texte bleiben im Spielstand. Unter «Mein Lernstand» stehen Anzahl Texte und die häufigsten Fehlerthemen (auch im Text für die Lehrperson).

### Einrichten (Vercel)

Der KI-Schlüssel darf nicht im Browser stehen. Darum läuft die Korrektur über eine kleine Server-Funktion (`api/korrektur.js`). Am einfachsten läuft ganz Wortland bei Vercel:

1. Bei console.anthropic.com einen API-Schlüssel erstellen und ein Ausgabenlimit setzen.
2. Bei Vercel «Add New → Project», das Repository wählen. Liegt Wortland in einem Unterordner, als «Root Directory» `grammatik-trainer` wählen. Framework: «Other».
3. Unter Settings → Environment Variables eintragen:
   - `ANTHROPIC_API_KEY` – der Schlüssel (Pflicht)
   - `KLASSENCODE` – z. B. `7a-eule` (empfohlen; mehrere mit Komma). Ohne Code kann jede Person mit dem Link die KI auf deine Kosten benutzen.
   - `KI_MODELL` – optional, Standard `claude-opus-5-5`. Günstiger: `claude-haiku-5-5` (Korrekturen dann weniger genau).
4. Deploy. Die Kinder geben den Klassencode einmal ein (in der Schreibwerkstatt oder unter Einstellungen).

Läuft Wortland weiter auf GitHub Pages: in `js/config.js` die volle Vercel-Adresse eintragen (`https://…vercel.app/api/korrektur`) und bei Vercel `ERLAUBTE_URSPRUENGE=https://alexanderweng-prog.github.io` setzen. Mit `url: ''` verschwindet die Schreibwerkstatt ganz.

### Kosten und Datenschutz

- Ein Text von etwa 80 Wörtern braucht mit `claude-opus-5-5` grob 2 000 Eingabe- und 1 000–2 000 Ausgabe-Token, also etwa 3–5 Rappen. Mit Haiku etwa 50-mal weniger. Das sind Schätzungen; die tatsächlichen Kosten zeigt die Anthropic-Konsole.
- Die Texte gehen an Anthropic (USA). Daten über die API werden laut Anthropic nicht zum Training verwendet, aber sie verlassen die Schweiz. Klärt vor dem Einsatz mit der Schulleitung, ob das nach den Vorgaben des Kantons erlaubt ist. Die App weist die Kinder darauf hin, keine Nachnamen, Adressen oder Telefonnummern zu schreiben. Wortland schickt nur den Text, die Stufe und den Schreibauftrag, nicht den Spielernamen.
- Die KI kann sich irren (z. B. einen richtigen Satz als falsch markieren). Die App sagt das den Kindern.

## Vorlesen

Story, Regeln und Aufgaben haben einen 🔊-Knopf. Das nutzt die Sprachausgabe des Browsers (deutsche Stimme, de-CH falls vorhanden). Auf manchen Geräten fehlt eine deutsche Stimme, dann klingt es schlecht oder bleibt stumm. In den Einstellungen gibt es einen Stimmtest und «Aufgaben automatisch vorlesen».

## Spielstand

- Speichert automatisch im Browser (Schlüssel `wortland-v1`).
- Unter «Spielstand» als Datei (`wortland-<Name>-<Datum>.txt`) oder als Code sichern und auf einem anderen Gerät laden. Der Code ist komprimiert, nicht verschlüsselt.
- Unter «Mein Lernstand» sehen die Kinder pro Thema Stufe, Trefferquote, Sterne und offene Fehler. Den Text können sie kopieren und der Lehrperson schicken.

## Aufbau

- `index.html` – Startseite
- `js/data.js` – Wörter, Story, Regeln und Aufgaben-Generatoren der zehn Orte (`make(stufe)`). Neue Wörter einfach in `NOUNS`, `VREG` usw. ergänzen.
- `js/app.js` – Spiel-Engine
- `js/schreiben.js` – Schreibwerkstatt (Ansichten, Senden, Abzeichen)
- `js/config.js` – Adresse der KI-Korrektur
- `api/korrektur.js`, `package.json`, `vercel.json` – Server-Funktion für Vercel (Claude über das Anthropic-SDK)
- `style.css`, `fonts/` (Fredoka, Nunito, Cinzel; SIL Open Font License)

Kein Build-Schritt nötig. Lokal einfach `index.html` im Browser öffnen (die Schreibwerkstatt braucht den Server; lokal zeigt sie eine Fehlermeldung).

## Veröffentlichen mit GitHub Pages

Settings → Pages → Source «Deploy from a branch», Branch wählen, Ordner `/ (root)`, Save. Danach ist die App unter `https://alexanderweng-prog.github.io/Grammatik-Trainer/` erreichbar.
