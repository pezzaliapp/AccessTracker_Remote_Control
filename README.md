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
