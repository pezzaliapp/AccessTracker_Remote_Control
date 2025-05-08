// --- CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCm9I1f2I8FQHiIUoSbtOmLRQNxtgCJd60",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};
firebase.initializeApp(firebaseConfig);
// -------------------------

// Elementi UI
const btn        = document.getElementById('toggleBtn');
const elTime     = document.getElementById('currentTime');
const elSince    = document.getElementById('connectedSince');
const elLast     = document.getElementById('lastToggle');
const elStandby  = document.getElementById('standbyTime');

// Stato interno
let lastToggleTime = null;
let currentState   = null;
const pageLoadTime = new Date();

// Utility: ms → “HH:mm:ss”
function msToHMS(ms) {
  const s = Math.floor(ms/1000)%60;
  const m = Math.floor(ms/60000)%60;
  const h = Math.floor(ms/3600000);
  return `${h}h ${m}m ${s}s`;
}

// Aggiorna orologio e timer
function updateTimers() {
  const now = new Date();
  // ora corrente
  elTime.textContent = `🕒 Ora: ${now.toLocaleTimeString()}`;
  // connesso da
  const connMs = now - pageLoadTime;
  elSince.textContent = `📡 Connesso da: ${msToHMS(connMs)}`;

  if (lastToggleTime) {
    elLast.textContent = `🔁 Ultima modifica: ${lastToggleTime.toLocaleString()}`;
    // se disattivo, calcola standby da lastToggle
    if (currentState === false) {
      const offMs = now - lastToggleTime;
      elStandby.textContent = `💤 Standby: ${msToHMS(offMs)}`;
    } else {
      elStandby.textContent = `💤 Standby: —`;
    }
  }
}

// Autenticazione anonima e listener Firestore
firebase.auth().signInAnonymously()
  .then(() => {
    const db = firebase.firestore();
    const statoRef = db.collection("controllo").doc("stato");

    // appena connessi, abilita il pulsante
    btn.disabled = false;

    // ascolto in real-time
    statoRef.onSnapshot(doc => {
      if (!doc.exists) {
        console.warn("Doc 'stato' non trovato");
        return;
      }
      const newState = !!doc.data().attivo;
      // se cambia lo stato, registro la data/ora
      if (newState !== currentState) {
        lastToggleTime = new Date();
      }
      currentState = newState;

      // aggiorno label del pulsante
      btn.textContent = currentState
        ? "🔴 Disattiva Tracking"
        : "✅ Attiva Tracking";

      // aggiorna subito i timer
      updateTimers();
    });
  })
  .catch(err => {
    console.error("Errore login anonimo:", err);
    btn.textContent = "❌ Errore Firebase";
  });

// click sul pulsante per cambiare stato
btn.addEventListener('click', () => {
  btn.disabled = true;
  const db = firebase.firestore();
  db.collection("controllo").doc("stato")
    .set({ attivo: !currentState })
    .finally(() => btn.disabled = false);
});

// aggiorna orologio e timer ogni secondo
setInterval(updateTimers, 1000);
