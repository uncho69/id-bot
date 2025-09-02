const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const notionService = require('./services/notionService');
const aiService = require('./services/aiService');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', rateLimiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Il messaggio non può essere vuoto' 
      });
    }

    // Cerca contenuti rilevanti in Notion
    const relevantContent = await notionService.searchContent(message);
    
    // Genera risposta AI basata sui contenuti
    const aiResponse = await aiService.generateResponse(
      message, 
      relevantContent, 
      conversationHistory
    );

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      sources: relevantContent.map(item => ({
        title: item.title,
        url: item.url
      }))
    });

  } catch (error) {
    console.error('Errore nel chat endpoint:', error);
    res.status(500).json({ 
      error: 'Errore interno del server. Riprova più tardi.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'DeFi Mentor Bot'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Errore non gestito:', err);
  res.status(500).json({ 
    error: 'Errore interno del server' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint non trovato' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DeFi Mentor Bot è attivo sulla porta ${PORT}`);
  console.log(`📚 Accesso: http://localhost:${PORT}`);
  console.log(`🤖 Bot pronto per rispondere alle domande Web3!`);
});
