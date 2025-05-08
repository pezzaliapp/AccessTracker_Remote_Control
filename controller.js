// → Inserisci qui la tua vera API Key dal pannello Generali → I tuoi app
const firebaseConfig = {
  apiKey: "AIzaSyCm9lIf2l8FQHiIUoSbtOmLRQNxtgCJd6Q",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

firebase.initializeApp(firebaseConfig);

// Funzione di debug in pagina
function mostraMsg(txt, emoji="") {
  const p = document.createElement("p");
  p.textContent = `${emoji} ${txt}`;
  p.style.margin = "8px 0";
  document.body.appendChild(p);
}

// Selettore bottone
const btn = document.getElementById("toggleTracker");
let statoAttuale = false;

mostraMsg("🕒 Inizializzo Firebase…");

// Login anonimo
firebase.auth().signInAnonymously()
  .then(() => {
    mostraMsg("🔐 Login anonimo OK");
    const db = firebase.firestore();
    const ref = db.collection("controllo").doc("stato");

    // Ascolta il documento in real-time
    ref.onSnapshot(doc => {
      if (!doc.exists) {
        mostraMsg("⚠ Documento 'stato' non trovato");
        btn.textContent = "⚠️ Errore";
        return;
      }
      statoAttuale = doc.data().attivo === true;
      btn.textContent = statoAttuale ? "🛑 Disattiva Tracking" : "✅ Attiva Tracking";
      mostraMsg("📡 Stato remoto = " + statoAttuale);
    });

    // Al click del pulsante
    btn.onclick = () => {
      const nuovo = !statoAttuale;
      ref.set({ attivo: nuovo })
        .then(() => mostraMsg(`✍️ Impostato attivo = ${nuovo}`))
        .catch(e => mostraMsg("❌ Errore update: " + e.message));
    };
  })
  .catch(err => {
    mostraMsg("❌ Errore login anonimo: " + err.code, "❌");
    console.error(err);
  });
