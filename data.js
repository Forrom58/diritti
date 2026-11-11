// Diritti – schede delle agevolazioni (Roma e Lazio)
// Formato fisso: codice, titolo, aChi, cosa, come, fonte, verifica ('ok' o 'dubbio'), data, note, spetta(p)
// spetta(p) restituisce 'si', 'forse' o 'no' in base al profilo p.

const VERIFICA_DEFAULT = '10/11/2026';

// Soglie in un solo punto: aggiornarle ogni anno (di solito a gennaio).
const SOGLIE = {
  anno: 2026,
  pensioneCiechiAssoluti: 20029.55, // reddito personale annuo massimo (INPS, circolare 153/2025)
  bonusSociale: 9796,               // ISEE massimo bonus luce e gas (ARERA)
  metrebus: 25000,                  // ISEE massimo voucher Metrebus 30%
  detrazioneBadante: 40000          // reddito massimo detrazione 19% addetti all'assistenza
};

// Una regola restituisce 'si', 'no', 'forse' oppure F('forse', 'motivo').
const F = (e, perche) => ({ e, perche });
const num = v => (v === '' || v === null || v === undefined || isNaN(v)) ? null : Number(v);

const cieco = p => p.cecita === 'assoluta' || p.cecita === 'parziale' || p.cecita === 'ipograve';
const grave104 = p => p.l104 === 'grave';
const ha104 = p => p.l104 === 'si' || p.l104 === 'grave';
const isee = (p, max) => num(p.isee) === null ? F('forse', 'Manca l\'ISEE nel profilo') : (num(p.isee) <= max ? 'si' : 'no');
const sinoRisposta = (v, motivoMancante) => v === 'si' ? 'si' : v === 'no' ? 'no' : F('forse', motivoMancante);

const AMBITI = [
  { id: 'sanita', nome: 'Sanità' },
  { id: 'fisco', nome: 'Fisco' },
  { id: 'energia', nome: 'Energia' },
  { id: 'telefonia', nome: 'Telefonia' },
  { id: 'mobilita', nome: 'Mobilità' },
  { id: 'lavoro', nome: 'Lavoro e previdenza' },
  { id: 'sociale', nome: 'Casa e servizi sociali' },
  { id: 'cultura', nome: 'Tempo libero e cultura' },
  { id: 'digitale', nome: 'Tecnologia e ausili digitali' }
];

const SCHEDE = [
  // ---------- SANITÀ ----------
  { ambito: 'sanita', codice: 'S1', titolo: 'Esenzione ticket per cecità (codice C05)',
    aChi: 'Ciechi assoluti o con residuo visivo fino a 1/10, riconosciuti dalla Commissione ciechi civili.',
    cosa: 'Esenzione totale dal ticket per la specialistica ambulatoriale dei LEA (visite, esami). Nessun limite di reddito.',
    come: 'Si chiede alla propria ASL con il verbale. Per i ciechi il tesserino ha validità illimitata.',
    fonte: 'https://www.salute.gov.it', verifica: 'ok', note: '',
    spetta: p => cieco(p) ? 'si' : 'no' },
  { ambito: 'sanita', codice: 'S2', titolo: 'Esenzione per malattia rara',
    aChi: 'Chi ha una malattia rara riconosciuta. Retinite pigmentosa: codice RFG110 (R99 in caso di sospetto diagnostico).',
    cosa: 'Esenzione dal ticket per le prestazioni collegate alla malattia.',
    come: 'Richiesta alla propria ASL con la certificazione della malattia rara.',
    fonte: 'https://www.salute.gov.it', verifica: 'ok', note: '',
    spetta: p => p.rara ? 'si' : 'no' },
  { ambito: 'sanita', codice: 'S3', titolo: 'Farmaci',
    aChi: 'Ciechi assoluti con codice di esenzione.',
    cosa: 'Esonero dal ticket fisso sui farmaci di fascia A. Resta da pagare l\'eventuale differenza se si sceglie un farmaco di marca più caro del generico. I farmaci di fascia C si pagano.',
    come: 'Il codice di esenzione va riportato sulla ricetta dal medico.',
    fonte: 'https://www.regione.lazio.it', verifica: 'dubbio',
    note: 'Basato su una circolare della Regione Lazio del 2005: confermare in farmacia.',
    spetta: p => p.cecita === 'assoluta' ? F('forse', 'La fonte è del 2005: confermare in farmacia') : 'no' },
  { ambito: 'sanita', codice: 'S4', titolo: 'Ausili gratuiti dall\'ASL (nomenclatore)',
    aChi: 'Invalidi civili, privi della vista, sordi, invalidi dal 34% in su (elenco dell\'ASL Roma 2).',
    cosa: 'Ausili in comodato gratuito. Per i non vedenti: display braille (22.39.05.003), software OCR (22.30.21.003), sintesi vocale (22.39.07.003).',
    come: '1) Prescrizione di uno specialista pubblico (valida 90 giorni). 2) Sportello Assistenza Protesica del proprio distretto, anche con delegato. 3) Prima richiesta: documento, autocertificazione di residenza e privacy, copia del verbale, preventivo della ditta. 4) Autorizzazione, ritiro, collaudo entro 20 giorni.',
    fonte: 'https://www.aslroma2.it/index.php/servizi/medicina-legale/medicina-protesica?view=page&id=11', verifica: 'ok',
    note: 'Se il collaudo non si fa entro 20 giorni, l\'ausilio si considera accettato.',
    spetta: p => (cieco(p) || p.inv >= 34 || p.sordo) ? 'si' : F('forse', 'Serve invalidità almeno al 34%, cecità o sordità riconosciute') },
  { ambito: 'sanita', codice: 'S5', titolo: 'Riabilitazione visiva a Roma',
    aChi: 'Persone cieche o ipovedenti.',
    cosa: 'Centri: Sant\'Alessio (centro regionale per i ciechi, viale Odescalchi 38), Ospedale Sant\'Eugenio (ASL Roma 2), Polo Nazionale al Gemelli, Policlinico Umberto I, Tor Vergata, Ospedale Oftalmico, Ospedale Israelitico, Santa Lucia.',
    come: 'Contattare il centro; di solito serve l\'impegnativa del medico.',
    fonte: 'https://polonazionaleipovisione.it/lazio/', verifica: 'ok', note: 'Elenco aggiornato a settembre 2025.',
    spetta: p => (cieco(p) || p.tipo.includes('visiva')) ? 'si' : 'no' },
  { ambito: 'sanita', codice: 'S6', titolo: 'Certificazioni: invalidità, 104, revisioni, ricorsi',
    aChi: 'Tutti.',
    cosa: 'Da marzo 2026 la provincia di Roma è nella sperimentazione della riforma: valuta solo l\'INPS (Unità di Valutazione di Base). Esonero dalle revisioni per le patologie del DM 2/8/2007, tra cui il deficit totale della visione.',
    come: 'Domanda o aggravamento: certificato medico introduttivo inviato da un medico certificatore. Ricorso: accertamento tecnico preventivo in Tribunale entro 6 mesi dalla notifica del verbale.',
    fonte: 'https://www.inps.it', verifica: 'ok',
    note: 'Se si viene convocati a revisione pur essendo esonerati, bisogna presentarsi e far valere l\'esonero.',
    spetta: p => 'si' },

  // ---------- FISCO ----------
  { ambito: 'fisco', codice: 'F1', titolo: 'Spese sanitarie e sussidi',
    aChi: 'Persone con disabilità (104) o familiari che le hanno a carico.',
    cosa: 'Spese mediche generiche e di assistenza specifica deducibili per intero. Sussidi tecnici e informatici detraibili al 19% sull\'intero importo. Spese specialistiche al 19% oltre 129,11 euro.',
    come: 'Dichiarazione dei redditi. Per i sussidi: certificato del medico curante e pagamento tracciabile.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok', note: 'Guida Agenzia delle Entrate, febbraio 2026.',
    spetta: p => (ha104(p) || cieco(p)) ? 'si' : F('forse', 'Serve la 104 o un riconoscimento di invalidità') },
  { ambito: 'fisco', codice: 'F2', titolo: 'IVA al 4% su sussidi, libri braille e audio',
    aChi: 'Persone con disabilità, anche visiva.',
    cosa: 'IVA al 4% invece del 22% sui sussidi tecnici e informatici. Anche su libri e giornali in braille o su supporto audio.',
    come: 'Al venditore: copia del verbale; se il verbale non collega il sussidio alla disabilità, anche il certificato del medico curante.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok', note: '',
    spetta: p => (ha104(p) || cieco(p)) ? 'si' : F('forse', 'Serve la 104 o un riconoscimento di invalidità') },
  { ambito: 'fisco', codice: 'F3', titolo: 'Auto',
    aChi: 'Non vedenti e altre disabilità previste (anche auto intestata al familiare che li ha a carico).',
    cosa: 'Detrazione 19% fino a 18.075,99 euro ogni 4 anni. IVA al 4% (fino a 2.000 cc benzina, 2.800 cc diesel, 150 kW elettrico). Esenzione permanente dal bollo.',
    come: 'IVA e detrazione: documenti al concessionario. Bollo: domanda all\'ufficio tributi della Regione.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok',
    note: 'Per non vedenti e sordi NON c\'è l\'esenzione dall\'imposta di trascrizione al PRA. Per i non vedenti non serve adattare il veicolo.',
    spetta: p => cieco(p) ? 'si' : F('forse', 'Per le disabilità non visive servono requisiti specifici, da controllare') },
  { ambito: 'fisco', codice: 'F4', titolo: 'Cane guida',
    aChi: 'Non vedenti.',
    cosa: 'Detrazione 19% sul costo d\'acquisto, ogni 4 anni. Detrazione forfettaria di 1.100 euro l\'anno per il mantenimento (dal 2025), senza ricevute.',
    come: 'Dichiarazione dei redditi.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok', note: 'Il forfait spetta solo al non vedente.',
    spetta: p => cieco(p) ? 'si' : 'no' },
  { ambito: 'fisco', codice: 'F5', titolo: 'Assistenza personale (badante)',
    aChi: 'Chi paga colf o badante; per la detrazione serve la non autosufficienza certificata.',
    cosa: 'Contributi deducibili fino a 1.549,37 euro. Detrazione 19% su massimo 2.100 euro di spesa, con reddito fino a 40.000 euro.',
    come: 'Dichiarazione dei redditi; certificazione medica di non autosufficienza per la detrazione.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok', note: '',
    spetta: p => {
      if (p.badante === 'no') return 'no';
      const mancano = [];
      if (p.badante !== 'si') mancano.push('colf o badante');
      if (p.nonauto !== 'si' && p.nonauto !== 'no') mancano.push('non autosufficienza');
      if (num(p.reddito) === null) mancano.push('reddito personale');
      if (mancano.length) return F('forse', 'Mancano nel profilo: ' + mancano.join(', '));
      if (p.nonauto === 'si' && num(p.reddito) <= SOGLIE.detrazioneBadante) return 'si';
      return F('forse', 'Spetta la deduzione dei contributi; la detrazione no (serve non autosufficienza e reddito fino a ' + SOGLIE.detrazioneBadante.toLocaleString('it-IT') + ' euro)');
    } },
  { ambito: 'fisco', codice: 'F6', titolo: 'Casa e barriere architettoniche',
    aChi: 'Chi fa lavori in casa.',
    cosa: 'Recupero edilizio: 50% sull\'abitazione principale (36% sulle altre), su massimo 96.000 euro.',
    come: 'Bonifico parlante e dichiarazione dei redditi.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok', note: '',
    spetta: p => F('forse', 'Dipende dai lavori') },
  { ambito: 'fisco', codice: 'F7', titolo: 'Successioni e donazioni',
    aChi: 'Persone con 104 in situazione di gravità che ricevono eredità o donazioni.',
    cosa: 'L\'imposta si paga solo sulla parte oltre 1.500.000 euro.',
    come: 'Nella dichiarazione di successione o nell\'atto di donazione.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'ok', note: '',
    spetta: p => grave104(p) ? 'si' : 'no' },

  // ---------- ENERGIA ----------
  { ambito: 'energia', codice: 'E1', titolo: 'Cliente vulnerabile (luce e gas)',
    aChi: 'Chi ha la 104 (anche un componente del nucleo).',
    cosa: 'Luce: maggior tutela. Gas: servizio di tutela della vulnerabilità. Prezzi e condizioni fissati da ARERA. Si può passare al mercato libero senza penali.',
    come: 'Contattare il proprio fornitore autocertificando la 104.',
    fonte: 'https://www.arera.it', verifica: 'ok',
    note: 'Non è per forza la tariffa più economica: confrontare con il mercato libero.',
    spetta: p => ha104(p) ? 'si' : 'no' },
  { ambito: 'energia', codice: 'E2', titolo: 'Bonus sociale per disagio economico',
    aChi: 'Nuclei con ISEE fino a 9.796 euro (20.000 con almeno 4 figli a carico).',
    cosa: 'Sconto automatico sulle bollette: luce 146 euro l\'anno per 1-2 persone. Dal 2026 anche sconto del 25% sulla TARI.',
    come: 'Automatico: basta presentare la DSU per l\'ISEE.',
    fonte: 'https://www.arera.it', verifica: 'ok', note: '',
    spetta: p => isee(p, SOGLIE.bonusSociale) },
  { ambito: 'energia', codice: 'E3', titolo: 'Bonus luce per disagio fisico',
    aChi: 'Chi usa in casa apparecchiature elettromedicali salvavita.',
    cosa: 'Sconto sulla bolletta della luce, senza limiti di ISEE; si somma al bonus economico.',
    come: 'Su domanda (vedi le istruzioni sul sito ARERA).',
    fonte: 'https://www.arera.it', verifica: 'ok', note: '',
    spetta: p => sinoRisposta(p.salvavita, 'Manca la risposta sugli apparecchi salvavita') },

  // ---------- TELEFONIA ----------
  { ambito: 'telefonia', codice: 'T1', titolo: 'Internet di casa -50%',
    aChi: 'Ciechi totali e parziali, sordi, persone con gravi limitazioni della deambulazione.',
    cosa: 'Sconto del 50% sul canone delle offerte flat e semiflat voce e dati o solo internet, per una connessione. Passaggio gratuito a un piano superiore se possibile.',
    come: 'Modulo dell\'operatore con certificazione medica pubblica.',
    fonte: 'https://www.agcom.it', verifica: 'ok', note: 'Delibera AGCOM 290/21/CONS, aggiornata 2023-2024.',
    spetta: p => ((cieco(p) && p.cecita !== 'ipograve') || p.sordo || p.deamb) ? 'si' : 'no' },
  { ambito: 'telefonia', codice: 'T2', titolo: 'Cellulare -50%',
    aChi: 'Come per il fisso.',
    cosa: 'Ogni operatore applica lo sconto del 50% ad almeno un\'offerta per fascia (meno di 50 GB, più di 50 GB, illimitata), per un solo numero.',
    come: 'Modulo dell\'operatore con certificazione medica pubblica.',
    fonte: 'https://www.agcom.it', verifica: 'ok', note: '',
    spetta: p => ((cieco(p) && p.cecita !== 'ipograve') || p.sordo || p.deamb) ? 'si' : 'no' },
  { ambito: 'telefonia', codice: 'T3', titolo: 'Fisso e cellulare insieme',
    aChi: 'Ciechi totali.',
    cosa: 'I ciechi totali possono avere entrambi gli sconti. Ciechi parziali e persone con gravi limitazioni motorie ne possono scegliere solo uno.',
    come: 'Due richieste, una per il fisso e una per il cellulare.',
    fonte: 'https://www.agcom.it', verifica: 'ok', note: '',
    spetta: p => p.cecita === 'assoluta' ? 'si' : 'no' },
  { ambito: 'telefonia', codice: 'T4', titolo: 'Come si chiede lo sconto',
    aChi: 'Chi ha diritto agli sconti T1 o T2.',
    cosa: 'Nessun requisito ISEE. Lo sconto parte dal giorno in cui l\'operatore riceve la domanda.',
    come: 'Modulo dell\'operatore più certificato medico pubblico, alla firma o in qualsiasi momento. Risposta entro 30 giorni.',
    fonte: 'https://www.agcom.it', verifica: 'ok', note: '',
    spetta: p => ((cieco(p) && p.cecita !== 'ipograve') || p.sordo || p.deamb) ? 'si' : 'no' },
  { ambito: 'telefonia', codice: 'T5', titolo: 'Altri diritti con l\'operatore',
    aChi: 'Persone con disabilità previste dalla delibera.',
    cosa: 'Bolletta gratuita accessibile via email, canale di assistenza dedicato dalle 8 alle 24, priorità nella riparazione dei guasti, persona di fiducia che gestisce il contratto.',
    come: 'Chiedere all\'operatore.',
    fonte: 'https://www.agcom.it', verifica: 'ok', note: '',
    spetta: p => ((cieco(p) && p.cecita !== 'ipograve') || p.sordo || p.deamb) ? 'si' : 'no' },

  // ---------- MOBILITÀ ----------
  { ambito: 'mobilita', codice: 'M1', titolo: 'Contrassegno disabili (CUDE)',
    aChi: 'Non vedenti e persone con capacità di deambulazione ridotta.',
    cosa: 'A Roma, solo con il titolare a bordo: ingresso nelle ZTL, sosta negli stalli riservati e sosta gratuita sulle strisce blu.',
    come: 'Online su Roma Servizi per la Mobilità con SPID o CIE, oppure allo sportello di via Silvio D\'Amico.',
    fonte: 'https://romamobilita.it', verifica: 'ok',
    note: 'Dal 22 agosto 2026 nelle ZTL entra solo la targa indicata come principale.',
    spetta: p => (cieco(p) || p.deamb) ? 'si' : (p.tipo.includes('motoria') ? 'forse' : 'no') },
  { ambito: 'mobilita', codice: 'M2', titolo: 'Carta Blu Trenitalia',
    aChi: 'Chi ha l\'indennità di accompagnamento (anche ciechi assoluti).',
    cosa: 'L\'accompagnatore viaggia gratis: un biglietto a prezzo intero vale per due. Gratuita, dura 5 anni.',
    come: 'In biglietteria o alle Sale Blu.',
    fonte: 'https://www.trenitalia.com', verifica: 'dubbio',
    note: 'Da verificare la gratuità dell\'accompagnatore sull\'Alta Velocità.',
    spetta: p => p.accomp ? 'si' : 'no' },
  { ambito: 'mobilita', codice: 'M3', titolo: 'Autobus, metro e treni regionali (Metrebus, Cotral)',
    aChi: 'Residenti nel Lazio.',
    cosa: 'Voucher sull\'abbonamento annuale Metrebus: 30% con ISEE fino a 25.000 euro, 50% per nuclei con 104 grave. Cotral: -50% per i ciechi assoluti (-70% fuori dalle ore di punta).',
    come: 'Voucher sul portale regionale SIRGAT.',
    fonte: 'https://agevolazionitariffarietpl.regione.lazio.it', verifica: 'dubbio',
    note: 'Fonte: guida CGIL di giugno 2026. Da chiarire se per lo sconto 104 serve anche l\'ISEE fino a 25.000 euro.',
    spetta: p => {
      if (p.cecita === 'assoluta') return 'si';
      const i = num(p.isee);
      if (i !== null && i <= SOGLIE.metrebus) return 'si';
      if (grave104(p)) return F('forse', 'Lo sconto del 50% per i nuclei con 104 grave è da chiarire (fonte non ufficiale)');
      if (i === null) return F('forse', 'Manca l\'ISEE nel profilo');
      return 'no';
    } },
  { ambito: 'mobilita', codice: 'M4', titolo: 'Trasporto individuale a Roma (STID)',
    aChi: 'Residenti a Roma con 104 grave e contrassegno.',
    cosa: 'Servizio di trasporto prenotabile, dal 1° gennaio 2026 affidato ai taxi.',
    come: 'Domanda di iscrizione online (SPID o CIE) o allo sportello di via Silvio D\'Amico 40. Una volta iscritti, le corse si prenotano con l\'app STID.',
    fonte: 'https://romamobilita.it/servizi-al-pubblico/nuovagestione/', verifica: 'dubbio', note: 'Delibera 129/2018. Iscrizioni valide 3 anni. Costi e limiti di corse non verificati.',
    spetta: p => {
      if (p.comune === 'lazio') return 'no';
      if (!(grave104(p) && (cieco(p) || p.deamb))) return 'no';
      if (p.comune !== 'roma') return F('forse', 'Manca il comune nel profilo (servizio solo per residenti a Roma)');
      return F('forse', 'Iscrizioni valide 3 anni (graduatoria 2026-2028, domande chiuse il 30/11/2025). Risulta una lista d\'attesa aperta fino al 15/01/2027: verificare su Roma Servizi per la Mobilità');
    } },
  { ambito: 'mobilita', codice: 'M5', titolo: 'Assistenza in aeroporto e in aereo',
    aChi: 'Persone con disabilità o mobilità ridotta.',
    cosa: 'Assistenza gratuita in aeroporto e a bordo (regolamento europeo).',
    come: 'Prenotarla almeno 48 ore prima con la compagnia o l\'agenzia.',
    fonte: 'https://www.enac.gov.it', verifica: 'ok', note: '',
    spetta: p => 'si' },

  // ---------- LAVORO E PREVIDENZA ----------
  { ambito: 'lavoro', codice: 'P1', titolo: 'Indennità di accompagnamento ciechi assoluti',
    aChi: 'Ciechi assoluti.',
    cosa: '1.064,98 euro al mese per 12 mensilità (2026). Nessun limite di reddito o età. Compatibile con il lavoro e con il ricovero.',
    come: 'Riconoscimento INPS della cecità assoluta.',
    fonte: 'https://www.inps.it', verifica: 'ok', note: 'Circolare INPS 153/2025.',
    spetta: p => p.cecita === 'assoluta' ? 'si' : 'no' },
  { ambito: 'lavoro', codice: 'P2', titolo: 'Pensione ciechi civili assoluti',
    aChi: 'Ciechi assoluti con reddito personale annuo fino a 20.029,55 euro.',
    cosa: '368,46 euro al mese per 13 mensilità (340,71 se ricoverati).',
    come: 'Con il riconoscimento INPS; controllare di riceverla se si rientra nel limite.',
    fonte: 'https://www.inps.it', verifica: 'ok', note: 'Importi validi per il 2026.',
    spetta: p => {
      if (p.cecita !== 'assoluta') return 'no';
      const r = num(p.reddito);
      if (r === null) return F('forse', 'Manca il reddito personale nel profilo');
      return r <= SOGLIE.pensioneCiechiAssoluti ? 'si' : 'no';
    } },
  { ambito: 'lavoro', codice: 'P3', titolo: 'Lavoratori non vedenti',
    aChi: 'Lavoratori dipendenti non vedenti.',
    cosa: '4 mesi di contributi figurativi in più per ogni anno lavorato. Dal 2017 anche aumento della quota contributiva della pensione.',
    come: 'Domanda all\'INPS.',
    fonte: 'https://www.inps.it', verifica: 'dubbio', note: 'Requisiti ridotti per la pensione di vecchiaia da verificare.',
    spetta: p => cieco(p) ? sinoRisposta(p.dipendente, 'Manca la risposta sul lavoro dipendente') : 'no' },
  { ambito: 'lavoro', codice: 'P4', titolo: 'Permessi 104',
    aChi: 'Lavoratori con 104 grave o familiari che li assistono.',
    cosa: '3 giorni al mese retribuiti oppure 2 ore al giorno.',
    come: 'Domanda all\'INPS e al datore di lavoro.',
    fonte: 'https://www.inps.it', verifica: 'dubbio', note: 'Regola consolidata, non ricontrollata.',
    spetta: p => {
      if (!grave104(p)) return 'no';
      if (p.ruolo === 'familiare' || p.dipendente === 'si') return 'si';
      if (p.dipendente === 'no') return F('forse', 'Spetta al familiare lavoratore che ti assiste');
      return F('forse', 'Manca la risposta sul lavoro dipendente');
    } },
  { ambito: 'lavoro', codice: 'P5', titolo: 'Collocamento mirato',
    aChi: 'Persone con disabilità in cerca di lavoro.',
    cosa: 'Percorsi riservati; per i non vedenti anche centralinisti (legge 113/1985) e massofisioterapisti.',
    come: 'Iscrizione al centro per l\'impiego (collocamento mirato).',
    fonte: 'https://www.regione.lazio.it', verifica: 'dubbio', note: 'Da approfondire.',
    spetta: p => F('forse', 'Dipende se cerchi lavoro') },

  // ---------- CASA E SERVIZI SOCIALI ----------
  { ambito: 'sociale', codice: 'C1', titolo: 'Assistenza domiciliare del Municipio (SAISH)',
    aChi: 'Adulti con disabilità residenti a Roma.',
    cosa: 'Un operatore aiuta a casa, nell\'autonomia e negli spostamenti.',
    come: 'Domanda al servizio sociale del proprio Municipio.',
    fonte: 'https://www.comune.roma.it', verifica: 'dubbio', note: 'Ore e liste d\'attesa cambiano da Municipio a Municipio.',
    spetta: p => {
      if (p.comune === 'lazio' || !ha104(p)) return 'no';
      return F('forse', p.comune === 'roma' ? 'Dipende dalla valutazione del Municipio' : 'Manca il comune nel profilo (servizio di Roma Capitale)');
    } },
  { ambito: 'sociale', codice: 'C2', titolo: 'Disabilità gravissima (assegno di cura)',
    aChi: 'Persone con disabilità gravissima. Per i non vedenti serve cecità totale INSIEME a grave sordità.',
    cosa: 'A Roma: assegno di cura di 800 euro al mese oppure contributo di 700 euro al mese al caregiver.',
    come: 'Chiedere al servizio sociale del Municipio.',
    fonte: 'https://www.regione.lazio.it', verifica: 'ok', note: 'Con la sola cecità non spetta. Canale di domanda da verificare.',
    spetta: p => (p.cecita === 'assoluta' && p.sordo) ? F('forse', 'Serve la valutazione di disabilità gravissima') : 'no' },
  { ambito: 'sociale', codice: 'C3', titolo: 'Caregiver familiare',
    aChi: 'Familiari che assistono una persona con disabilità.',
    cosa: 'Riconoscimento formale come caregiver (legge regionale 5/2024). Contributo una tantum sperimentale (delibera 1317/2025).',
    come: 'Riconoscimento online sul portale della Regione Lazio.',
    fonte: 'https://www.regione.lazio.it', verifica: 'dubbio', note: 'Importi e requisiti del contributo da verificare.',
    spetta: p => p.ruolo === 'familiare' ? 'si' : F('forse', 'Riguarda il familiare che ti assiste') },
  { ambito: 'sociale', codice: 'C4', titolo: 'Buoni servizio per la non autosufficienza',
    aChi: 'Persone non autosufficienti certificate.',
    cosa: 'Fino a 8.400 euro per pagare una badante con contratto regolare o centri diurni.',
    come: 'Bando regionale (2026: dal 15 aprile al 14 maggio, chiuso; di solito viene riproposto).',
    fonte: 'https://www.regione.lazio.it', verifica: 'dubbio', note: '',
    spetta: p => p.nonauto === 'si' ? F('forse', 'Bando annuale, al momento chiuso') : p.nonauto === 'no' ? 'no' : F('forse', 'Manca la risposta sulla non autosufficienza') },

  // ---------- TEMPO LIBERO E CULTURA ----------
  { ambito: 'cultura', codice: 'L1', titolo: 'Disability Card',
    aChi: 'Tra gli altri: ciechi civili, chi ha l\'accompagnamento, chi ha la 104 grave.',
    cosa: 'Dimostra la disabilità senza verbali. Convenzioni con musei, cinema, Trenitalia, FAI. Disponibile anche in IT Wallet. Da marzo 2026 vale per il voto assistito.',
    come: 'Online sul sito INPS con SPID, CIE o CNS, oppure tramite associazioni (es. UICI).',
    fonte: 'https://www.inps.it', verifica: 'ok', note: '',
    spetta: p => (cieco(p) || p.accomp || grave104(p)) ? 'si' : F('forse', 'Serve un riconoscimento di disabilità (verbale)') },
  { ambito: 'cultura', codice: 'L2', titolo: 'Musei e luoghi della cultura statali',
    aChi: 'Persone con disabilità e un accompagnatore.',
    cosa: 'Ingresso gratuito in musei, monumenti, scavi, parchi e giardini statali.',
    come: 'Mostrare la certificazione o la Disability Card alla cassa.',
    fonte: 'https://cultura.gov.it', verifica: 'ok', note: 'DM 111/2016.',
    spetta: p => 'si' },
  { ambito: 'cultura', codice: 'L3', titolo: 'Cinema, teatri ed eventi',
    aChi: 'Titolari di Disability Card.',
    cosa: 'Biglietti gratuiti o ridotti presso alcune catene e strutture convenzionate.',
    come: 'Consultare l\'elenco ufficiale delle convenzioni della Disability Card.',
    fonte: 'https://www.inps.it', verifica: 'dubbio', note: 'Convenzioni private che cambiano spesso.',
    spetta: p => F('forse', 'Le convenzioni cambiano spesso') },
  { ambito: 'cultura', codice: 'L4', titolo: 'Libri accessibili',
    aChi: 'Non vedenti e ipovedenti.',
    cosa: 'Centro Nazionale del Libro Parlato UICI: prestito gratuito di audiolibri, anche per chi non è iscritto. Biblioteca Italiana per i Ciechi "Regina Margherita": libri in braille.',
    come: 'Iscrizione al servizio presso i due enti.',
    fonte: 'https://www.uiciechi.it', verifica: 'ok', note: 'Vedi anche IVA al 4% (F2).',
    spetta: p => cieco(p) ? 'si' : 'no' },

  // ---------- TECNOLOGIA E AUSILI DIGITALI ----------
  { ambito: 'digitale', codice: 'D1', titolo: 'Ausili digitali gratuiti dall\'ASL',
    aChi: 'Vedi scheda S4.',
    cosa: 'Display braille, software OCR, sintesi vocale in comodato gratuito.',
    come: 'Prescrizione di uno specialista pubblico, poi sportello Assistenza Protesica del distretto.',
    fonte: 'https://www.aslroma2.it/index.php/servizi/medicina-legale/medicina-protesica?view=page&id=11', verifica: 'ok', note: '',
    spetta: p => cieco(p) ? 'si' : F('forse', 'Vedi i requisiti della scheda S4') },
  { ambito: 'digitale', codice: 'D2', titolo: 'Acquisto di computer e dispositivi',
    aChi: 'Vedi schede F1 e F2.',
    cosa: 'IVA al 4% e detrazione del 19% sull\'intero importo per computer e sussidi informatici.',
    come: 'Verbale e certificato del medico curante; pagamento tracciabile.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'dubbio',
    note: 'Lo smartphone non è citato espressamente: chiedere conferma a un CAF.',
    spetta: p => (ha104(p) || cieco(p)) ? 'si' : F('forse', 'Serve la 104 o un riconoscimento di invalidità') },
  { ambito: 'digitale', codice: 'D3', titolo: 'App gratuite per non vedenti',
    aChi: 'Non vedenti e ipovedenti.',
    cosa: 'Be My Eyes / Be My AI (descrizione delle foto e volontari 24 ore su 24). Seeing AI di Microsoft, in italiano. TalkBack, già incluso in Android.',
    come: 'Scaricarle dallo store del telefono.',
    fonte: 'https://www.bemyeyes.com', verifica: 'ok', note: '',
    spetta: p => cieco(p) ? 'si' : 'no' },
  { ambito: 'digitale', codice: 'D4', titolo: 'Abbonamenti a intelligenze artificiali',
    aChi: 'Tutti.',
    cosa: 'Non risultano sconti per persone con disabilità. La detraibilità come sussidio non è prevista espressamente.',
    come: 'Chiedere a un CAF prima di detrarre.',
    fonte: 'https://www.agenziaentrate.gov.it', verifica: 'dubbio', note: '',
    spetta: p => F('forse', 'Detraibilità non prevista: chiedere al CAF') }
];
