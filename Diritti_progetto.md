# Progetto PWA "Diritti" – Riassunto

**Nome app:** Diritti (nome breve sotto l'icona) · **Scritta nella fascia dell'icona:** DIRITTI · **Cartella:** C:\Appoggio-Claude\DIRITTI

**Ultimo aggiornamento:** 10 novembre 2026
**Stato:** v1.0.7 (11/11/2026).

---

## 1. Idea

Una PWA (scura e accessibile) con le agevolazioni per le persone con disabilità e le loro famiglie.
- **Fase 1:** Roma e Lazio, prima per l'utente, poi estesa ad altri.
- **Fase 2:** le altre regioni, una alla volta.

Si inserisce un **profilo** e l'app mostra solo le agevolazioni che spettano davvero.

### Campi del profilo (filtri)
- Tipo di disabilità (visiva, uditiva, motoria, intellettiva…)
- Riconoscimenti: invalidità civile e percentuale, cecità civile (assoluta, parziale, ipovedente grave), 104 (con o senza gravità), accompagnamento, esenzione per malattia rara
- Beneficiario: il disabile oppure il familiare
- Età, ISEE, regione, comune o municipio, ASL

### Profilo di test (l'utente)
Cieco assoluto · 104 grave · accompagnamento · esenzione per malattia rara (retinite pigmentosa, codice RFG110) · Roma, ASL Roma 2.
Già attivi: Iliad fisso e mobile al 50%, servizio STID.

### Formato fisso della scheda
| Campo | Contenuto |
|---|---|
| Codice | es. S1, F3, T2 |
| Titolo | |
| A chi spetta | requisiti |
| Cosa dà | importo, percentuale, servizio |
| Come si chiede | ente, canale, documenti |
| Fonte | link ufficiale |
| Verifica | ✅ verificata / ⚠️ da verificare + data |
| Note | limiti, incompatibilità |

### Disclaimer (approvato il 10/11/2026)

> **Avviso importante**
>
> Diritti è una guida informativa, gratuita e realizzata da un privato. Non sostituisce il parere di un avvocato, di un commercialista, di un medico o di un patronato.
>
> Le informazioni sono state controllate sulle fonti ufficiali alla data indicata in ogni scheda. Leggi e importi però cambiano spesso: prima di presentare una domanda, verifica sempre con l'ente competente (INPS, ASL, Agenzia delle Entrate, Comune, CAF o patronato).
>
> Le schede segnate come "da verificare" contengono informazioni incerte.
>
> L'app non è collegata a nessun ente pubblico. L'autore non risponde di eventuali errori, omissioni o decisioni prese in base ai contenuti.
>
> I dati del tuo profilo restano solo sul tuo telefono e non vengono inviati a nessuno.

Dove va nell'app:
- al primo avvio, con il pulsante "Ho capito";
- sempre raggiungibile dal menu;
- riga breve in fondo a ogni scheda: "Verificato il [data] · Fonte: [link] · Controlla sempre con l'ente".

Vincoli che ne derivano:
- il profilo va salvato solo sul telefono, senza server (altrimenti l'ultima frase non è vera);
- prima di pubblicare l'app per altri, far rileggere il testo da un legale o da un'associazione (es. UICI).

### Icona precedente (A2, sostituita l'11/11/2026 – vedi v1.0.6)
Standard comune: C:\Appoggio-Claude\ICONE\ICONE-DELLE-MIE-APP.md (fascia da y=369, Barlow Black 132 px, base y=491).
- Disegno: persona stilizzata con braccia aperte dentro un cerchio, i piedi toccano il cerchio (tipo Uomo vitruviano). Simbolo di accessibilità, **senza** sedia a rotelle.
- Colori: sfondo #2E2A4F · fascia #B9B3D9 · scritta #221E3D · disegno #DCD8F0
- Scritta: DIRITTI (7 lettere, 425 px contro i 400 di PASTA; fuori dalla regola delle 5 lettere ma entra).
- Scartate: bilancia, scudo, documento, mano che sostiene (sembra una persona a gambe aperte), due persone (sa di "famiglia").
- Si potrà ripensare più avanti.

Disegno SVG 512×512 di A2 (prima di aggiungere la fascia):
```svg
<rect width="512" height="512" fill="#2E2A4F"/>
<circle cx="256" cy="212" r="150" fill="none" stroke="#DCD8F0" stroke-width="22"/>
<circle cx="256" cy="118" r="32" fill="#DCD8F0"/>
<path d="M136 128 Q200 196 256 186 Q312 196 376 128" fill="none" stroke="#DCD8F0" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M232 182 L280 182 L270 270 L242 270 Z" fill="#DCD8F0"/>
<path d="M248 262 L190 352 M264 262 L322 352" fill="none" stroke="#DCD8F0" stroke-width="26" stroke-linecap="round"/>
```

### Punto critico
L'aggiornamento: le regole cambiano spesso. Ogni scheda ha una fonte ufficiale e una data di verifica; serve un ricontrollo periodico (possibile attività programmata).

---

## 2. Ambiti e schede (Roma e Lazio)

### SANITÀ
- **S1 Esenzione ticket per cecità (C05)** ✅ – Ciechi assoluti o con residuo fino a 1/10: esenzione totale dalla specialistica dei LEA, senza limiti di reddito; tesserino a validità illimitata; la rilascia l'ASL.
- **S2 Esenzione per malattia rara** ✅ – Retinite pigmentosa: codice RFG110 (in caso di sospetto diagnostico, R99).
- **S3 Farmaci** ⚠️ – Circolare della Regione Lazio del 2005: il codice dei ciechi assoluti esonera dal ticket fisso, non dalla differenza sul prezzo di riferimento. La fascia C si paga. Da confermare in farmacia.
- **S4 Ausili (nomenclatore, DPCM 12/1/2017)** ✅ – Ne hanno diritto anche i privi della vista. Procedura ASL Roma 2:
  1. prescrizione di uno specialista pubblico (valida 90 giorni);
  2. sportello della UOS Assistenza Protesica del distretto;
  3. prima richiesta: documento d'identità, autocertificazione di residenza e privacy, verbale, preventivo;
  4. autorizzazione, ritiro dell'ausilio, collaudo entro 20 giorni.
  - Ausili per non vedenti: display braille 22.39.05.003, software OCR 22.30.21.003, sintesi vocale 22.39.07.003. Ceduti in comodato.
  - Fonte: aslroma2.it, sezione Assistenza Protesica e Integrativa.
- **S5 Riabilitazione visiva a Roma** ✅ (elenco del Polo Nazionale, aggiornato a settembre 2025) – Sant'Alessio (centro regionale per i ciechi, viale Odescalchi 38), Ospedale Sant'Eugenio (ASL Roma 2), Polo Nazionale al Gemelli, Umberto I, Tor Vergata, Oftalmico, Israelitico, Santa Lucia.
- **S6 Certificazioni** ✅
  - Da marzo 2026 la provincia di Roma è nella sperimentazione della riforma: si parte con il certificato medico introduttivo, la valutazione la fa l'INPS (Unità di Valutazione di Base). In tutta Italia dal 2027.
  - Esonero dalle revisioni: DM 2/8/2007, voce 11 "deficit totale della visione". Se si viene convocati comunque, bisogna presentarsi.
  - Aggravamento: con un nuovo certificato.
  - Ricorso: accertamento tecnico preventivo entro 6 mesi.
- **S7 Assistenza domiciliare** – L'ADI sanitaria è per non autosufficienti. Vedi anche S1 nell'ambito sociale.

### FISCO (guida Agenzia delle Entrate, febbraio 2026)
- **F1 Spese sanitarie** ✅ – Spese mediche generiche e di assistenza specifica deducibili per intero (basta la 104). Sussidi tecnici e informatici detraibili al 19% sull'intero importo, con certificato del medico curante e pagamento tracciabile. Spese specialistiche al 19% sopra 129,11 €.
- **F2 IVA al 4%** ✅ – Sussidi tecnici e informatici (copia del verbale; certificato del medico se manca il collegamento con la disabilità). Anche libri e giornali in braille o audio.
- **F3 Auto** ✅ – Non vedenti senza obbligo di adattamento:
  - detrazione del 19% su massimo 18.075,99 €, una volta ogni 4 anni;
  - IVA al 4% (fino a 2.000 cc benzina, 2.800 cc diesel, 150 kW elettrico);
  - esenzione dal bollo, da chiedere all'ufficio tributi della Regione;
  - ⚠️ **niente** esenzione dall'imposta di trascrizione per non vedenti e sordi.
- **F4 Cane guida** ✅ – 19% sul costo d'acquisto (ogni 4 anni); forfait per il mantenimento di 1.100 € l'anno dal 2025, solo al non vedente.
- **F5 Assistenza personale** ✅ – Contributi di colf o badante deducibili fino a 1.549,37 €. Detrazione del 19% su massimo 2.100 € con reddito fino a 40.000 €, solo con certificazione di non autosufficienza.
- **F6 Casa** ✅ – Bonus barriere al 75% finito il 31/12/2025. Nel 2026: recupero edilizio al 50% sull'abitazione principale (36% sulle altre), su massimo 96.000 €.
- **F7 Successioni e donazioni** ✅ – Con 104 grave, franchigia di 1.500.000 €.

### ENERGIA
- **E1 Cliente vulnerabile (104)** ✅ – Maggior tutela per la luce, servizio di tutela della vulnerabilità per il gas, con prezzi ARERA. Si chiede al fornitore autocertificando la 104. Non è per forza la tariffa più bassa: conviene confrontarla con il mercato libero.
- **E2 Bonus sociale economico** ✅ – ISEE fino a 9.796 € (2026). Automatico con la DSU. Luce 146 € l'anno per 1-2 persone. Dal 2026 anche −25% sulla TARI.
- **E3 Bonus disagio fisico** ✅ – Solo con apparecchiature elettromedicali salvavita; nessun limite ISEE; su domanda.

### TELEFONIA (delibera AGCOM 290/21/CONS, aggiornata 2023-2024)
- **T1 Fisso −50%** ✅ – Su offerte flat e semiflat e sola internet, per una sola connessione; upgrade gratuito.
- **T2 Mobile −50%** ✅ – Almeno un'offerta per fascia (meno di 50 GB, più di 50 GB, illimitata), per un solo numero.
- **T3 Fisso e mobile insieme** ✅ – Il limite "solo una delle due" vale per i ciechi parziali e per chi ha gravi limitazioni motorie, **non** per i ciechi totali.
- **T4 Come si chiede** ✅ – Modulo dell'operatore più certificato medico pubblico; risposta entro 30 giorni; nessun ISEE.
- **T5 Altri diritti** ✅ – Bolletta accessibile gratuita via email, canale di assistenza dedicato dalle 8 alle 24, priorità sui guasti, persona di fiducia che gestisce il contratto.

### MOBILITÀ
- **M1 CUDE** ✅ – Spetta ai non vedenti. A Roma: ZTL, stalli riservati, strisce blu gratis (solo con il titolare a bordo). Gestione online su Roma Servizi per la Mobilità con SPID o CIE. Dal 22/8/2026 in ZTL entra solo la targa principale.
- **M2 Carta Blu Trenitalia** ✅ – Per chi ha l'accompagnamento: l'accompagnatore viaggia gratis. Gratuita, dura 5 anni. ⚠️ Gratuità sull'Alta Velocità da verificare.
- **M3 Metrebus** ⚠️ (fonte CGIL) – Voucher sull'abbonamento annuale tramite il portale SIRGAT: 30% con ISEE fino a 25.000 €, 50% per i nuclei con 104 grave. Cotral: −50% per i ciechi assoluti (−70% fuori dalle ore di punta).
- **M4 STID (trasporto individuale)** ✅ – Delibera 129/2018: per residenti con 104 grave e contrassegno; dal 2026 il servizio è affidato ai taxi. (L'utente lo usa già.)
- **M5 Aerei** – Assistenza gratuita per regolamento europeo, da prenotare 48 ore prima.

### LAVORO E PREVIDENZA (circolare INPS 153/2025)
- **P1 Accompagnamento ciechi assoluti** ✅ – 1.064,98 € al mese, senza limiti di reddito, compatibile con il lavoro e con il ricovero.
- **P2 Pensione ciechi assoluti** ✅ – 368,46 € al mese per 13 mensilità; limite di reddito personale di 20.029,55 €.
- **P3 Lavoratori non vedenti** ✅ – 4 mesi di contributi figurativi per ogni anno lavorato, più l'aumento della quota contributiva. ⚠️ Requisiti ridotti per la vecchiaia da verificare.
- **P4 Permessi 104** ⚠️ – 3 giorni al mese oppure 2 ore al giorno (non ricontrollato).
- **P5 Collocamento mirato** ⚠️ – Centralinisti (L. 113/1985) e massofisioterapisti: da approfondire.

### CASA E SERVIZI SOCIALI
- **S1 SAISH** – Assistenza domiciliare di Roma Capitale; domanda al servizio sociale del Municipio.
- **S2 Disabilità gravissima** ✅ – Roma: assegno di cura di 800 € al mese o contributo al caregiver di 700 €. Per un non vedente serve la deprivazione sensoriale complessa (cecità **e** sordità): con la sola cecità non spetta.
- **S3 Caregiver familiare** ⚠️ – Legge regionale 5/2024: riconoscimento online; contributo una tantum (delibera 1317/2025) da verificare.
- **S4 Buoni servizio non autosufficienza** ⚠️ – Fino a 8.400 € per badante o centri; bando 2026 dal 15/4 al 14/5 (chiuso); serve la certificazione di non autosufficienza.

### TEMPO LIBERO E CULTURA
- **C1 Disability Card** ✅ – Richiesta su INPS con SPID, CIE o CNS, oppure tramite associazioni. Spetta a ciechi civili, a chi ha l'accompagnamento e a chi ha la 104 grave. Dà accesso alle convenzioni; disponibile in IT Wallet; vale per il voto assistito.
- **C2 Musei statali** ✅ – Gratis per la persona con disabilità e l'accompagnatore (DM 111/2016).
- **C3 Cinema e teatri** ⚠️ – Convenzioni private (per esempio UCI, The Space): rimandare all'elenco ufficiale.
- **C4 Libri** ✅ – Centro Nazionale del Libro Parlato UICI (gratuito, anche per chi non è iscritto); Biblioteca Italiana per i Ciechi "Regina Margherita" (braille).

### TECNOLOGIA E AUSILI DIGITALI
- **D1** Ausili ASL in comodato (vedi S4 Sanità) ✅
- **D2** IVA al 4% e detrazione del 19% sui sussidi informatici (vedi F1 e F2) ✅. ⚠️ Smartphone non citato espressamente: chiedere a un CAF.
- **D3** App gratuite ✅ – Be My Eyes / Be My AI, Seeing AI (in italiano), TalkBack (incluso in Android).
- **D4** Abbonamenti a intelligenze artificiali – Nessuno sconto per disabili trovato (Claude incluso); detraibilità non prevista: chiedere a un CAF.

---

## 3. Da fare
1. Chiarire le voci ⚠️ (S3, M2 sull'Alta Velocità, M3, P3–P5, Sociale S3–S4, C3, D2).
2. Definire le schermate della PWA (profilo, ambiti, scheda, ricerca).
3. Requisiti grafici: tema scuro e poco luminoso, niente giallo, pulsanti non grandi, numero di versione in alto a destra, icona nello stile comune con fascia DIRITTI e icona maskable nello splash.
4. Sistema di aggiornamento e verifica periodica delle schede.
5. Fase 2: estensione alle altre regioni.
6. **Idea futura – Viaggio in auto (CUDE):** per una città di destinazione, sapere se c'è una ZTL, se serve comunicare la targa prima di entrarci e dove sono gli stalli riservati ai disabili. Spunti da verificare: piattaforma nazionale delle targhe CUDE del Ministero dei Trasporti (comuni aderenti); stalli per disabili presenti su OpenStreetMap.

**Prossima sessione:** prima scrittura del codice della PWA (quando l'utente dice "crea codice").

## 4. Fonti principali
- ASL Roma 2 – Assistenza Protesica: aslroma2.it
- Agenzia delle Entrate – Guida agevolazioni persone con disabilità (febbraio 2026)
- AGCOM – Delibera 290/21/CONS (testo aggiornato)
- INPS – Circolare 153/2025; notizie sulla riforma della disabilità (marzo 2026)
- DM 2 agosto 2007 (esonero dalle revisioni)
- ARERA (bonus sociali, clienti vulnerabili)
- Polo Nazionale Ipovisione – polonazionaleipovisione.it/lazio
- Ministero della Cultura – DM 111/2016
- Roma Servizi per la Mobilità (CUDE)
- CGIL Roma e Lazio (Metrebus, giugno 2026)

---

## 5. Codice – versione v1.0.0 (11/11/2026)

**File** (ordine alfabetico): app.js · data.js · icon-192.png · icon-512.png · icon-maskable-512.png · index.html · manifest.json · style.css · sw.js

- **data.js**: ambiti e 43 schede nel formato fisso; ogni scheda ha `spetta(p)` che dà "Ti spetta", "Da valutare" o "Non ti spetta" in base al profilo. Per aggiornare una scheda si modifica solo questo file.
- **app.js**: schermate con indirizzi `#/` (ambiti), `#/ambito/<id>` (mostra sempre tutte le schede), `#/scheda/<codice>`, `#/profilo`, `#/avviso`. Profilo e avviso letto in localStorage (`diritti_profilo`, `diritti_avviso_letto`): niente server. Al cambio di schermata il focus va sul titolo (per TalkBack).
- **Schermate**: avviso al primo avvio ("Ho capito") → profilo → elenco ambiti con conteggio → schede dell'ambito (mostra solo quelle non escluse) → scheda con piede "Verificato il · Fonte · Controlla sempre con l'ente". Menu in basso: Ambiti, Profilo, Avviso.
- **Profilo**: chi usa l'app, tipo di disabilità, cecità civile, % invalidità, 104, accompagnamento, malattia rara, ISEE.
- **Colori interfaccia**: sfondo #17151F, riquadri #211E2E, testo #BEB9CF, accento lilla #9A91C4. Niente giallo, niente superfici chiare.
- **sw.js**: funziona offline; prima la rete, poi la copia salvata. A ogni nuova versione cambiare `CACHE` in sw.js e `VERSIONE` in app.js e in index.html.
- **Codici rinominati** per evitare doppioni: Casa e servizi sociali C1–C4 (prima S1–S4), Tempo libero e cultura L1–L4 (prima C1–C4).
- **Testi corretti rispetto agli appunti**: Disability Card senza la soglia del 67% (non verificata); bonus disagio fisico "su domanda" senza dettagli non verificati.
- **Collaudo**: provata in Chromium con schermo da telefono (Pixel 5): avviso, profilo dell'utente, ambiti, Telefonia, scheda T3; nessun errore; service worker registrato. Non ancora provata sul Realme.
- **Da fare**: pubblicazione su GitHub (repository da creare), prova sul Realme con TalkBack.

### v1.0.1 (11/11/2026) – richieste dell'utente
- Pagina iniziale: titolo "Agevolazioni spettanti"; su ogni ambito "N su M".
- Righe che vanno a capo più strette (interlinea 1.25 nei pulsanti-riga).
- In alto: logo (icona) con la scritta Diritti a sinistra, versione a destra; toccando il logo si torna alla home.
- Menu in basso: Indietro (spostato qui dall'alto) · Home · Profilo · Avviso.
- I collegamenti a style.css, data.js e app.js in index.html hanno `?v=<versione>` per evitare che il browser usi file vecchi: aggiornarli a ogni versione.

### v1.0.2 (11/11/2026)
- Etichette di colore diverso: Ti spetta verde (#8FC29C su #1F3326), Da valutare blu (#93ABD8 su #1E2638), Da verificare terracotta (#D39A7A su #3A2620), Non ti spetta rosa scuro (#B8838F su #33202A). "(da verificare)" negli elenchi in terracotta.
- Tasto Indietro senza freccia.
- Sotto il titolo della home: "Regione: Lazio". Idea futura: scelta della regione nel profilo, con l'elenco delle regioni.

### v1.0.3 (11/11/2026)
- Profilo: i campi specifici compaiono solo se è spuntata la disabilità corrispondente. Visiva → Cecità civile; Uditiva → Sordità civile riconosciuta (`sordo`); Motoria → Deambulazione gravemente ridotta (`deamb`). Se la disabilità viene tolta, il campo si azzera al salvataggio.
- Ogni ambito mostra sempre tutte le schede, senza pulsante "Mostra anche…".
- Nuovi colori delle etichette: Ti spetta verde (#7CC48A su #1B3320), Da valutare viola (#C3A2EC su #30244A), Da verificare arancio (#E09A5C su #3D2814), Non ti spetta rosso (#E87C7C su #401C1E).
- data.js: CUDE (M1) usa `deamb`; disabilità gravissima (C2) usa `sordo`.

### Descrizione per GitHub
PWA accessibile e gratuita per scoprire le agevolazioni per persone con disabilità e le loro famiglie nel Lazio: sanità, fisco, energia, telefonia, mobilità, lavoro, servizi sociali, cultura e tecnologia.

### v1.0.4 (11/11/2026)
- F6 Casa: tolto il riferimento al bonus 75% del 2025.
- Titolo della home: "I tuoi diritti".
- Avviso: per proseguire bisogna spuntare "Ho letto l'avviso e lo accetto" e premere "Accetto". Si salva data e ora dell'accettazione (chiave `diritti_avviso` = {data, ver}); nella pagina Avviso compare "Avviso letto e accettato il …". Se in futuro cambia il testo, aumentare `AVVISO_VER` in app.js: l'accettazione verrà richiesta di nuovo. La vecchia chiave `diritti_avviso_letto` non vale più (chi aveva la v1.0.3 deve accettare di nuovo).
- Limite: il registro resta solo sul telefono (coerente con "i dati restano sul telefono"); non è una prova verso terzi e si perde cancellando i dati dell'app.

### v1.0.5 (11/11/2026)
- Titolo della home di nuovo "Agevolazioni spettanti".
- Corretto errore: dopo "Accetto" l'app restava sull'avviso se l'indirizzo era già `#/` (nessun cambio di indirizzo, quindi nessun aggiornamento). Ora dopo "Accetto" si va sempre alla home; se il profilo manca, la home invita a compilarlo. Provati 5 casi di avvio diversi.

### v1.0.6 (11/11/2026) – nuova icona "E1 diritta"
- Disegno: D grande e diritta (per Diritti e Disabilità), occhiello aperto, con una riga sottile scura a metà spessore che forma una seconda D interna (ispirazione: stile moderno tipo logo Formula 1, ma disegno originale). La D poggia sulla fascia con 2 px di stacco.
- **Due soli colori**: scuro #2E2A4F (sfondo, scritta, riga interna) · chiaro #CFC9EA (fascia, D).
- Scritta DIRITTI a **124 px** (eccezione allo standard di 132 px: a 132 tocca gli angoli; a 124 è larga 399 px, come PASTA). Base **y=489** (alzata di 2 px in v1.0.7, su richiesta), fascia da y=369.
- Maskable al 90% con margini: sopra scuro, sotto chiaro.
- Scartate: D1 (D tagliata), D3 (sembra la lettera "Đ"), D4, E1 obliqua, E2, E3, E4.
- Icone con `?v=<versione>` in manifest.json e index.html per forzare l'aggiornamento. Su Android l'icona dell'app installata può metterci qualche giorno ad aggiornarsi (lo decide Chrome); per averla subito: disinstallare e reinstallare la PWA.

SVG del disegno (512×512, prima della fascia):
```svg
<rect width="512" height="512" fill="#2E2A4F"/>
<g transform="translate(-11 0)">
<path d="M130 60 H250 A153.5 153.5 0 0 1 250 367 H130 Z M194 124 H250 A89.5 89.5 0 0 1 250 303 H194 Z" fill="#CFC9EA" fill-rule="evenodd"/>
<path d="M162 92 H250 A121.5 121.5 0 0 1 250 335 H162 Z" fill="none" stroke="#2E2A4F" stroke-width="11" stroke-linejoin="round"/>
</g>
```

### v1.0.7 (11/11/2026)
- Scritta DIRITTI nell'icona alzata di 2 px (base y=489).
