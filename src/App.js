import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, CheckCircle2, AlertCircle, Building2, Mail, Phone, Shield, Clock, UploadCloud, X, Loader2, ChevronDown } from "lucide-react";

// Utility
const cn = (...cls) => cls.filter(Boolean).join(" ");
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k, fallback) => {
  try { const v = JSON.parse(localStorage.getItem(k) || ""); return v ?? fallback; } catch { return fallback; }
};

export default function CondoMessenger() {
  // Brand & Make
  const [brandName, setBrandName] = useState(load("cm_brand", "Studio CAI"));
  const [logoUrl, setLogoUrl] = useState(load("cm_logo", "/logo.jpg"));
  const [primary, setPrimary] = useState(load("cm_primary", "#16a34a"));
  const [webhook, setWebhook] = useState(load("cm_webhook", "https://hook.eu1.make.com/b2z7y28x5nyinnq0i5h6o9l14166paf3"));

  // UI state
  const [tab, setTab] = useState("chat");

  // Form state
  const [form, setForm] = useState({
    condominio: "",
    scala: "",
    interno: "",
    nome: "",
    email: "",
    telefono: "",
    categoria: "Amministrativa",
    priorita: "Normale",
    messaggio: "",
    consenso: false,
  });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  React.useEffect(() => {
    if (!cooldown) return;
    const t = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const cssVars = useMemo(() => ({ "--brand": primary }), [primary]);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const errs = [];
    if (!form.condominio) errs.push("Indica il condominio");
    if (!form.nome) errs.push("Inserisci il tuo nome");
    if (!form.email) errs.push("Inserisci la tua email");
    if (!form.messaggio || form.messaggio.trim().length < 5) errs.push("Messaggio troppo breve");
    if (!form.consenso) errs.push("Accetta l'informativa privacy");
    return errs;
  };

  const submit = async () => {
    if (cooldown) return;
    const errs = validate();
    if (errs.length) {
      setResult({ ok: false, error: errs.join(" • ") });
      return;
    }
    setSending(true);
    setResult(null);
    const ticket = `CM-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;

    try {
      if (webhook) {
        const fd = new FormData();
        Object.entries({ ...form, ticket, timestamp: new Date().toISOString() }).forEach(([k, v]) => fd.append(k, String(v)));
        const res = await fetch(webhook, { method: "POST", body: fd });
        if (!res.ok) throw new Error(`Errore invio: ${res.status}`);
      } else {
        await new Promise((r) => setTimeout(r, 800));
      }
      setResult({ ok: true, ticket });
      setCooldown(8);
      setForm((s) => ({ ...s, categoria: "Amministrativa", priorita: "Normale", messaggio: "", consenso: s.consenso }));
    } catch (e) {
      setResult({ ok: false, error: e.message || "Invio non riuscito" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900" style={cssVars}>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl overflow-hidden bg-[var(--brand)]/10 flex items-center justify-center">
            {logoUrl ? (<img src={logoUrl} alt="logo" className="w-full h-full object-cover"/>) : (<Building2 className="w-5 h-5" />)}
          </div>
          <div className="flex-1">
            <div className="font-semibold leading-5">{brandName}</div>
            <div className="text-xs text-neutral-500">Sportello segnalazioni condominiali</div>
          </div>
          <button onClick={() => setTab("chat")} className="px-3 py-1.5 text-sm rounded-full border bg-[var(--brand)] text-white">Segnalazione</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === "chat" && (
          <motion.div layout className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center"><Shield className="w-4 h-4"/></div>
              <h2 className="font-semibold text-lg">Invia segnalazione</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextField label="Condominio" placeholder="Es. Via Taranto 68" value={form.condominio} onChange={(v)=>update("condominio",v)} required />
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Scala" placeholder="Es. A" value={form.scala} onChange={(v)=>update("scala",v)} />
                <TextField label="Interno" placeholder="Es. 12" value={form.interno} onChange={(v)=>update("interno",v)} />
              </div>
              <TextField label="Nome e Cognome" placeholder="Il tuo nome" value={form.nome} onChange={(v)=>update("nome",v)} required />
              <TextField label="Email" type="email" placeholder="nome@email.it" value={form.email} onChange={(v)=>update("email",v)} icon={<Mail className="w-4 h-4"/>} required />
              <TextField label="Telefono" placeholder="Es. 333 123 4567" value={form.telefono} onChange={(v)=>update("telefono",v)} icon={<Phone className="w-4 h-4"/>} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <SelectField label="Categoria" value={form.categoria} onChange={(v)=>update("categoria",v)} options={["Amministrativa","Tecnica","Contabile","Portineria","Altro"]} />
              <SelectField label="Priorità" value={form.priorita} onChange={(v)=>update("priorita",v)} options={["Normale","Urgente","Emergenza"]} />
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium">Messaggio</label>
              <textarea
                className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] min-h-[120px]"
                placeholder="Scrivi il messaggio..."
                value={form.messaggio}
                onChange={(e)=>update("messaggio", e.target.value)}
              />
            </div>

            <div className="mt-4 flex items-start gap-2">
              <input id="cons" type="checkbox" checked={form.consenso} onChange={(e)=>update("consenso", e.target.checked)} className="mt-1"/>
              <label htmlFor="cons" className="text-sm text-neutral-700">Ho letto e accetto l’<a className="underline" href="#">informativa privacy</a>.</label>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                disabled={sending || cooldown>0}
                onClick={submit}
                className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white", sending||cooldown?"bg-neutral-400":"bg-[var(--brand)] hover:opacity-90")}
              >
                {sending ? (<><Loader2 className="w-4 h-4 animate-spin"/> Invio…</>) : (<><Send className="w-4 h-4"/> Invia segnalazione</>)}
              </button>
              {cooldown>0 && <span className="text-xs text-neutral-500">Puoi inviare un’altra segnalazione tra {cooldown}s</span>}
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={cn("mt-4 rounded-xl border p-3 text-sm flex items-start gap-2", result.ok?"bg-green-50 border-green-200":"bg-red-50 border-red-200")}
                >
                  {result.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5"/> : <AlertCircle className="w-4 h-4 mt-0.5"/>}
                  <div>
                    {result.ok ? (
                      <div>
                        <div className="font-medium">Segnalazione inviata correttamente.</div>
                        {result.ticket && <div className="text-xs text-neutral-600">Numero ticket: <span className="font-mono font-semibold">{result.ticket}</span></div>}
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">Invio non riuscito</div>
                        <div className="text-xs text-neutral-600">{result.error}</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-4 pb-8 text-xs text-neutral-500">
        <div>© {new Date().getFullYear()} {brandName}. Tutti i diritti riservati.</div>
      </footer>

      <style>{`:root { --brand: ${'${primary}'}; }`}</style>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, type = "text", icon, required }) {
  return (
    <div>
      <label className="text-sm font-medium flex items-center gap-2">{icon}{label}{required && <span className="text-red-600">*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options = [] }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1 relative">
        <select
          value={value}
          onChange={(e)=>onChange(e.target.value)}
          className="appearance-none w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] bg-white"
        >
          {options.map((o)=> <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}
