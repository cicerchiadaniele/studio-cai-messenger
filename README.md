# Studio CAI – Portale condomini (Segnalazioni) v2.0

Sportello digitale per le segnalazioni condominiali. Gli utenti compilano un modulo, ricevono un ticket univoco e la richiesta viene inoltrata via webhook al gestionale dello Studio.

Versione 2.0 del 22/09/2026 (numerazione ripartita dopo la 9.6): vedi `CHANGELOG_v2.0.md`.

## Tipi di intervento (categoria "Interventi di Manutenzione")

Antennista, Ascensore, Cancelli Elettrici, Contabilizzazione, Disinfestazioni/Derattizzazioni, Edilizia, Elettricista, Fabbro, Fognature, Giardinaggio, Idraulico, Impianto di Riscaldamento, Montascale, Pulizia, Videosorveglianza.

Stessi valori del Portale interventi interno 2.0 e delle colonne della base Airtable "FORNITORI CONDOMINI": se si aggiunge un tipo, va aggiunto in tutti e tre.

## Novità principali v9.0

- **Sanificazione input** sui campi Condominio, Scala, Interno, Nome e Cognome, Telefono: i simboli non ammessi vengono filtrati automaticamente in fase di digitazione.
- **Data di aggiornamento fissa** nel footer (non più dinamica): mostra la data della release.
- **UI ridisegnata**: nuova tipografia (Fraunces + Manrope), hero section, stepping visivo del form, sfondo a texture leggera, ombre e micro-animazioni più raffinate.
- **Drag & drop** sul caricamento file.
- **Feedback potenziato**: card di successo con ticket selezionabile, limite caratteri nel messaggio con contatore live.

## Stack

- React 18 + CRA
- Tailwind CSS 3
- Framer Motion
- Lucide React

## Sviluppo

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

Output in `build/`. Deploy su qualsiasi hosting statico (Netlify, Vercel, Aruba, ecc.).

## Configurazione

Il webhook Make.com è impostato all'avvio come valore di default, sovrascrivibile via `localStorage` (chiave `cm_webhook`). Stesso meccanismo per `cm_brand`, `cm_logo`, `cm_primary`.
