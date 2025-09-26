# Studio CAI – Segnalazioni (Web App)
App React pronta per Vercel.

## Deploy rapido su Vercel
1. Vai su vercel.com → Add New → Project → Import Project → Upload.
2. Carica questo ZIP.
3. Framework Preset: **Create React App**.
4. Build Command: `npm run build` (automatico).
5. Output Directory: `build` (automatico).
6. Deploy.

## Configurazione
- Webhook Make preimpostato in `src/App.js` (variabile `webhook`).
- Logo in `public/logo.jpg`.
- Brand: `Studio CAI`.

## Test
Apri l'URL generato da Vercel e invia una segnalazione.
Dovresti ricevere:
- Email HTML allo studio con i dettagli.
- Email di conferma al condomino.
- Riga su Google Sheets.
