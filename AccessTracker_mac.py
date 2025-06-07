import time
import subprocess
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore

# === CONFIGURAZIONE FIREBASE ===
CRED_FILE = "firebase_key.json"
DISPOSITIVO = "MacPrivato"

# === INIZIALIZZA FIREBASE ===
cred = credentials.Certificate(CRED_FILE)
firebase_admin.initialize_app(cred)
db = firestore.client()

# === OTTIENI LISTA TASTIERE ATTUALI ===
def get_current_keyboards():
    try:
        result = subprocess.check_output(["ioreg", "-p", "IOUSB", "-w0", "-l"], text=True)
        lines = result.splitlines()
        keyboards = []
        for line in lines:
            if any(key in line.lower() for key in ["keyboard", "hid"]):
                keyboards.append(line.strip())
        return keyboards
    except Exception as e:
        print(f"[Errore] ioreg fallito: {e}")
        return []

# === INVIA ALERT FIREBASE ===
def invia_alert(riga_identificativa):
    timestamp = datetime.utcnow().isoformat()
    alert = {
        "tipo": "hid_alert",
        "timestamp": timestamp,
        "dispositivo": DISPOSITIVO,
        "descrizione": riga_identificativa
    }
    db.collection("alert").add(alert)
    print(f"[🚨] HID sospetto rilevato!
[✅] Alert inviato alle {timestamp}\n -> {riga_identificativa}")

# === LOOP PRINCIPALE ===
print("🛡️ Monitoraggio in corso (nuove tastiere USB HID)… Ctrl+C per uscire.")
precedenti = get_current_keyboards()

try:
    while True:
        attuali = get_current_keyboards()
        nuovi = [k for k in attuali if k not in precedenti]
        if nuovi:
            for k in nuovi:
                invia_alert(k)
        precedenti = attuali
        time.sleep(5)

except KeyboardInterrupt:
    print("🛑 Monitoraggio interrotto.")
