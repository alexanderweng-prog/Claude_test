/* Wortland – Einstellungen für die KI-Korrektur (Schreibwerkstatt)
   url: Adresse der Korrektur-Funktion.
     - Läuft Wortland bei Vercel (empfohlen): 'api/korrektur' so lassen.
     - Läuft Wortland woanders (z. B. GitHub Pages): volle Vercel-Adresse eintragen,
       z. B. 'https://wortland.vercel.app/api/korrektur'
     - Leer lassen (''), um die Schreibwerkstatt auszublenden. */
window.WORTLAND_KI = {
  url: 'api/korrektur'
};
