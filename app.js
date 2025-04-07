const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("controllo").doc("stato").get().then(doc => {
  if (doc.exists && doc.data().attivo) {
    db.collection("accessi").add({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    }).then(() => {
      console.log("Accesso registrato.");
    });
  } else {
    console.log("Tracker disattivato da remoto.");
  }
});
