# BWS Veranstaltungstechnik - Premium Eventtechnik Platform

Dieses Repository enthält den Quellcode für die moderne, interaktive Web-Plattform von **BWS Veranstaltungstechnik** (Klausen). Die Anwendung ist als hochgradig performante Single-Page-App (SPA) mit purem HTML/CSS und modernem JavaScript (ES6) über den Vite-Bundler realisiert.

## 🚀 Key Features

*   **Intelligenter Event-Konfigurator**: Schritt-für-Schritt-Assistent zur automatischen Berechnung der optimalen Technik-Ausstattung basierend auf Event-Typ und Gästeanzahl.
*   **Interaktiver Lichtshow-Simulator**: Echtzeit-Steuerung von Moving Heads, Washlights und Nebelmaschinen direkt im Browser.
*   **Mietkatalog mit Warenkorb**: Flexibler, filterbarer Mietpool mit 22 authentischen BWS-Mietgeräten und automatischer Preiskalkulation nach Mietdauer.
*   **Google Reviews Live-Ticker**: Flüssiges, unendliches Kunden-Feedback-Karussell mit automatischem Pause-on-Hover-Effekt.
*   **Volle Widescreen-Optimierung**: Reaktive HSL-Design-Tokens und CSS-Skalierungen für exzellente Darstellung auf Full-HD, **WQHD (2560x1440)** und **4K (3840x2160)** Bildschirmen.

---

## 🛠️ Lokale Entwicklung

### Voraussetzungen
Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/) installiert haben.

### 1. Installation der Abhängigkeiten
```bash
npm install
```

### 2. Entwicklungs-Server starten
```bash
npm run dev
```
Die Seite öffnet sich lokal unter `http://localhost:5173`.

### 3. Produktions-Build erstellen
```bash
npm run build
```
Der kompilierte und optimierte Code wird im Ordner `/dist` abgelegt.

---

## ☁️ Cloudflare Pages Deployment-Konfiguration

Für das Hosten auf **Cloudflare Pages** verwenden Sie bitte folgende Build-Einstellungen:

*   **Framework-Preset:** `Vite` (oder `None`)
*   **Build-Befehl:** `npm run build`
*   **Ausgabeverzeichnis:** `dist`
*   **Root-Verzeichnis:** `/` (Standard)

---

## 📞 Kontakt & Impressum

**BWS Veranstaltungstechnik**  
Margarethenstraße 3  
54524 Klausen  

**E-Mail:** info@bwsverleih.de  
**Webseite:** [bwsveranstaltungstechnik.de](https://www.bwsveranstaltungstechnik.de/)
