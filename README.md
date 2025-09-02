# 🤖 DeFi Mentor Bot

Un assistente AI intelligente per il mondo Web3, DeFi e blockchain, basato sui contenuti educativi di ImparoDeFi.

## ✨ Caratteristiche

- **AI-Powered**: Utilizza OpenAI GPT-4 per risposte intelligenti e contestuali
- **Integrazione Notion**: Accede ai contenuti del database Notion di ImparoDeFi
- **Interfaccia Moderna**: UI responsive e user-friendly
- **Rate Limiting**: Protezione contro abusi
- **Modalità Demo**: Funziona anche senza API keys per test

## 🚀 Installazione

1. **Clona il repository**
```bash
git clone <repository-url>
cd idbot
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Configura le variabili d'ambiente**
```bash
cp env.example .env
```

Modifica il file `.env` con le tue API keys:
```env
# OpenAI API Key (obbligatorio per funzionalità complete)
OPENAI_API_KEY=your_openai_api_key_here

# Notion API Configuration (opzionale, funziona in modalità demo)
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. **Avvia il server**
```bash
# Modalità sviluppo
npm run dev

# Modalità produzione
npm start
```

5. **Apri il browser**
Visita `http://localhost:3000`

## 🔧 Configurazione API

### OpenAI API
1. Vai su [OpenAI Platform](https://platform.openai.com/)
2. Crea un account e genera una API key
3. Aggiungi la key al file `.env`

### Notion API (Opzionale)
1. Vai su [Notion Developers](https://developers.notion.com/)
2. Crea una nuova integrazione
3. Ottieni l'API key e il Database ID
4. Aggiungi le credenziali al file `.env`

## 📚 Funzionalità

### Domande Supportate
- **Blockchain**: Come funzionano, tipologie, vantaggi
- **DeFi**: Finanza decentralizzata, yield farming, lending
- **NFT**: Token non fungibili, marketplace, creazione
- **Wallet**: Configurazione, sicurezza, tipologie
- **Trading**: Exchange, strategie, rischi
- **Sicurezza**: Best practices, truffe, protezione

### Modalità Demo
Se non hai configurato le API keys, il bot funziona in modalità demo con contenuti predefiniti basati sui dati di ImparoDeFi.

## 🛠️ Architettura

```
idbot/
├── server.js              # Server principale
├── services/
│   ├── aiService.js       # Servizio OpenAI
│   └── notionService.js   # Servizio Notion
├── middleware/
│   └── rateLimiter.js     # Rate limiting
├── public/
│   └── index.html         # Interfaccia web
└── package.json
```

## 🔒 Sicurezza

- **Rate Limiting**: 100 richieste per 15 minuti per IP
- **Helmet**: Headers di sicurezza
- **CORS**: Configurazione sicura
- **Input Validation**: Validazione dei messaggi

## 📱 Interfaccia

L'interfaccia web include:
- Design moderno e responsive
- Chat in tempo reale
- Indicatore di typing
- Suggerimenti di domande
- Fonti delle informazioni
- Cronologia conversazione

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Heroku
```bash
heroku create defi-mentor-bot
git push heroku main
```

## 🤝 Contributi

1. Fork il repository
2. Crea un branch per la tua feature
3. Commit le modifiche
4. Push al branch
5. Apri una Pull Request

## 📄 Licenza

MIT License - vedi il file LICENSE per dettagli.

## 🆘 Supporto

Per supporto o domande:
- Apri una issue su GitHub
- Contatta il team ImparoDeFi
- Visita [ImparoDeFi.xyz](https://imparodefi.xyz/)

## 🔄 Aggiornamenti

Il bot viene aggiornato regolarmente con:
- Nuovi contenuti dal database Notion
- Miglioramenti dell'AI
- Nuove funzionalità
- Fix di sicurezza

---

**DeFi Mentor** - Il tuo assistente per il mondo Web3 🚀
