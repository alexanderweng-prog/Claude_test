/* ---------- Die Welt Naturalia: jedes Kapitel ist ein Reich ----------
   id und storeKey bleiben wie in den alten Einzel-Apps. So bleibt der Fortschritt erhalten,
   und Datenbank (Supabase) und Prüf-App (pruefen.html) funktionieren unverändert. */
const REALMS = [
  { id: 'nt7-1', code: '7_1', grp: '7', page: '7_1_Naturwissenschaften_erkunden.html', storeKey: 'halingen-nt7-1-v1',
    name: 'Turm der Seher', icon: '\u{1F52D}', color: '#4f7be0', map: [28, 85],
    lore: 'Wer genau hinschaut, entdeckt die Geheimnisse der Welt.',
    tips: ['Seher vermuten zuerst und prüfen dann mit einem Experiment.'],
    ranks: ['Turmlehrling', 'Sternguckerin', 'Spurenleser', 'Experimentatorin', 'Seher', 'Hüterin des Turms'] },
  { id: 'nt7-3', code: '7_3', grp: '7', page: '7_3_Reize_und_Sinne_untersuchen.html', storeKey: 'halingen-nt7-3-v1',
    name: 'Hain der Sinne', icon: '\u{1F989}', color: '#3fae6a', map: [72, 76],
    lore: 'Im Hain der Eulen lernst du, wie Augen, Ohren und Nerven die Welt erfassen.',
    tips: ['Eulen hören fast alles. Du lernst hier, warum.'],
    ranks: ['Knospe', 'Lauscherin', 'Spähauge', 'Nervenflüsterin', 'Eulenblick', 'Hüter des Hains'] },
  { id: 'nt7-4', code: '7_4', grp: '7', page: '7_4_Bewegungen_erkunden.html', storeKey: 'halingen-nt7-4-v1',
    name: 'Pfad der Winde', icon: '\u{1F32A}️', color: '#3aa9c0', map: [30, 66],
    lore: 'Auf dem Pfad der Winde misst du, wie schnell und wie weit alles fliegt.',
    tips: ['Geschwindigkeit ist Weg durch Zeit. Auch für Drachen.'],
    ranks: ['Wanderer', 'Läuferin', 'Reiter', 'Sturmläuferin', 'Windreiter', 'Herrin der Winde'] },
  { id: 'nt7-5', code: '7_5', grp: '7', page: '7_5_Energie_erkunden.html', storeKey: 'halingen-nt7-5-v1',
    name: 'Glutschmiede', icon: '\u{1F525}', color: '#e0782f', map: [72, 57],
    lore: 'In der Glutschmiede geht keine Energie verloren. Sie wechselt nur die Gestalt.',
    tips: ['Kein Zauber erschafft Energie aus dem Nichts.'],
    ranks: ['Funkenträger', 'Glutlehrling', 'Flammenhüterin', 'Feuerbändiger', 'Schmiedemeisterin', 'Herr der Glut'] },
  { id: 'nt7-7', code: '7_7', grp: '7', page: '7_7_Chemische_Reaktionen_untersuchen.html', storeKey: 'halingen-nt7-7-v1',
    name: 'Alchemistengewölbe', icon: '⚗️', color: '#a35fd6', map: [30, 47],
    lore: 'Im Gewölbe der Alchemie werden aus Stoffen neue Stoffe.',
    tips: ['Echte Alchemie heisst heute Chemie. Und sie funktioniert wirklich.'],
    ranks: ['Kolbenputzer', 'Tränkemischerin', 'Alchemist', 'Elementkundige', 'Meisteralchemist', 'Hüterin des Steins'] },
  { id: 'nt8-1', code: '8_1', grp: '8', page: '8_1_Stromkreise_untersuchen.html', storeKey: 'halingen-nt8-1-v1',
    name: 'Blitzzitadelle', icon: '⚡', color: '#d9b021', map: [72, 37],
    lore: 'In der Zitadelle der Blitze fliesst Strom nur durch geschlossene Kreise.',
    tips: ['Ein offener Kreis ist wie eine Brücke mit Loch: Nichts kommt durch.'],
    ranks: ['Funkenfänger', 'Drahtzieherin', 'Lichtbringer', 'Schalterhüterin', 'Blitzbändiger', 'Herrin der Blitze'] },
  { id: 'nt8-5', code: '8_5', grp: '8', page: '8_5_Kraefte_Arbeit_und_Leistung_erforschen.html', storeKey: 'halingen-nt8-5-v1',
    name: 'Titanenfeste', icon: '\u{1F3F0}', color: '#c0524a', map: [30, 28],
    lore: 'In der Titanenfeste misst du Kräfte und erfährst, was Arbeit wirklich ist.',
    tips: ['Auch Titanen rechnen: Arbeit ist Kraft mal Weg.'],
    ranks: ['Knappe', 'Hebelmeisterin', 'Rampenbauer', 'Flaschenzugmeisterin', 'Burgbaumeister', 'Titanin'] },
  { id: 'leistung', code: '', grp: 'x', page: 'leistung.html', storeKey: 'halingen-leistung-lernapp-v1',
    name: 'Drachenarena', icon: '\u{1F409}', color: '#d0485e', map: [72, 18],
    lore: 'In der Drachenarena zählt, wie schnell Energie umgewandelt wird.',
    tips: ['Ein starker Drache schafft dieselbe Arbeit in kürzerer Zeit.'],
    ranks: ['Drachenei', 'Schlüpfling', 'Jungdrache', 'Feuerdrache', 'Sturmdrache', 'Urdrache'] },
  { id: 'motor', code: '', grp: 'x', page: 'motor.html', storeKey: 'halingen-motor-lernapp-v1',
    name: 'Runenminen', icon: '\u{1F9F2}', color: '#7f8ca3', map: [32, 9],
    lore: 'Tief in den Runenminen verwandeln Zwerge Strom in Bewegung und Bewegung in Strom.',
    tips: ['Zwergenregel: Ohne Magnetfeld dreht sich kein Rotor.'],
    ranks: ['Grubenlicht', 'Spulenwicklerin', 'Magnetschmied', 'Rotormeisterin', 'Dynamomeister', 'Runenkönigin'] }
];
const RANK_PW = ['erwacht', 'lernt', 'wächst', 'beherrscht', 'lehrt andere', 'ist Legende'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const REALM_GROUPS = { '7': 'Kapitel 7', '8': 'Kapitel 8', 'x': 'Vertiefungen' };
// Kapitel ohne Lern-App: erscheinen als Nebelreiche
const FOG_REALMS = [
  ['7_2', 'Den Körper analysieren'], ['7_6', 'Arbeiten im Labor'], ['8_2', 'Gewässer und Ökosysteme'], ['8_3', 'Funktionen des Körpers'],
  ['8_4', 'Chemische Reaktionen'], ['9_1', 'Optische Phänomene'], ['9_2', 'Atommodelle'], ['9_3', 'Elektronische Schaltungen'], ['9_4', 'Energie und Leistung'],
  ['9_5', 'Genetik und Gentechnik'], ['9_6', 'Evolution'], ['9_7', 'Land-Ökosysteme'], ['9_8', 'Stoffkreisläufe']
];
// Eigenes Kapitel: die Lernwerkstatt (eigene App im Repository «Container», läuft auf Vercel).
// Sie hat keine festen Quests, sondern macht aus eigenem Material neue Lernpakete. Darum kein Reich auf der Karte.
const WERKSTATT = {
  url: 'https://lernwerkstatt-pi.vercel.app',
  name: 'Werkstatt der Schriftgelehrten', icon: '\u{1FAB6}', color: '#2f6b4f',
  lore: 'Hier schreiben die Gelehrten neue Schriftrollen: Aus eigenem Material entstehen Lernpfad, Rätsel und Prüfungen.',
  teile: [
    ['\u{1F4D6}', 'Lernpfad', 'Erklärungen Schritt für Schritt, mit Verständnisfrage'],
    ['\u{1F3AF}', 'Flow-Training', 'Fragen passen sich laufend deinem Können an'],
    ['\u{1F9E9}', 'Spiele', 'Kreuzworträtsel, Memory, Lückentext, Zuordnen, Reihenfolge, Quiz'],
    ['\u{1F501}', 'Lernkartei', 'Was du falsch hattest, kommt gezielt wieder'],
    ['\u{1F4AC}', 'Denkfragen und Texte', 'Rückmeldung durch die KI'],
    ['\u{1F4CA}', 'Drei Niveaus', 'Dasselbe Thema, passend schwer']
  ]
};
// Heldenrang über alle Reiche (Summe der XP)
const HERO_RANKS = [
  { xp: 0, name: 'Wanderseele' }, { xp: 250, name: 'Abenteuerherz' }, { xp: 750, name: 'Klingenträger' },
  { xp: 1600, name: 'Hüterflamme' }, { xp: 3000, name: 'Weisenstern' }, { xp: 5000, name: 'Legende von Naturalia' }
];
