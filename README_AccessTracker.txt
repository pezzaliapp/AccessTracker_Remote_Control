📂 AccessTracker_Remote_Control – GUIDA FILE

Questo è il contenuto completo della cartella per usare AccessTracker su più dispositivi.

─────────────────────────────────────────────
📄 index.html
  ↳ Pagina iniziale per scegliere la modalità:
     - Tracker (per registrare accessi)
     - Controller (per attivare/disattivare da iPhone o altro device)

📄 controller.html
  ↳ Interfaccia per attivare/disattivare il tracciamento remoto.
     🔴 DISATTIVA = non vengono registrati accessi
     🟢 ATTIVA = gli accessi vengono salvati su Firebase

📄 app_macprivato.js
  ↳ Da usare sul Mac privato.
     NON rinominarlo, caricalo così com'è e associa questo file al Mac.
     Registra gli accessi con "dispositivo": "MacPrivato"

📄 app_winaziendale.js
  ↳ Da usare sul laptop aziendale.
     NON rinominarlo, caricalo così com'è e associa questo file al PC aziendale.
     Registra gli accessi con "dispositivo": "WinAziendale"

📄 accessi_dashboard_completo.html
  ↳ Dashboard testuale:
     - Cerca per data/browser
     - Filtro per dispositivo
     - Esporta in CSV
     - Cancella tutti gli accessi
     - Pulsante "Torna alla home"

📄 accessi_grafici_completo.html
  ↳ Dashboard con grafici:
     - Accessi per giorno (ultimi 7)
     - Accessi per dispositivo
     - Pulsanti: Esporta CSV, Reset grafici, Torna alla home
     - Orari convertiti correttamente in fuso orario italiano (Europe/Rome)

─────────────────────────────────────────────
✔️ Carica tutti questi file nella cartella:
   https://www.alessandropezzali.it/AccessTracker_Remote_Control/

⚠️ Ricorda di inserire solo il file app_*.js corretto sul dispositivo corrispondente.
─────────────────────────────────────────────
