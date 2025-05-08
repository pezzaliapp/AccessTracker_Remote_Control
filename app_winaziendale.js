const firebaseConfig = {
  apiKey: "AIzaSyCm9I1f2I8FQHiIUoSbtOmLRQNxtgCJd60",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().signInAnonymously()
  .then(() => {
    const db = firebase.firestore();
    const dispositivo = "WinAziendale";

    db.collection("controllo").doc("stato").get().then(doc => {
      if (doc.exists && doc.data().attivo) {
        db.collection("accessi").add({
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          dispositivo: dispositivo
        }).then(() => {
          console.log("✅ Accesso registrato da " + dispositivo);
        });
      } else {
        console.log("ℹ️ Tracker disattivato da remoto.");
      }
    });
  })
  .catch((error) => {
    console.error("❌ Errore autenticazione anonima:", error);
  });
