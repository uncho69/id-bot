# 🚀 Integrazione DeFi Mentor Widget - ImparoDeFi

## 📋 **ISTRUZIONI DI INTEGRAZIONE**

### **1. INTEGRAZIONE SEMPLICE (1 minuto)**

Aggiungi questo codice alla fine del `<body>` della tua landing page:

```html
<!-- DeFi Mentor Widget -->
<script src="https://tuodominio.com/defi-mentor-widget.js"></script>
```

### **2. INTEGRAZIONE AVANZATA (5 minuti)**

#### **Step 1: Carica il file JavaScript**
```html
<script src="https://tuodominio.com/defi-mentor-widget.js"></script>
```

#### **Step 2: Personalizza la configurazione**
```html
<script>
// Personalizza il widget
DefiMentor.CONFIG = {
    apiUrl: 'https://tuodominio.com/api/chat', // Il tuo endpoint API
    demoMode: true, // true = demo gratuita, false = AI avanzata
    position: 'bottom-right', // bottom-right, bottom-left
    theme: 'imparodefi' // tema personalizzato
};
</script>
```

### **3. HOSTING DEL WIDGET**

#### **Opzione A: Hosting Gratuito (Raccomandato)**
- **Vercel**: Deploy automatico da GitHub
- **Netlify**: Drag & drop del file
- **GitHub Pages**: Hosting gratuito

#### **Opzione B: Hosting del tuo server**
- Carica `defi-mentor-widget.js` nella cartella pubblica
- Aggiorna l'URL nel codice di integrazione

## 🎨 **PERSONALIZZAZIONE**

### **Colori e Branding**
Il widget usa i colori di ImparoDeFi:
- **Gradiente principale**: `#667eea` → `#764ba2`
- **Badge demo**: `#10b981` (verde)
- **Testo**: `#374151`

### **Posizione**
```javascript
// Cambia posizione
DefiMentor.CONFIG.position = 'bottom-left'; // o 'bottom-right'
```

### **Dimensioni**
```css
/* Personalizza dimensioni */
.defi-mentor-window {
    width: 400px; /* Larghezza */
    height: 600px; /* Altezza */
}
```

## 🔧 **CONFIGURAZIONI AVANZATE**

### **Modalità Demo vs AI Avanzata**

#### **Demo Mode (Gratuita)**
```javascript
DefiMentor.CONFIG.demoMode = true;
```
- ✅ **Costo**: €0
- ✅ **Risposte predefinite**
- ✅ **Sempre funzionante**

#### **AI Avanzata (A pagamento)**
```javascript
DefiMentor.CONFIG.demoMode = false;
DefiMentor.CONFIG.apiUrl = 'https://tuodominio.com/api/chat';
```
- 💰 **Costo**: €20-50/mese
- 🚀 **Risposte personalizzate**
- 🧠 **AI intelligente**

### **Integrazione con il tuo backend**
```javascript
// Endpoint personalizzato
DefiMentor.CONFIG.apiUrl = 'https://imparodefi.xyz/api/chat';

// Headers personalizzati
DefiMentor.CONFIG.headers = {
    'Authorization': 'Bearer your-token',
    'X-Custom-Header': 'value'
};
```

## 📱 **RESPONSIVE DESIGN**

Il widget è completamente responsive:
- ✅ **Desktop**: 350x500px
- ✅ **Mobile**: Full screen
- ✅ **Tablet**: Adattivo

## 🎯 **ESEMPIO COMPLETO**

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ImparoDeFi - Il tuo accesso al mondo Web3</title>
    <!-- I tuoi CSS esistenti -->
</head>
<body>
    <!-- Il tuo contenuto esistente -->
    
    <!-- DeFi Mentor Widget -->
    <script src="https://imparodefi.xyz/defi-mentor-widget.js"></script>
    <script>
        // Configurazione personalizzata
        DefiMentor.CONFIG = {
            apiUrl: 'https://imparodefi.xyz/api/chat',
            demoMode: true, // Inizia con demo gratuita
            position: 'bottom-right'
        };
    </script>
</body>
</html>
```

## 🚀 **DEPLOY RAPIDO**

### **1. Test Locale**
```bash
# Avvia il server
npm start

# Testa il widget
open http://localhost:3000/widget.html
```

### **2. Deploy Produzione**
```bash
# Deploy su Vercel
vercel --prod

# Deploy su Netlify
netlify deploy --prod
```

## 📊 **ANALYTICS E MONITORAGGIO**

### **Google Analytics Integration**
```javascript
// Traccia apertura chat
DefiMentor.onOpen = function() {
    gtag('event', 'chat_opened', {
        'event_category': 'engagement',
        'event_label': 'defi_mentor'
    });
};

// Traccia invio messaggi
DefiMentor.onMessage = function(message) {
    gtag('event', 'message_sent', {
        'event_category': 'engagement',
        'event_label': 'defi_mentor',
        'value': message.length
    });
};
```

## 🎉 **RISULTATO FINALE**

Dopo l'integrazione avrai:

- ✅ **Widget chat flottante** in basso a destra
- ✅ **Design moderno** e minimal
- ✅ **Integrazione perfetta** con ImparoDeFi
- ✅ **Modalità demo gratuita**
- ✅ **Responsive** per tutti i dispositivi
- ✅ **Facile da personalizzare**

## 🔄 **AGGIORNAMENTI FUTURI**

Il widget è progettato per essere facilmente aggiornabile:
- **Nuove funzionalità**: Aggiorna il file JS
- **Nuovi temi**: Modifica i CSS
- **Nuove API**: Cambia la configurazione

---

**🎯 Pronto per l'integrazione!** Il widget è completamente funzionale e pronto per essere integrato nella tua landing page ImparoDeFi.
