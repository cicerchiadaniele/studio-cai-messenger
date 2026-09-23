# Portale condomini (App Segnalazioni) – Versione 2.1

**Data release:** 23 Settembre 2026 · **Base:** v2.0
**Tipo:** correzione per iPhone e iPad

---

## Campi su iPhone e iPad

In `src/index.css` è stato aggiunto un blocco che si applica solo a Safari su
iOS/iPadOS (`@supports (-webkit-touch-callout: none)`):

- testo dei campi (input, tendine, messaggio) a 16px, così Safari non
  ingrandisce la pagina quando si tocca un campo;
- eventuali campi data/ora allineati a sinistra e contenuti nella larghezza
  del riquadro.

Su computer e Android la resa è invariata.

## Numerazione

Versione **2.1**, data nel piè di pagina **23/09/2026** (costanti
`APP_VERSION` e `BUILD_DATE_LABEL` in `src/App.js`). Il valore `appVersion`
inviato a Make diventa "2.1"; nessuno scenario lo usa per instradare.

---

## Invariato rispetto alla 2.0

Campi, tipi di intervento, webhook, formato ticket, chiavi `localStorage` e
identità visiva.

File modificati rispetto alla 2.0: `src/index.css` (blocco iOS), `src/App.js`
(solo le due costanti di versione e data). Aggiornati anche `package.json`
(versione 2.1.0), `README.md`, `public/index.html` (riscritto dal modello di
casa: titolo, descrizione, icone e font) e questo changelog.

La storia della 2.0 resta in `CHANGELOG_v2.0.md`.

---

**Nota tecnica:** nessuna sequenza di escape `\uXXXX` nel sorgente.
`src/App.js` deve pesare esattamente **53.489 byte** (stessa lunghezza della
2.0: cambiano solo le cifre di versione e data).

**Versione:** 2.1 · **Data:** 23/09/2026
