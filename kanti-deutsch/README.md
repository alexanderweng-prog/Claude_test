# Kanti-Trainer Deutsch

Übungs-App für die Deutsch-Aufnahmeprüfung: Sprache (Grammatik, Wortschatz, Zeichensetzung), Leseverstehen und **Schreiben mit KI-Korrektur**.

## Bereich «Schreiben»

- 8 eigene Schreibaufträge (Erzählung, Stellungnahme, formeller Brief, Schilderung, Bericht) mit Checkliste und Wortzähler, dazu «Eigener Text» zum Einfügen beliebiger Texte.
- Die KI (Claude von Anthropic) markiert Fehler direkt im Text, getrennt nach Rechtschreibung, Grammatik, Zeichensetzung und Ausdruck. Pro Stelle erscheint zuerst nur die Regel; die Lösung wird erst auf Wunsch aufgedeckt.
- Rückmeldung mit Stärken, Verbesserungspunkten, nächstem Schritt und 0–3 Punkten in vier Kriterien (Auftrag, Aufbau, Ausdruck, Sprachrichtigkeit). Das ist eine Einschätzung, keine Note.
- «Text überarbeiten»: verbesserte Fassung nochmals korrigieren lassen. Weniger Fehler als vorher gibt Bonus-XP.
- Schweizer Rechtschreibung (ss statt ß) ist im Prompt festgelegt.
- Texte und Entwürfe liegen nur im Browser (die letzten 12 Texte).

## KI einrichten (einmalig, ca. 10 Minuten)

**Stand:** Eingerichtet als Vercel-Projekt `kanti-deutsch` (Team Sekundarschule Halingen), Adresse https://kanti-deutsch.vercel.app/. `KLASSEN_CODE` und `LIMIT_PRO_STUNDE` (400) sind gesetzt. Produktion wurde vom Branch `claude/kanti-deutsch-ki-korrektur-iyp5dc` deployt; der Produktions-Branch des Projekts ist `naturalia-lernwelt`.

Die App ist reines HTML. Für die KI braucht es eine kleine Server-Funktion (`api/korrektur.js`), damit der API-Schlüssel nicht im Browser der Lernenden liegt. Gedacht ist Vercel (Gratis-Konto reicht):

1. Bei console.anthropic.com Guthaben laden und einen API-Schlüssel erstellen.
2. Bei vercel.com: **Add New → Project**, dieses Repository wählen, **Root Directory = `kanti-deutsch`**, Framework «Other».
3. Unter **Environment Variables** eintragen:

| Variable | Bedeutung |
|---|---|
| `ANTHROPIC_API_KEY` | Pflicht. Dein Schlüssel. |
| `KLASSEN_CODE` | Empfohlen. Code, den die Lernenden einmal in der App eingeben. Leer = alle mit der Adresse können auf deine Kosten korrigieren lassen. |
| `LIMIT_PRO_STUNDE` | Korrekturen pro IP und Stunde, Standard 40. Im Schulnetz teilen sich oft alle Geräte eine IP: dann z. B. 400. |
| `KI_MODELL` | Standard `claude-opus-5-5`. Günstiger: `claude-sonnet-5-5` oder `claude-haiku-5-5` (Qualität dann nicht geprüft). |
| `ERLAUBTE_HERKUNFT` | Nur nötig, wenn die App woanders liegt als die Funktion, z. B. `https://alexanderweng-prog.github.io` |

4. Deploy. Die App läuft dann unter `https://<projekt>.vercel.app/` mit funktionierender KI.

Soll die App weiterhin über GitHub Pages (Startportal) laufen: in `config.js` bei `kiUrl` die Adresse `https://<projekt>.vercel.app/api/korrektur` eintragen und `ERLAUBTE_HERKUNFT` setzen. Ohne Einrichtung funktioniert alles ausser der Korrektur; die App zeigt dann einen Hinweis.

## Kosten (Schätzung, nicht gemessen)

Ein Aufsatz mit 400 Wörtern: rund 2 000 Eingabe- und 2 000–4 000 Ausgabe-Tokens. Mit Claude Opus 5.5 ($4 / $20 pro Million Tokens) sind das etwa **5–9 Rappen pro Korrektur**. Die echten Kosten zeigt die Anthropic-Konsole. Tipp: dort ein monatliches Ausgabenlimit setzen.

## Grenzen

- Die KI kann Fehler übersehen oder korrekte Stellen anstreichen. Die App sagt das den Lernenden.
- Datenschutz: Schülertexte gehen an Anthropic (USA). Die App weist darauf hin, keine echten Namen zu verwenden. Vorgaben von Schule/Kanton prüfen.
- Der Klassencode ist ein einfacher Schutz, keine Anmeldung. Das Stundenlimit zählt pro Vercel-Instanz und ist deshalb nur ein Bremsklotz.
- Wird eine Fehlerstelle von der KI nicht wörtlich zitiert, erscheint sie nur in der Liste («Stelle im Text nicht gefunden»).
