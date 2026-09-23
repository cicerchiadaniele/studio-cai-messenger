# Portale condomini (App Segnalazioni) – Versione 2.0

**Data release:** 22 Settembre 2026 · **Base:** v9.6
**Tipo:** nuove tipologie di intervento e nuova numerazione

---

## Numerazione

Da questa versione il portale condomini riparte da **2.0** (la precedente era
la 9.6). Il numero compare in intestazione e nel piè di pagina e viene inviato
a Make nel campo `appVersion`; nessuno scenario lo usa per instradare.

## Nuove tipologie di intervento

Nella tendina "Tipo di intervento" (categoria "Interventi di Manutenzione")
sono state aggiunte, in ordine alfabetico con le altre:

- Contabilizzazione (calore e acqua)
- Fognature
- Pulizia
- Videosorveglianza

Elenco completo (15): Antennista, Ascensore, Cancelli Elettrici,
Contabilizzazione, Disinfestazioni/Derattizzazioni, Edilizia, Elettricista,
Fabbro, Fognature, Giardinaggio, Idraulico, Impianto di Riscaldamento,
Montascale, Pulizia, Videosorveglianza.

Stessi valori del Portale interventi interno 2.0 e delle colonne della base
Airtable "FORNITORI CONDOMINI". Lo scenario Make "Studio CAI – WebApp
Segnalazioni" non è stato modificato: i nuovi tipi finiscono sul foglio e
vengono segnalati allo studio (email e Telegram), senza inoltro a ditte.
Foto e documenti restano facoltativi come per gli altri tipi.

---

## Invariato rispetto alla v9.6

Tutti gli altri campi, il webhook, il formato ticket e l'identità visiva.

File modificato rispetto alla v9.6: `src/App.js` (versione, data, elenco dei
tipi di intervento). Aggiornati anche `package.json` (versione 2.0.0),
`README.md` e questo changelog.

---

**Nota tecnica:** nessuna sequenza di escape `\uXXXX` nel sorgente.
`src/App.js` deve pesare esattamente **53.489 byte**.

**Versione:** 2.0 · **Data:** 22/09/2026
