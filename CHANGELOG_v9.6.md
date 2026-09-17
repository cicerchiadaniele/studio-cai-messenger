# Webapp Studio CAI – Versione 9.6

**Data release:** 17 Settembre 2026 · **Base:** v9.5
**Tipo:** correzione grafica

---

## Intestazione sovrapposta al contenuto

Scorrendo la pagina, il titolo e i testi del modulo passavano sopra l'intestazione
fissa (logo e "Studio CAI"), che risultava sovrapposta e illeggibile.

Causa: l'intestazione aveva le classi `relative z-10 sticky` e il contenuto sotto
aveva lo stesso livello `z-10`; a parità di livello vince l'elemento che viene
dopo nella pagina, cioè il contenuto.

| Elemento | Prima | Ora |
|---|---|---|
| Classi intestazione | `relative z-10 sticky top-0 bg-white/75` | `sticky top-0 z-40 bg-white/95` |
| Livello | uguale al contenuto | sopra al contenuto |
| Sfondo | bianco al 75% | bianco al 95%, il testo sotto non traspare |

La stessa correzione è applicata al Portale interventi interno (v1.0).

---

## Invariato rispetto alla v9.5

Tutte le funzioni, i campi, il webhook, il formato ticket e l'identità visiva.

File modificato rispetto alla v9.5: `src/App.js` (versione, data e classi
dell'intestazione).

---

**Nota tecnica:** nessuna sequenza di escape `\uXXXX` nel sorgente.
`src/App.js` deve pesare esattamente **53.420 byte**.

**Versione:** 9.6 · **Data:** 17/09/2026
