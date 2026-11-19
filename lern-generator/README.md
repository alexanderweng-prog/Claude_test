# Lernwerkstatt – aus Material wird eine Lern-App

Du gibst Unterrichtsmaterial hinein (Text, PDF, Foto eines Arbeitsblatts). Die KI (Claude von Anthropic) erstellt daraus ein **Lernpaket**:

1. **Lernpfad**: Erklärungen in 2–6 Schritten, mit Beispiel, Merksatz und einer Verständnisfrage pro Schritt. Wer etwas nicht versteht, kann der KI direkt eine Frage stellen.
2. **Übungen**: Die KI wählt passend zum Material 5–8 Spieltypen aus:

| Spiel | sinnvoll bei |
|---|---|
| Multiple Choice | fast immer |
| Lückentext | Fachtexte, Sprachfächer |
| Memory | viele Fachbegriffe |
| Kreuzworträtsel | Fachbegriffe aus einem Wort (wird automatisch gebaut) |
| Wahr oder falsch | Fakten, Fehlvorstellungen |
| Reihenfolge | Prozesse, Abläufe, Zeitfolgen |
| Zuordnen | Begriffe in Gruppen |
| Denkfragen | Begründen, Anwenden – die KI bewertet die Antwort (0–3 Punkte) |
| Schreiben & Korrektur | Schreibauftrag – die KI markiert Fehler und erklärt die Regel |

Die Spiele, die gar nicht zum Inhalt passen (z. B. Reihenfolge ohne Ablauf), erscheinen nicht. Unter «Bearbeiten» kannst du Spiele ein- und ausschalten und jede Frage im JSON ändern.

## Starten

- `index.html` doppelklicken. Es braucht keinen Server und keine Installation.
- Ohne Schlüssel: **Demo** (Wasserkreislauf) ansehen oder im Modus **«Ohne KI»** eine Begriffsliste (`Begriff: Erklärung`) eingeben.
- Mit KI: unter **Einstellungen** einen Claude-API-Schlüssel eintragen (console.anthropic.com → Guthaben laden → API Keys).

## Kosten (Schätzung, nicht gemessen)

| Modell | ein Lernpaket |
|---|---|
| Claude Opus 5.5 (Standard) | ca. 0.20–0.40 USD |
| Claude Sonnet 5.5 | ca. 0.10–0.20 USD |
| Claude Haiku 5.5 | unter 0.01 USD |

Eine Bewertung oder Textkorrektur kostet einen Bruchteil davon. Die echten Kosten siehst du in der Anthropic-Konsole.

## An die Klasse weitergeben

- **Teilen**: erzeugt einen Link, in dem das ganze Paket steckt (Schüleransicht ohne Bearbeiten). Funktioniert nur, wenn die App im Internet liegt, z. B. über GitHub Pages.
- **Export**: JSON-Datei; Lernende öffnen sie mit «Paket importieren».

## Wichtige Einschränkungen

- **API-Schlüssel**: Er liegt im Browser (localStorage) und ist dort auslesbar. Nur auf dem eigenen Gerät eintragen. Auf Schülergeräten ohne Schlüssel funktionieren alle Spiele; Denkfragen zeigen dann eine Musterantwort zur Selbsteinschätzung, die Textkorrektur ist deaktiviert.
- **Datenschutz**: Mit KI werden Material und Schülertexte an Anthropic (USA) gesendet. Keine Namen oder anderen Personendaten eingeben und die Vorgaben deiner Schule bzw. des Kantons prüfen.
- **Speicher**: Pakete und Fortschritt liegen nur im jeweiligen Browser. Browserdaten löschen = weg. Wichtige Pakete exportieren.
- **Word-Dateien** (.docx) werden nicht gelesen → als PDF speichern.
- Die KI kann Fehler machen. Pakete vor dem Einsatz durchsehen.

## Nächster sinnvoller Ausbau

Ein kleiner Server (z. B. Cloudflare Worker oder Vercel-Funktion), der den Schlüssel verwahrt. Dann könnten Lernende die KI-Funktionen nutzen, ohne dass der Schlüssel auf ihren Geräten liegt.

## Technik

Reines HTML/CSS/JavaScript ohne Build-Schritt. `js/anthropic-sdk-1.5.0.min.js` ist die offizielle Anthropic-SDK (`@anthropic-ai/sdk@1.5.0`), gebündelt für den Browser.

- `js/ki.js` – Prompts, JSON-Schemas (strukturierte Ausgabe), Aufrufe
- `js/spiele.js` – alle Spieltypen
- `js/offline.js` – Generator ohne KI und Demo-Paket
- `js/app.js` – Ansichten, Speicher, Teilen
