// → Copia qui la tua API key esatta dal pannello Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCm9lIf2l8FQHiIUoSbtOmLRQNxtgCJd6Q",      // ← Sostituisci con la tua!
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

// Aiuta a scrivere log in pagina
function log(msg, emoji = "") {
  const p = document.createElement("p");
  p.textContent = `${emoji} ${msg}`;
  p.style.margin = "8px 0";
  document.getElementById("log").appendChild(p);
  console.log(msg);
}

log("🕒 Inizializzo Firebase…");

// Login anonimo
firebase.auth().signInAnonymously()
  .then(() => {
    log("🔐 Login anonimo OK");
    const db = firebase.firestore();
    const statoRef = db.collection("controllo").doc("stato");

    // Ascolta in tempo reale il documento stato
    statoRef.onSnapshot(doc => {
      if (!doc.exists) {
        log("⚠ Documento 'controllo/stato' non trovato");
        return;
      }
      const attivo = doc.data().attivo;
      log("📡 Stato remoto = " + attivo);

      if (attivo === true) {
        log("🟢 Tracker attivo, registro accesso…");
        db.collection("accessi").add({
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
        .then(() => log("✅ Accesso registrato"))
        .catch(err => log("❌ Errore scrittura accessi", "❌"), console.error(err));
      } else {
        log("⏸ Tracker disattivato dal controller");
      }
    });
  })
  .catch(err => {
    log(`❌ Errore login anonimo: ${err.code}`, "❌");
    console.error(err);
  });
