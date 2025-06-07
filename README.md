Perfetto, ecco il file README.md già pronto da copiare e incollare così com’è nella root della repository:

⸻


# 🛡️ AccessTracker – Remote Control PWA

**AccessTracker** è una **Progressive Web App (PWA)** con un sistema di monitoraggio etico per:
- Rilevare accessi in tempo reale
- Controllare da remoto lo stato del tracker
- Proteggere da attacchi USB simulati (es. Rubber Ducky, Flipper Zero)

📡 Include anche script headless per macOS e Windows (in sviluppo) che monitorano attivazioni sospette della tastiera e inviano un alert.

🌐 **Demo live:**  
[https://www.alessandropezzali.it/AccessTracker_Remote_Control](https://www.alessandropezzali.it/AccessTracker_Remote_Control)

---

## 🚀 Funzionalità principali

| Pagina                          | Funzione                           | Descrizione                                                              |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------------------------ |
| `index.html`                   | Homepage                           | Selettore tema, accesso rapido alle sezioni                             |
| `tracker.html`                 | Rilevamento accessi                | Rileva accessi se attivo, registra userAgent e timestamp                 |
| `controller.html`              | Controllo remoto                   | Attiva/disattiva il tracciamento, cronometro di sessione                |
| `accessi_dashboard_completo.html` | Log completo + CSV               | Lista filtrabile, esportazione `accessi.csv`, timestamp in italiano     |
| `accessi_grafici_completo.html`   | Grafici in tempo reale           | Dashboard Firestore live: giornalieri e per dispositivo                 |
| `AccessTracker_mac.py`         | Script anti-RubberDucky (macOS)    | Headless, eseguito da Terminale, log su file, alert su Firebase         |
| `AccessTracker_win.py`         | Script anti-RubberDucky (Windows)  | (in sviluppo, compatibile con la versione macOS)                         |

---

## 🔐 Sicurezza e tracciamento etico

✅ Nessuna raccolta di dati personali  
✅ Accessi anonimi su Firebase  
✅ Il tracciamento può essere **attivato o disattivato da remoto**

---

## 🛠️ Setup rapido

### 1. Requisiti Firebase

- Progetto Firebase (Spark gratuito)
- Firestore abilitato
- Autenticazione anonima abilitata
- Dominî autorizzati:
  - `localhost`
  - il tuo dominio (es: `www.alessandropezzali.it`)

### 2. Configurazione Firebase

Sostituisci le chiavi `firebaseConfig` in **tutti** i file `.html` e nei file JS:

```js
const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_PROJECT_ID.firebaseapp.com",
  projectId: "TUO_PROJECT_ID",
  storageBucket: "TUO_PROJECT_ID.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

3. Regole Firestore di base

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}

📌 In produzione, imposta regole più restrittive.

⸻

💻 Esecuzione in locale

git clone https://github.com/<tuo-user>/AccessTracker_Remote_Control.git
cd AccessTracker_Remote_Control

# Avvia server statico (Node.js)
npm install -g serve
serve -l 5500

# Oppure con Python
python3 -m http.server 5500

Apri nel browser:
📍 http://localhost:5500/index.html

⸻

🧪 Script anti-attacco (macOS)

Esegui il file headless AccessTracker_mac.py:

python3 AccessTracker_mac.py

✔️ Controlla ogni 5 secondi se la tastiera è attiva
📄 Scrive un log locale access_tracker_log.txt
📡 Invia l’evento al nodo accessi di Firestore

🔜 La versione AccessTracker_win.py per Windows sarà disponibile a breve.

⸻

📦 Struttura della repository

AccessTracker_Remote_Control/
├── index.html
├── tracker.html
├── controller.html
├── accessi_dashboard_completo.html
├── accessi_grafici_completo.html
├── AccessTracker_mac.py              # Script difensivo macOS
├── AccessTracker_win.py              # Script difensivo Windows (coming soon)
├── manifest.json
├── service-worker.js
├── icon/
│   ├── accesstracker-192.png
│   └── accesstracker-512.png
└── js/
    ├── controller.js
    └── tracker.js


⸻

📊 Esporta CSV in formato locale

Dalla dashboard accessi_dashboard_completo.html puoi esportare un file CSV compatibile con Excel. Il campo timestamp è già formattato con toLocaleString('it-IT').

⸻

🔁 Aggiorna cache PWA

Modifica il nome della cache nel file service-worker.js quando aggiorni asset critici:

const CACHE_NAME = 'accesstracker-v3';


⸻

📄 Licenza

Distribuito con licenza MIT.
Vedi file LICENSE per tutti i dettagli.

⸻

✉️ Contatti o supporto:
	•	www.pezzaliapp.com
	•	GitHub Issues

---
