/* =====================================================================
   Wortland – Schreibwerkstatt mit KI-Korrektur
   Die Kinder schreiben einen kurzen Text. Lumi (die KI) markiert Fehler,
   gibt einen Denkanstoss und ordnet jeden Fehler einem Ort in Wortland zu.
   Die Kinder verbessern zuerst selbst, die Lösung gibt es erst auf Knopfdruck.
   Wird vor app.js geladen; benutzt S, ui, render, go usw. erst beim Aufruf.
   ===================================================================== */
'use strict';

const W_MAX = 1200, W_KEEP = 10, W_XP_DAY = 60;
const W_TASKS = [
  { id: 'frei', icon: '🪶', title: 'Freies Schreiben', task: 'Schreibe über etwas, das dich interessiert.', words: '' },
  { id: 'artikel', icon: '⚓', title: 'Mein Zimmer', task: 'Was gibt es in deinem Zimmer? Schreibe 4 bis 6 Sätze.', words: 'Das Bett ist … · Der Tisch steht … · Die Lampe ist …' },
  { id: 'plural', icon: '🧺', title: 'Auf dem Markt', task: 'Du kaufst auf dem Markt ein. Was kaufst du? Schreibe mit Mehrzahl.', words: 'Ich kaufe drei Äpfel. · zwei Tomaten · vier Brote' },
  { id: 'verben', icon: '🏘️', title: 'Mein Morgen', task: 'Was machst du am Morgen vor der Schule? Schreibe 5 Sätze.', words: 'Ich stehe … auf. · Ich trinke … · Dann gehe ich …' },
  { id: 'stark', icon: '⛰️', title: 'Meine Familie', task: 'Wer ist in deiner Familie? Was hat er oder sie gern? Was isst sie gern?', words: 'Mein Bruder ist … · Er hat … · Meine Mutter isst gern …' },
  { id: 'satzbau', icon: '🌉', title: 'Mein Wochenende', task: 'Was machst du am Wochenende? Beginne Sätze mit «Am Samstag» oder «Dann». Schreibe am Schluss eine Frage.', words: 'Am Samstag spiele ich … · Dann … · Was machst du …?' },
  { id: 'nein', icon: '🌫️', title: 'Das mag ich nicht', task: 'Was magst du nicht? Was hast du nicht? Benutze «nicht» und «kein».', words: 'Ich mag keinen … · Ich habe keine … · Ich esse nicht gern …' },
  { id: 'akk', icon: '🌲', title: 'Mein Geburtstag', task: 'Was wünschst du dir zum Geburtstag? Wen lädst du ein?', words: 'Ich wünsche mir einen … · Ich lade meinen Freund … ein.' },
  { id: 'modal', icon: '🏰', title: 'Meine Ferien', task: 'Was willst du in den Ferien machen? Was kannst du, was musst du?', words: 'Ich will … · Ich kann … schwimmen. · Ich muss …' },
  { id: 'orte', icon: '🧭', title: 'Mein Schulhaus', task: 'Wo ist was in deinem Schulhaus oder in deiner Stadt?', words: 'Die Bibliothek ist im … · Ich esse in der … · am Bahnhof' },
  { id: 'perfekt', icon: '🕰️', title: 'Gestern', task: 'Was hast du gestern gemacht? Schreibe im Perfekt.', words: 'Ich habe … gespielt. · Ich bin … gegangen. · Wir haben … gegessen.' }
];
const W_TOPIC_EXTRA = { rechtschreibung: { icon: '✏️', topic: 'Rechtschreibung' }, andere: { icon: '❓', topic: 'Anderes' } };

/* ---------- Zustand ---------- */
function wState() {
  if (!S.write || typeof S.write !== 'object') S.write = {};
  const w = S.write;
  w.n = w.n || 0; w.revised = w.revised || 0; w.clean = w.clean || 0; w.texts = w.texts || []; w.topics = w.topics || {};
  w.day = w.day || -1; w.xpDay = w.xpDay || 0; w.code = w.code || '';
  return w;
}
const kiUrl = () => (window.WORTLAND_KI && window.WORTLAND_KI.url) || '';
const hasKI = () => !!kiUrl();
const wTask = id => W_TASKS.find(t => t.id === id) || W_TASKS[0];
function wTopicInfo(t) {
  const r = REALMS.find(x => x.id === t);
  return r ? { icon: r.icon, topic: r.topic, realm: r } : (W_TOPIC_EXTRA[t] || W_TOPIC_EXTRA.andere);
}
function wLevel() {
  // Stufe für die Korrektur: Mittelwert der gespielten Orte, sonst Startstufe
  const played = REALMS.map(r => S.realms[r.id]).filter(r => r && r.n);
  if (!played.length) return S.start || 1;
  return Math.max(1, Math.min(3, Math.round(played.reduce((a, r) => a + lvlOf(r.s), 0) / played.length)));
}

/* ---------- Ansichten ---------- */
function viewWrite() {
  const W = ui.w || (ui.w = { task: null, text: '', prev: null });
  if (!W.task) return viewWriteTasks();
  const t = wTask(W.task), w = wState();
  const len = W.text.length;
  return `${topbar('✍️ Schreibwerkstatt', 'writeback')}
  <main class="wrap">
    <section class="card"><span class="tag">${t.icon} ${esc(t.title)}${W.prev ? ' · Überarbeitung' : ''}</span>
      <p class="lead">${esc(t.task)} ${say('wt', t.task)}</p>
      ${t.words ? `<p class="small wwords">💬 ${esc(t.words)}</p>` : ''}
      ${W.prev ? `<p class="small">Verbessere die markierten Stellen. Dann lässt du Lumi nochmals lesen.</p>` : ''}
      <textarea id="wText" class="field wtext" rows="8" maxlength="${W_MAX}" spellcheck="false" autocapitalize="sentences" placeholder="Schreibe hier deinen Text …">${esc(W.text)}</textarea>
      <div class="wrow"><div class="umlaut">${['ä', 'ö', 'ü', 'Ä', 'Ö', 'Ü'].map(c => `<button class="key" data-act="wuml" data-c="${c}">${c}</button>`).join('')}</div><span class="small mono" id="wCount">${len} / ${W_MAX}</span></div>
      ${W.needCode ? `<div class="wcode"><label for="wCode"><b>Klassencode</b> <span class="small">(bekommst du von deiner Lehrperson)</span></label><input id="wCode" class="field" autocomplete="off" value="${esc(w.code)}"></div>` : ''}
      <p class="err" id="wErr" aria-live="polite">${esc(W.err || '')}</p>
      <button class="btn primary big block" data-act="wsend" ${W.busy ? 'disabled' : ''}>${W.busy ? '<span class="spin" aria-hidden="true"></span> Lumi liest deinen Text …' : '🦉 Lumi soll meinen Text lesen'}</button>
    </section>
    <p class="small center">🔒 Schreibe keine Nachnamen, Adressen oder Telefonnummern. Dein Text wird zur Korrektur an eine KI geschickt.</p>
  </main>`;
}
function viewWriteTasks() {
  const w = wState();
  const recent = w.texts.slice().reverse();
  return `${topbar('✍️ Schreibwerkstatt', 'map')}
  <main class="wrap">
    ${lumi('Schreib einen kurzen Text. Ich lese ihn und zeige dir, wo du noch etwas verbessern kannst. Zuerst versuchst du es selbst!', 'wl')}
    <h2 class="h">Wähle einen Schreibauftrag</h2>
    <div class="grid2">${W_TASKS.map(t => `<button class="card act" data-act="wtask" data-id="${t.id}"><span class="ai">${t.icon}</span><b>${esc(t.title)}</b><small>${esc(t.task)}</small></button>`).join('')}</div>
    ${recent.length ? `<h2 class="h">Meine Texte</h2><div class="wlist">${recent.map((x, i) => `<button class="card act wold" data-act="wopen" data-i="${w.texts.length - 1 - i}"><b>${wTask(x.task).icon} ${esc(wTask(x.task).title)}</b><small>${new Date(x.at).toLocaleDateString('de-CH')} · ${x.res.fehler.length ? x.res.fehler.length + ' Stellen markiert' : 'fehlerfrei ✔'}${x.rev ? ' · überarbeitet' : ''}</small></button>`).join('')}</div>` : ''}
  </main>`;
}

/* Text mit markierten Fehlern: jede Stelle bekommt eine Nummer */
function wMarked(text, fehler) {
  const spans = [];
  let from = 0;
  fehler.forEach((f, i) => {
    let p = text.indexOf(f.original, from);
    if (p < 0) p = text.indexOf(f.original);
    if (p < 0 || spans.some(s => p < s.e && p + f.original.length > s.s)) { f.miss = true; return; }
    spans.push({ s: p, e: p + f.original.length, i });
    from = p + f.original.length;
  });
  spans.sort((a, b) => a.s - b.s);
  let h = '', pos = 0;
  spans.forEach(s => {
    h += esc(text.slice(pos, s.s)) + `<mark class="wm${ui.wr.open[s.i] ? ' fixed' : ''}" data-act="wjump" data-i="${s.i}">${esc(text.slice(s.s, s.e))}<sup>${s.i + 1}</sup></mark>`;
    pos = s.e;
  });
  return (h + esc(text.slice(pos))).replace(/\n/g, '<br>');
}
function viewWriteRes() {
  const x = ui.wr, r = x.res, t = wTask(x.task);
  const n = r.fehler.length;
  const head = n === 0
    ? `<div class="sumhead"><span class="big">🏆</span><h1>Kein Fehler gefunden!</h1></div>`
    : `<div class="sumhead"><span class="big">${n <= 2 ? '🎉' : '🔍'}</span><h1>${n} ${n === 1 ? 'Stelle' : 'Stellen'} zum Verbessern</h1>${x.before != null ? `<p>${x.before > n ? `Vorher ${x.before}, jetzt ${n}. Du hast dich verbessert!` : `Vorher ${x.before}, jetzt ${n}.`}</p>` : ''}</div>`;
  const marked = wMarked(x.text, r.fehler);
  const list = r.fehler.map((f, i) => {
    const ti = wTopicInfo(f.thema), open = !!x.open[i];
    return `<li id="wf${i}" class="wf${open ? ' open' : ''}"><span class="wn">${i + 1}</span><div>
      <p><s>${esc(f.original)}</s>${open ? ` → <b class="ok">${esc(f.korrektur)}</b>` : ''}${f.miss ? ' <span class="small">(im Text nicht gefunden)</span>' : ''}</p>
      <p class="small">💡 ${esc(f.erklaerung)} ${say('we' + i, f.erklaerung)}</p>
      <p class="wfoot"><span class="tag">${ti.icon} ${esc(ti.topic)}</span>${open ? '' : `<button class="linkbtn" data-act="wshow" data-i="${i}">Lösung zeigen</button>`}</p>
    </div></li>`;
  }).join('');
  // welche Orte üben?
  const cnt = {}; r.fehler.forEach(f => { if (REALMS.some(q => q.id === f.thema)) cnt[f.thema] = (cnt[f.thema] || 0) + 1; });
  const train = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).slice(0, 2).map(id => REALMS.find(q => q.id === id));
  const allOpen = r.fehler.every((f, i) => x.open[i]);
  return `${topbar('✍️ Lumi hat gelesen', 'writelist')}
  <main class="wrap">
    ${head}
    ${x.xp ? `<p class="center xpgain mono">+${x.xp} XP</p>` : ''}
    ${(x.badges || []).map(id => BADGES.find(b => b.id === id)).map(b => `<div class="newbadge">${b.icon} Neues Abzeichen: <b>${b.name}</b><small>${b.how}</small></div>`).join('')}
    ${lumi(esc(r.lob), 'wlob')}
    <section class="card"><span class="tag">${t.icon} ${esc(t.title)}</span><div class="wtextout">${marked}</div></section>
    ${n ? `<section class="card"><h2>Was ist falsch?</h2><p class="small">Überlege zuerst selbst. Tippe erst dann auf «Lösung zeigen».</p><ol class="wfl">${list}</ol></section>` : ''}
    ${n ? `<button class="btn primary big block" data-act="wrevise">✏️ Text selber verbessern</button>` : ''}
    ${n && allOpen ? `<details class="card"><summary><b>Ganzer verbesserter Text</b></summary><p class="wtextout">${esc(r.korrigierter_text).replace(/\n/g, '<br>')}</p></details>` : ''}
    ${r.tipp ? `<section class="card"><h2>Tipp für den nächsten Text</h2><p>${esc(r.tipp)} ${say('wtipp', r.tipp)}</p></section>` : ''}
    ${train.length ? `<section class="card"><h2>Das kannst du in Wortland üben</h2>${train.map(q => `<button class="btn block" data-act="realm" data-id="${q.id}">${q.icon} ${esc(q.name)} <small>${esc(q.topic)}</small></button>`).join('')}</section>` : ''}
    <button class="btn block" data-act="writelist">Neuer Text</button>
    <p class="small center">Lumi ist eine KI und kann sich auch irren. Wenn dir etwas komisch vorkommt, frag deine Lehrperson.</p>
  </main>`;
}

/* ---------- Senden ---------- */
async function wSend() {
  const W = ui.w, w = wState();
  const ta = document.getElementById('wText'); if (ta) W.text = ta.value;
  const ci = document.getElementById('wCode'); if (ci) { w.code = ci.value.trim(); save(); }
  const text = W.text.trim();
  if (text.length < 10) { W.err = 'Schreibe zuerst etwas mehr.'; render(); return; }
  W.busy = true; W.err = ''; render();
  let data, status = 0;
  try {
    const resp = await fetch(kiUrl(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, stufe: wLevel(), auftrag: wTask(W.task).id === 'frei' ? '' : wTask(W.task).task, code: w.code }) });
    status = resp.status;
    data = await resp.json().catch(() => null);
  } catch (e) { data = null; }
  W.busy = false;
  if (!data || status !== 200 || !Array.isArray(data.fehler)) {
    if (status === 401) { W.needCode = true; W.err = w.code ? 'Der Klassencode stimmt nicht.' : 'Gib zuerst den Klassencode ein.'; }
    else W.err = (data && data.fehler && typeof data.fehler === 'string') ? data.fehler : 'Lumi ist gerade nicht erreichbar. Prüfe das Internet und versuche es nochmals.';
    if (ui.view === 'write') render();
    return;
  }
  wDone(text, data);
}
function wDone(text, res) {
  const W = ui.w, w = wState();
  const d = dayIdx(); if (w.day !== d) { w.day = d; w.xpDay = 0; }
  const n = res.fehler.length, before = W.prev ? W.prev.n : null;
  let xp = before == null ? 10 + (n === 0 ? 10 : 0) : (n < before ? 5 + 3 * (before - n) : 0);
  xp = Math.max(0, Math.min(xp, W_XP_DAY - w.xpDay));
  w.xpDay += xp; S.xp += xp;
  if (before == null) { w.n++; res.fehler.forEach(f => { w.topics[f.thema] = (w.topics[f.thema] || 0) + 1; }); }
  else if (n < before) w.revised++;
  if (n === 0) w.clean++;
  const entry = { at: Date.now(), task: W.task, text, res, rev: before != null };
  if (before != null && W.prev.idx != null && w.texts[W.prev.idx]) w.texts[W.prev.idx] = entry; else w.texts.push(entry);
  while (w.texts.length > W_KEEP) w.texts.shift();
  touchStreak();
  ui.newBadges = []; checkBadges();
  save();
  ui.wr = { task: W.task, text, res, open: {}, before, xp, badges: ui.newBadges.slice(), idx: w.texts.indexOf(entry) };
  ui.w = { task: null, text: '' };
  go('writeres');
}

/* ---------- Abzeichen (werden in app.js ergänzt) ---------- */
const W_BADGES = [
  { id: 'feder', icon: '🪶', name: 'Erste Feder', how: 'Den ersten Text von Lumi lesen lassen.' },
  { id: 'verbessert', icon: '🛠️', name: 'Verbesserer', how: 'Einen Text überarbeitet und Fehler verbessert.' },
  { id: 'schreibprofi', icon: '📜', name: 'Schreibprofi', how: '10 Texte geschrieben.' }
];
function wCheckBadges() {
  const w = S.write; if (!w) return;
  if (w.n >= 1) award('feder');
  if (w.revised >= 1) award('verbessert');
  if (w.n >= 10) award('schreibprofi');
}
function wStatsLines() {
  const w = wState(); if (!w.n) return [];
  const top = Object.keys(w.topics).sort((a, b) => w.topics[b] - w.topics[a]).slice(0, 3).map(t => `${wTopicInfo(t).topic} (${w.topics[t]})`);
  return ['', `Schreibwerkstatt: ${w.n} Texte, ${w.revised} überarbeitet, ${w.clean} fehlerfrei.`, top.length ? `Häufigste Fehler: ${top.join(', ')}` : ''];
}
function wStatsCard() {
  const w = wState(); if (!w.n) return '';
  const rows = Object.keys(w.topics).sort((a, b) => w.topics[b] - w.topics[a]).map(t => { const ti = wTopicInfo(t); return `<tr><td>${ti.icon} ${esc(ti.topic)}</td><td class="mono">${w.topics[t]}</td></tr>`; }).join('');
  return `<section class="card"><h2>✍️ Schreibwerkstatt</h2><p>${w.n} Texte geschrieben · ${w.revised} überarbeitet · ${w.clean} fehlerfrei</p>
    ${rows ? `<div class="tablewrap"><table class="stats"><thead><tr><th>Fehler bei</th><th>Anzahl</th></tr></thead><tbody>${rows}</tbody></table></div>` : ''}</section>`;
}

/* ---------- Aktionen ---------- */
function writeAct(a, b) {
  const W = ui.w || (ui.w = { task: null, text: '' });
  switch (a) {
    case 'write': ui.w = { task: null, text: '' }; wProbe(); go('write'); return true;
    case 'writelist': ui.w = { task: null, text: '' }; go('write'); return true;
    case 'writeback': ui.w = { task: null, text: '' }; go('write'); return true;
    case 'wtask': ui.w = { task: b.dataset.id, text: '', needCode: !!(ui.kiInfo && ui.kiInfo.codeNoetig && !wState().code) }; go('write'); return true;
    case 'wuml': { const el = document.getElementById('wText'); if (el) { const p = el.selectionStart ?? el.value.length; el.value = el.value.slice(0, p) + b.dataset.c + el.value.slice(el.selectionEnd ?? p); el.focus(); el.selectionStart = el.selectionEnd = p + 1; W.text = el.value; wCount(); } return true; }
    case 'wsend': wSend(); return true;
    case 'wshow': ui.wr.open[+b.dataset.i] = true; render(); { const li = document.getElementById('wf' + b.dataset.i); if (li) li.scrollIntoView({ block: 'nearest' }); } return true;
    case 'wjump': { const li = document.getElementById('wf' + b.dataset.i); if (li) { li.scrollIntoView({ behavior: 'smooth', block: 'center' }); li.classList.add('flashli'); setTimeout(() => li.classList.remove('flashli'), 900); } return true; }
    case 'wrevise': ui.w = { task: ui.wr.task, text: ui.wr.text, prev: { n: ui.wr.res.fehler.length, idx: ui.wr.idx } }; go('write'); return true;
    case 'wopen': { const x = wState().texts[+b.dataset.i]; if (!x) return true; ui.wr = { task: x.task, text: x.text, res: x.res, open: {}, before: null, xp: 0, badges: [], idx: +b.dataset.i }; go('writeres'); return true; }
  }
  return false;
}
/* Fragt einmal nach, ob der Server einen Klassencode verlangt */
function wProbe() {
  if (ui.kiInfo || !hasKI()) return;
  ui.kiInfo = { codeNoetig: false };
  fetch(kiUrl(), { method: 'GET' }).then(r => r.ok ? r.json() : null).then(j => { if (j && j.ok) ui.kiInfo = j; }).catch(() => { ui.kiInfo = null; });
}
function wCount() { const el = document.getElementById('wText'), c = document.getElementById('wCount'); if (el && c) c.textContent = el.value.length + ' / ' + W_MAX; }
function wAfterRender() {
  const ta = document.getElementById('wText');
  if (!ta) return;
  ta.addEventListener('input', () => { ui.w.text = ta.value; wCount(); });
  if (!ui.w.busy && !ta.value) ta.focus();
}
