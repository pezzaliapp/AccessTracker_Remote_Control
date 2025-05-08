const firebaseConfig = {
  apiKey: "AIzaSyCm9I1f2I8FQHiIUoSbtOmLRQNxtgCJd60",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);

// Funzione per visualizzare messaggi
function mostraMessaggio(testo, emoji = "") {
  const p = document.createElement("p");
  p.textContent = `${emoji} ${testo}`;
  p.style.fontSize = "18px";
  p.style.marginTop = "12px";
  document.body.appendChild(p);
}

// Mostra messaggio iniziale
mostraMessaggio("Connessione a Firebase...", "🕒");

// Login anonimo
firebase.auth().signInAnonymously()
  .then(() => {
    mostraMessaggio("Accesso anonimo riuscito", "🔐");

    const db = firebase.firestore();
    const statoRef = db.collection("controllo").doc("stato");

    // Leggi lo stato in tempo reale
    statoRef.onSnapshot(doc => {
      if (!doc.exists) {
        mostraMessaggio("Documento 'stato' non trovato", "⚠️");
        return;
      }

      const stato = doc.data().attivo;

      if (stato === true) {
        mostraMessaggio("Tracker attivo. Registro accesso...", "🟢");

        db.collection("accessi").add({
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }).then(() => {
          mostraMessaggio("Accesso registrato!", "✅");
        }).catch(err => {
          mostraMessaggio("Errore scrittura su Firebase", "❌");
          console.error(err);
        });

      } else {
        mostraMessaggio("Tracker disattivato dal controller", "⛔");
      }
    });
  })
  .catch(error => {
    mostraMessaggio("Errore accesso anonimo", "❌");
    console.error(error);
  });
