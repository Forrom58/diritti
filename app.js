// Diritti – logica dell'app. Il profilo resta solo sul telefono (localStorage).
const VERSIONE = 'v1.0.6';
const K_PROFILO = 'diritti_profilo';
const K_AVVISO = 'diritti_avviso';   // { data: ISO, ver: n } – registro dell'accettazione
const AVVISO_VER = 1;                // aumentarlo se cambia il testo dell'avviso: verrà richiesto di nuovo
function avvisoAccettato() { const a = leggi(K_AVVISO); return a && a.ver === AVVISO_VER ? a : null; }

const PROFILO_VUOTO = { tipo: [], cecita: 'no', sordo: false, deamb: false, inv: 0, l104: 'no', accomp: false, rara: false, isee: '', ruolo: 'disabile' };

function leggi(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
function scrivi(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

function profilo() { return leggi(K_PROFILO); }
function esito(s) {
  const p = profilo();
  if (!p) return 'forse';
  try { return s.spetta(Object.assign({}, PROFILO_VUOTO, p)); } catch (e) { return 'forse'; }
}
const TESTO_ESITO = { si: 'Ti spetta', forse: 'Da valutare', no: 'Non ti spetta' };

const $ = s => document.querySelector(s);
const main = $('#contenuto');
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function etichetta(e) { return `<span class="etichetta et-${e}">${TESTO_ESITO[e]}</span>`; }

function mostra(html, titoloPagina, conIndietro) {
  main.innerHTML = html;
  document.title = titoloPagina ? `${titoloPagina} – Diritti` : 'Diritti';
  $('#indietro').hidden = !conIndietro;
  window.scrollTo(0, 0);
  const h = main.querySelector('h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
}

// ---------- Schermate ----------
function avviso() {
  const acc = avvisoAccettato();
  mostra(`
    <h1>Avviso importante</h1>
    <div class="riquadro">
      <p>Diritti è una guida informativa, gratuita e realizzata da un privato. Non sostituisce il parere di un avvocato, di un commercialista, di un medico o di un patronato.</p>
      <p>Le informazioni sono state controllate sulle fonti ufficiali alla data indicata in ogni scheda. Leggi e importi però cambiano spesso: prima di presentare una domanda, verifica sempre con l'ente competente (INPS, ASL, Agenzia delle Entrate, Comune, CAF o patronato).</p>
      <p>Le schede segnate come "da verificare" contengono informazioni incerte.</p>
      <p>L'app non è collegata a nessun ente pubblico. L'autore non risponde di eventuali errori, omissioni o decisioni prese in base ai contenuti.</p>
      <p>I dati del tuo profilo restano solo sul tuo telefono e non vengono inviati a nessuno.</p>
    </div>
    ${acc ? `<p class="nota" id="registro">Avviso letto e accettato il ${new Date(acc.data).toLocaleString('it-IT', { dateStyle: 'long', timeStyle: 'short' })}.</p>` : `
    <label class="check"><input type="checkbox" id="letto"> Ho letto l'avviso e lo accetto</label>
    <div class="riga-azioni"><button class="btn-piccolo btn-primario" id="capito" disabled>Accetto</button></div>
    <p id="avviso-err" class="nota" role="status" aria-live="polite"></p>`}`, 'Avviso', !!acc);
  if (acc) return;
  $('#letto').onchange = () => { $('#capito').disabled = !$('#letto').checked; };
  $('#capito').onclick = () => {
    if (!$('#letto').checked) { $('#avviso-err').textContent = 'Spunta la casella per confermare la lettura.'; return; }
    scrivi(K_AVVISO, { data: new Date().toISOString(), ver: AVVISO_VER });
    if (location.hash === '#/') instrada(); else location.hash = '#/';
  };
}

function home() {
  const p = profilo();
  const righe = AMBITI.map(a => {
    const sch = SCHEDE.filter(s => s.ambito === a.id);
    const n = sch.filter(s => esito(s) === 'si').length;
    const info = p ? `${n} su ${sch.length}` : `${sch.length} schede`;
    return `<li><button class="voce" data-vai="#/ambito/${a.id}"><span>${esc(a.nome)}</span><span class="conta">${info}</span></button></li>`;
  }).join('');
  mostra(`
    <h1>Agevolazioni spettanti</h1>
    <p class="nota regione">Regione: Lazio</p>
    ${p ? '' : '<div class="riquadro"><p>Compila il profilo per vedere solo quello che ti spetta.</p><button class="btn-piccolo btn-primario" data-vai="#/profilo">Compila il profilo</button></div>'}
    <ul class="lista">${righe}</ul>`, '', false);
}

function ambito(id) {
  const a = AMBITI.find(x => x.id === id);
  if (!a) return home();
  const sch = SCHEDE.filter(s => s.ambito === id).map(s => ({ s, e: esito(s) }));
  const visibili = sch;
  const righe = visibili.map(({ s, e }) =>
    `<li><button class="voce" data-vai="#/scheda/${s.codice}"><span>${esc(s.titolo)}${s.verifica === 'dubbio' ? ' <span class="testo-verif">(da verificare)</span>' : ''}</span><span class="conta">${etichetta(e)}</span></button></li>`).join('');
  mostra(`
    <h1>${esc(a.nome)}</h1>
    <ul class="lista">${righe || '<li class="nota">Nessuna scheda per il tuo profilo.</li>'}</ul>
`, a.nome, true);
}

function scheda(cod) {
  const s = SCHEDE.find(x => x.codice === cod);
  if (!s) return home();
  const e = esito(s);
  mostra(`
    <h1>${esc(s.titolo)}</h1>
    <p>${etichetta(e)} ${s.verifica === 'dubbio' ? '<span class="etichetta et-verif">Da verificare</span>' : ''}</p>
    <h2>A chi spetta</h2><p>${esc(s.aChi)}</p>
    <h2>Cosa dà</h2><p>${esc(s.cosa)}</p>
    <h2>Come si chiede</h2><p>${esc(s.come)}</p>
    ${s.note ? `<h2>Note</h2><p>${esc(s.note)}</p>` : ''}
    <div class="piede-scheda">Scheda ${esc(s.codice)} · Verificato il ${esc(s.data || VERIFICA_DEFAULT)} · <a href="${esc(s.fonte)}" target="_blank" rel="noopener">Fonte</a> · Controlla sempre con l'ente.</div>`, s.titolo, true);
}

function formProfilo() {
  const p = Object.assign({}, PROFILO_VUOTO, profilo() || {});
  const sel = (v, x) => v === x ? 'selected' : '';
  const chk = (v) => v ? 'checked' : '';
  const tipi = [['visiva', 'Visiva'], ['uditiva', 'Uditiva'], ['motoria', 'Motoria'], ['intellettiva', 'Intellettiva o psichica'], ['altra', 'Altra']];
  mostra(`
    <h1>Il tuo profilo</h1>
    <p class="nota">Resta solo su questo telefono.</p>
    <form id="fprof">
      <label for="ruolo">Chi usa l'app</label>
      <select id="ruolo"><option value="disabile" ${sel(p.ruolo, 'disabile')}>La persona con disabilità</option><option value="familiare" ${sel(p.ruolo, 'familiare')}>Un familiare</option></select>
      <fieldset><legend>Tipo di disabilità</legend>
        ${tipi.map(([v, t]) => `<label class="check"><input type="checkbox" name="tipo" value="${v}" ${chk(p.tipo.includes(v))}> ${t}</label>`).join('')}
      </fieldset>
      <div id="campo-visiva" data-tipo="visiva">
      <label for="cecita">Cecità civile</label>
      <select id="cecita">
        <option value="no" ${sel(p.cecita, 'no')}>Nessuna</option>
        <option value="assoluta" ${sel(p.cecita, 'assoluta')}>Cieco assoluto</option>
        <option value="parziale" ${sel(p.cecita, 'parziale')}>Cieco parziale (fino a 1/20)</option>
        <option value="ipograve" ${sel(p.cecita, 'ipograve')}>Ipovedente grave (fino a 1/10)</option>
      </select>
      </div>
      <div id="campo-uditiva" data-tipo="uditiva">
        <label class="check"><input type="checkbox" id="sordo" ${chk(p.sordo)}> Sordità civile riconosciuta</label>
      </div>
      <div id="campo-motoria" data-tipo="motoria">
        <label class="check"><input type="checkbox" id="deamb" ${chk(p.deamb)}> Capacità di deambulazione gravemente ridotta</label>
      </div>
      <label for="inv">Invalidità civile (percentuale, 0 se nessuna)</label>
      <input id="inv" type="number" min="0" max="100" inputmode="numeric" value="${p.inv}">
      <label for="l104">Legge 104</label>
      <select id="l104"><option value="no" ${sel(p.l104, 'no')}>No</option><option value="si" ${sel(p.l104, 'si')}>Sì, senza gravità</option><option value="grave" ${sel(p.l104, 'grave')}>Sì, con gravità (art. 3 c. 3)</option></select>
      <fieldset><legend>Altro</legend>
        <label class="check"><input type="checkbox" id="accomp" ${chk(p.accomp)}> Indennità di accompagnamento</label>
        <label class="check"><input type="checkbox" id="rara" ${chk(p.rara)}> Esenzione per malattia rara</label>
      </fieldset>
      <label for="isee">ISEE in euro (lascia vuoto se non lo sai)</label>
      <input id="isee" type="number" min="0" inputmode="numeric" value="${p.isee}">
      <div class="riga-azioni">
        <button type="submit" class="btn-piccolo btn-primario">Salva profilo</button>
        <button type="button" class="btn-piccolo" id="cancella">Cancella profilo</button>
      </div>
      <p id="esito-salva" class="nota" role="status" aria-live="polite"></p>
    </form>`, 'Profilo', true);
  const aggiornaCampi = () => {
    const scelti = [...document.querySelectorAll('input[name=tipo]:checked')].map(c => c.value);
    document.querySelectorAll('[data-tipo]').forEach(d => { d.hidden = !scelti.includes(d.dataset.tipo); });
  };
  document.querySelectorAll('input[name=tipo]').forEach(c => c.addEventListener('change', aggiornaCampi));
  aggiornaCampi();
  $('#fprof').onsubmit = ev => {
    ev.preventDefault();
    const inv = Math.max(0, Math.min(100, parseInt($('#inv').value, 10) || 0));
    const iseeV = $('#isee').value.trim();
    const nuovo = {
      ruolo: $('#ruolo').value,
      tipo: [...document.querySelectorAll('input[name=tipo]:checked')].map(c => c.value),
      cecita: $('#cecita').value, sordo: $('#sordo').checked, deamb: $('#deamb').checked,
      inv, l104: $('#l104').value,
      accomp: $('#accomp').checked, rara: $('#rara').checked,
      isee: iseeV === '' ? '' : Number(iseeV)
    };
    if (!nuovo.tipo.includes('visiva')) nuovo.cecita = 'no';
    if (!nuovo.tipo.includes('uditiva')) nuovo.sordo = false;
    if (!nuovo.tipo.includes('motoria')) nuovo.deamb = false;
    scrivi(K_PROFILO, nuovo);
    $('#esito-salva').textContent = 'Profilo salvato.';
    setTimeout(() => { location.hash = '#/'; }, 700);
  };
  $('#cancella').onclick = () => {
    try { localStorage.removeItem(K_PROFILO); } catch (e) {}
    $('#esito-salva').textContent = 'Profilo cancellato.';
    setTimeout(formProfilo, 700);
  };
}

// ---------- Navigazione ----------
function instrada() {
  if (!avvisoAccettato()) return avviso();
  const h = location.hash.replace(/^#\/?/, '').split('/');
  if (h[0] === 'profilo') return formProfilo();
  if (h[0] === 'avviso') return avviso();
  if (h[0] === 'ambito') return ambito(h[1]);
  if (h[0] === 'scheda') return scheda(h[1]);
  return home();
}
document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-vai]');
  if (b) { ev.preventDefault(); location.hash = b.dataset.vai; }
});
$('#indietro').onclick = () => history.length > 1 ? history.back() : (location.hash = '#/');
$('#versione').textContent = VERSIONE;
window.addEventListener('hashchange', instrada);
instrada();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
