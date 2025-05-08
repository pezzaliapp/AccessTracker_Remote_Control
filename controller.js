const firebaseConfig = {
  apiKey: "AIzaSyCm9I1f2I8FQHiIUoSbtOmLRQNxtgCJd60",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

firebase.initializeApp(firebaseConfig);

// Mostra un messaggio visivo sullo schermo
function mostraMessaggio(msg, emoji = "") {
  const p = document.createElement("p");
  p.textContent = `${emoji} ${msg}`;
  p.style.fontSize = "18px";
  p.style.marginTop = "20px";
  document.body.appendChild(p);
}

const toggleBtn = document.getElementById("toggleTracker");
let statoAttuale = false;

firebase.auth().signInAnonymously()
  .then(() => {
    mostraMessaggio("🔐 Accesso anonimo riuscito");

    const db = firebase.firestore();
    const ref = db.collection("controllo").doc("stato");

    // Monitoraggio dello stato attuale
    ref.onSnapshot(doc => {
      if (doc.exists) {
        statoAttuale = doc.data().attivo === true;
        toggleBtn.textContent = statoAttuale ? "🛑 Disattiva Tracking" : "✅ Attiva Tracking";
        toggleBtn.dataset.attivo = statoAttuale;
        mostraMessaggio(`📡 Stato attuale: ${statoAttuale ? "ATTIVO" : "DISATTIVO"}`);
      } else {
        toggleBtn.textContent = "⚠️ Documento non trovato";
        mostraMessaggio("❌ Documento 'stato' non esiste");
      }
    });

    // Clic sul pulsante
    toggleBtn.onclick = async () => {
      const nuovoStato = toggleBtn.dataset.attivo === "true" ? false : true;
      await ref.set({ attivo: nuovoStato });
      mostraMessaggio(`✍️ Stato impostato su ${nuovoStato}`);
    };

  })
  .catch((error) => {
    mostraMessaggio("❌ Errore accesso anonimo");
    console.error(error);
  });
