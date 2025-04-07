const firebaseConfig = {
  apiKey: "AIzaSyCm9I1f2I8FQHiIUoSbtOmLRQNxtgCJd60",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function setStatus(status) {
  db.collection("controllo").doc("stato").set({ attivo: status }).then(() => {
    alert("Stato aggiornato: " + status);
  }).catch((error) => {
    console.error("Errore aggiornamento stato:", error);
  });
}
