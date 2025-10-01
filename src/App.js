import React from "react";

export default function App() {
  const subCategorieManut = [
    "Antennista","Ascensore","Cancelli Elettrici","Disinfestazioni/Derattizzazioni",
    "Edilizia","Elettricista","Fabbro","Giardinaggio","Idraulico",
    "Impianto di Riscaldamento","Montascale"
  ].sort();

  return (
    <div style={{padding:'20px', fontFamily:'sans-serif'}}>
      <h1>Studio CAI – WebApp v7.2</h1>
      <label>Sottocategorie manutenzione:</label>
      <select>
        {subCategorieManut.map((s) => (<option key={s}>{s}</option>))}
      </select>
      <footer style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginTop:'20px'}}>
        <div>© 2025 Studio CAI. Tutti i diritti riservati.</div>
        <div>v7.2 – Aggiornato al 01/10/2025</div>
      </footer>
    </div>
  );
}
