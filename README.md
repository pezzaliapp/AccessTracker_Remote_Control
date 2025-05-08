# AccessTracker – Remote Control PWA

**AccessTracker** è una Progressive‑Web‑App (PWA) che permette di:

* **Tracciare** gli accessi (pagina *tracker.html*)
* **Abilitare/disabilitare** il tracciamento da remoto (pagina *controller.html*)
* **Consultare** log e statistiche in tempo reale salvate su Firebase (*accessi\_dashboard\_completo.html* & *accessi\_grafici\_completo.html*)

L’interfaccia è pensata per essere chiara e responsiva sia su desktop che su mobile. Tutti i dati vengono salvati su **Firestore**; l’auth è gestita in modo anonimo.

> **Live demo**
> [https://www.alessandropezzali.it/AccessTracker\_Remote\_Control/](https://www.alessandropezzali.it/AccessTracker_Remote_Control/)

---

## Funzionalità principali

| Pagina                            | Scopo                            | Note                                                                          |
| --------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `index.html`                      | Home & modalità                  | Toggle tema chiaro/scuro + link rapido                                        |
| `tracker.html`                    | Rileva accessi                   | Esegue login anonimo, controlla stato remoto, registra l’accesso              |
| `controller.html`                 | Abilita / disabilita tracker     | Mostra stato attuale + cronologia connessione                                 |
| `accessi_dashboard_completo.html` | Log completo + esporta CSV       | Include filtro dispositivi e ricerca UA; **timestamp** formattato in italiano |
| `accessi_grafici_completo.html`   | Grafici giornalieri / per device | Aggiornati live da Firestore                                                  |

### PWA

* Installabile su desktop/mobile (manifest + service‑worker)
* Cache controllata da `service-worker.js` (versione `v2`)
* Tema automatico (rispetta `prefers-color-scheme`) con toggle manuale

---

## Come configurare

### 1 – Prerequisiti

* Un progetto Firebase **Spark** (gratuito) con Firestore abilitato
* Nodo `accessi` (collezione) e documento `controllo/stato` già creati (il codice li crea se mancano)
* **Authentication → Metodo di accesso → Anonymous** **abilitato**
* Dominî autorizzati (Authentication → Impostazioni → *Domini autorizzati*):

  * `localhost` (per sviluppo)
  * il tuo dominio (es: `www.alessandropezzali.it`)

### 2 – Inserire le proprie chiavi

Nel blocco `firebaseConfig` di **tutte** le pagine `*.html` e in `controller.js` / `tracker.js` sostituire con i valori presi da **Impostazioni progetto → Generali**.

```js
const firebaseConfig = {
  apiKey: "AAA...",            // la tua chiave
  authDomain: "project-id.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "...",
  appId: "1:..."
};
```

> 🔒 **Non** committare mai chiavi o ID reali su repo pubblici.

### 3 – Regole Firestore

Per un prototipo puoi usare:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null; // solo utenti autenticati anonimamente
    }
  }
}
```

> In produzione restringi le scritture ai soli documenti necessari.

---

## Esecuzione in locale

```bash
# clona il progetto
$ git clone https://github.com/<tuo-user>/AccessTracker_Remote_Control.git
$ cd AccessTracker_Remote_Control

# installa un server statico se non l’hai già
$ npm install -g serve

# avvia in locale
$ serve -l 5500
# oppure, con Python 3
$ python -m http.server 5500
```

Apri [http://localhost:5500/index.html](http://localhost:5500/index.html) – il dominio `localhost` deve essere già nei domini autorizzati su Firebase.

---

## Aggiornare il service‑worker

Modifica il valore della costante `CACHE_NAME` in `service-worker.js` (es. `v3`) ogni volta che cambi asset critici, così il browser invalida la cache precedente.

```js
const CACHE_NAME = 'accesstracker-pwa-v3';
```

---

## Esporta CSV con timestamp locale

Dal log completo puoi esportare un file `accessi.csv` in cui il campo **timestamp** è già formattato con `toLocaleString('it‑IT')`.

---

## Struttura del progetto

```
AccessTracker_Remote_Control/
├── index.html
├── tracker.html
├── controller.html
├── accessi_dashboard_completo.html
├── accessi_grafici_completo.html
├── manifest.json
├── service-worker.js
├── icon/ …
└── js/
    ├── controller.js
    └── tracker.js
```

---

## Licenza

Questo progetto è distribuito con licenza **MIT**. Vedi `LICENSE` per i dettagli.
