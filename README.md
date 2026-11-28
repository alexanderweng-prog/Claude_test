# Lern-Apps Halingen

`index.html` ist die Startseite. Jede App liegt unverändert in einem eigenen Ordner:

| Ordner | App | Quelle |
|---|---|---|
| `kanti-site/` | Kanti-Trainer Mathematik | dieses Repo |
| `kanti-deutsch/` | Kanti-Trainer Deutsch, mit KI-Textkorrektur (Einrichtung: `kanti-deutsch/README.md`) | Repo Kanti-Trainer_Deutsch, hier erweitert |
| `flow-trainer/` | Flow-Trainer | dieses Repo |
| `grammatik-trainer/` | Wortland – Grammatik-Abenteuer DaZ | Repo Grammatik-Trainer |
| `perfektes-lernen/` | Lern-Motor (Schüler-App unter `app/`, Lehrer-Dashboard unter `app/lehrer.html`) | Repo Perfektes_lernen |
| `mui-internet-ki/` | Internet, Bewertungen und KI (MuI, Globi) | Repo Klasse-Wartmann |
| `nut-lernlandkarte/` | NuT Lernlandkarte | Repo NuT-Gaming |
| – | Naturalia – alle Reiche | eigenes Repo [Naturalia](https://github.com/alexanderweng-prog/Naturalia), verlinkt auf https://alexanderweng-prog.github.io/Naturalia/ |
| `leistung/` | Leistung | Repo Leistungsaudio |
| `kraft-arbeit/` | Kraft und Arbeit | Repo Kraft-Arbeit |
| `braumeister/` | Braumeister · Vom Malz zum Bier | Repo Bierbrauen |
| `sexualkunde/` | Pubertät & Zyklus | Repo Sexualkunde |
| `sporttheorie/` | Sporttheorie | Repo sporttheorie |
| `ruhepol/` | Ruhepol | Repo Atementspannung |

**Mastery Mathe** (Repo Ich_lerne) liegt ebenfalls nicht hier: Die App wird bei jedem Push gebaut und unter https://alexanderweng-prog.github.io/Ich_lerne/ veröffentlicht. Die Kachel verlinkt dorthin.

Die Kachel **Kanti-Trainer Deutsch** verlinkt auf https://kanti-deutsch.vercel.app/, weil die KI-Korrektur einen Server braucht. Der Ordner `kanti-deutsch/` ist die Quelle dieses Vercel-Projekts.

Die **Lernwerkstatt** (Repo Container) liegt nicht hier, sondern läuft bei Vercel (https://lernwerkstatt-pi.vercel.app/), weil sie für die KI einen Server braucht. Die Kachel verlinkt dorthin.

`kanti-trainer/` ist eine ältere Version des Kanti-Trainers und wird nicht verlinkt.

Neue App hinzufügen: Ordner anlegen und in `index.html` eine Kachel (`<a class="card">`) kopieren.
