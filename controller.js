// --- CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCm9lIf2l8FQHiIUoSbtOmLRQNxtgCJd6Q",
  authDomain: "accesstracker-5d3f9.firebaseapp.com",
  projectId: "accesstracker-5d3f9",
  storageBucket: "accesstracker-5d3f9.appspot.com",
  messagingSenderId: "331964316032",
  appId: "1:331964316032:web:8fcc4efdc180a40201a965"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

const btn       = document.getElementById('toggleBtn');
const infoBlock = document.getElementById('info');
let startTs, statusUnsub, clockInterval;

// helper per formattare HH:MM:SS
function fmtTime(d) {
  return d.toLocaleTimeString('it-IT', { hour12:false });
}

// aggiorna il crono
function startClock() {
  if (clockInterval) clearInterval(clockInterval);
  startTs = Date.now();
  clockInterval = setInterval(() => {
    const elapsed = Date.now() - startTs;
    const s = Math.floor(elapsed/1000)%60;
    const m = Math.floor(elapsed/60000)%60;
    const h = Math.floor(elapsed/3600000);
    infoBlock.querySelector('p:nth-child(2)').textContent =
      `🚀 Connesso da: ${h}h ${m}m ${s}s`;
  }, 1000);
}

// scrive dati su schermo
function setInfo({ remote, modified }) {
  // ora corrente
  infoBlock.querySelector('p:nth-child(1)').textContent =
    `🕒 Ora: ${fmtTime(new Date())}`;

  // ultima modifica documento
  infoBlock.querySelector('p:nth-child(3)').textContent =
    `✏️ Ultima modifica: ${modified
      ? fmtTime(modified.toDate())
      : '–'}`;

  // se remoto attivo
  if (remote) {
    btn.textContent = '🛑 Disattiva Tracking';
    btn.disabled = false;
    startClock();
  } else {
    btn.textContent = '✅ Attiva Tracking';
    btn.disabled = false;
    if (clockInterval) clearInterval(clockInterval);
    infoBlock.querySelector('p:nth-child(2)').textContent =
      `🚀 Connesso da: –`;
  }
}

// inizializza tutto
auth.signInAnonymously()
  .then(() => {
    // sottoscrivi alle modifiche dello stato
    const ref = db.collection('controllo').doc('stato');
    statusUnsub = ref.onSnapshot(doc => {
      const data = doc.exists ? doc.data() : {};
      setInfo({
        remote: data.attivo === true,
        modified: data.__lastUpdate // se lo tenevi
      });
    }, err => {
      btn.textContent = '❌ Errore Firebase';
      console.error(err);
    });
  })
  .catch(err => {
    btn.textContent = '❌ Errore Firebase';
    console.error(err);
  });

// al click: inverte lo stato remoto
btn.addEventListener('click', () => {
  btn.disabled = true;
  const ref = db.collection('controllo').doc('stato');
  // leggiamo l'ultimo valore
  ref.get().then(doc => {
    const current = doc.exists && doc.data().attivo === true;
    return ref.set({ attivo: !current }, { merge: true });
  }).catch(err => {
    console.error(err);
  });
});
