const firebaseConfig = {
  apiKey: "AIzaSyCm9I1f2I8FQHiIUoSbtOmLRQNxtgCJd60",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

firebase.initializeApp(firebaseConfig);

// Mostra messaggi visivi
function mostraMessaggio(msg, emoji = "") {
  const p = document.createElement("p");
  p.textContent = `${emoji} ${msg}`;
  p.style.fontSize = "18px";
  p.style.marginTop = "20px";
  document.body.appendChild(p);
}

mostraMessaggio("🕒 Connessione a Firebase...");

firebase.auth().signInAnonymously()
  .then(() => {
    mostraMessaggio("🔐 Accesso anonimo OK");

    const db = firebase.firestore();
    const statoRef = db.collection("controllo").doc("stato");

    statoRef.onSnapshot(doc => {
      if (!doc.exists) {
        mostraMessaggio("⚠️ Documento 'stato' mancante");
        return;
      }

      const data = doc.data();
      if (data.attivo === true) {
        mostraMessaggio("🟢 Tracker attivo. Registrazione in corso...");

        db.collection("accessi").add({
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }).then(() => {
          mostraMessaggio("✅ Accesso registrato!");
        }).catch(err => {
          mostraMessaggio("❌ Errore scrittura su Firebase");
          console.error(err);
        });
      } else {
        mostraMessaggio("⛔ Tracker disattivato dal controller");
      }
    });
  })
  .catch(error => {
    mostraMessaggio("❌ Errore accesso anonimo");
    console.error(error);
  });
