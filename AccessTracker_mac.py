
import pynput.keyboard
import time
import threading
from datetime import datetime

LOG_FILE = "access_log_2025-06-07.log"
CHECK_INTERVAL = 5  # secondi
SPEED_THRESHOLD = 30  # tasti per secondo considerati sospetti

buffer = []
lock = threading.Lock()

def write_log(event, status="OK"):
    with open(LOG_FILE, "a") as f:
        timestamp = datetime.now().isoformat()
        f.write(f"{'timestamp': '{}', 'event': '{}', 'status': '{}'}\n".format(timestamp, event, status))

def monitor_speed():
    while True:
        time.sleep(CHECK_INTERVAL)
        with lock:
            count = len(buffer)
            buffer.clear()
        speed = count / CHECK_INTERVAL
        if speed > SPEED_THRESHOLD:
            write_log(f"Typing Speed: {speed:.2f} tasti/sec", status="Sospetto")
        else:
            write_log(f"Typing Speed: {speed:.2f} tasti/sec", status="Normale")

def on_press(key):
    with lock:
        buffer.append(key)

def start_keylogger():
    listener = pynput.keyboard.Listener(on_press=on_press)
    listener.start()

    monitor_thread = threading.Thread(target=monitor_speed, daemon=True)
    monitor_thread.start()

    listener.join()

if __name__ == "__main__":
    start_keylogger()
