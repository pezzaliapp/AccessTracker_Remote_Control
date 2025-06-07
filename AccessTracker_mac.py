import time
from datetime import datetime
from pynput import keyboard
import firebase_admin
from firebase_admin import credentials, firestore

# === CONFIG ===
CRED_FILE = "firebase_key.json"
DISPOSITIVO = "MacPrivato"
SOGLIA_TASTI_AL_SECONDO = 10
FINESTRA_SECONDI = 1

# === FIREBASE ===
cred = credentials.Certificate(CRED_FILE)
firebase_admin.initialize_app(cred)
db = firestore.client()

# === STATO DIGITAZIONE ===
tasti_premuti = []

def invia_alert(n_tasti, velocita):
    timestamp = datetime.now().isoformat()  # usa orario locale
    alert = {
        "tipo": "velocità_digitazione",
        "timestamp": timestamp,
        "dispositivo": DISPOSITIVO,
        "descrizione": f"{n_tasti} tasti in {FINESTRA_SECONDI}s – {velocita:.1f} tasti/sec"
    }
    db.collection("alert").add(alert)
    print(f"[🚨] Digitazione sospetta! {n_tasti} tasti in {FINESTRA_SECONDI}s – Alert inviato.")

def on_press(key):
    t = time.time()
    tasti_premuti.append(t)
    # rimuovi eventi più vecchi della finestra temporale
    while tasti_premuti and t - tasti_premuti[0] > FINESTRA_SECONDI:
        tasti_premuti.pop(0)

    if len(tasti_premuti) > SOGLIA_TASTI_AL_SECONDO:
        invia_alert(len(tasti_premuti), len(tasti_premuti)/FINESTRA_SECONDI)
        tasti_premuti.clear()

print("⌨️ Monitoraggio velocità digitazione attivo. Ctrl+C per uscire.")
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
