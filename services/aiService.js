const OpenAI = require('openai');

class AIService {
  constructor() {
    this.hasApiKey = !!process.env.OPENAI_API_KEY;
    
    if (this.hasApiKey) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    } else {
      console.warn('⚠️ OPENAI_API_KEY non configurato. Il bot funzionerà in modalità demo.');
    }
  }

  async generateResponse(userMessage, relevantContent, conversationHistory = []) {
    try {
      if (!this.hasApiKey) {
        return this.generateDemoResponse(userMessage, relevantContent);
      }

      // Prepara il contesto dai contenuti Notion
      const context = this.prepareContext(relevantContent);
      
      // Prepara la cronologia della conversazione
      const conversationContext = this.prepareConversationHistory(conversationHistory);

      const systemPrompt = `Sei DeFi Mentor, un assistente AI esperto in Web3, blockchain, DeFi, NFT e tecnologie decentralizzate. 
Il tuo compito è aiutare gli utenti a comprendere e navigare il mondo Web3 in modo sicuro ed educativo.

CARATTERISTICHE:
- Rispondi sempre in italiano
- Sii preciso, educativo e accessibile
- Usa esempi pratici quando possibile
- Metti in guardia sui rischi quando appropriato
- Cita le fonti quando disponibili
- Mantieni un tono amichevole ma professionale

CONTESTO DISPONIBILE:
${context}

${conversationContext}

Rispondi alla domanda dell'utente basandoti sui contenuti forniti e sulla tua conoscenza del Web3. 
Se la domanda non è coperta dal contesto, fornisci una risposta generale ma precisa.
Se non sei sicuro di qualcosa, ammettilo e suggerisci di consultare fonti ufficiali.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      return response.choices[0].message.content.trim();

    } catch (error) {
      console.error('Errore nella generazione AI:', error);
      return this.generateDemoResponse(userMessage, relevantContent);
    }
  }

  prepareContext(relevantContent) {
    if (!relevantContent || relevantContent.length === 0) {
      return "Nessun contenuto specifico disponibile per questa domanda.";
    }

    let context = "CONTENUTI RILEVANTI DAL DATABASE:\n\n";
    
    relevantContent.forEach((item, index) => {
      context += `--- FONTE ${index + 1}: ${item.title} ---\n`;
      context += `${item.content}\n\n`;
    });

    return context;
  }

  prepareConversationHistory(conversationHistory) {
    if (!conversationHistory || conversationHistory.length === 0) {
      return "";
    }

    let history = "CRONOLOGIA DELLA CONVERSAZIONE:\n";
    conversationHistory.slice(-6).forEach(entry => { // Ultimi 6 scambi
      history += `Utente: ${entry.user}\n`;
      history += `Bot: ${entry.bot}\n\n`;
    });

    return history;
  }

  generateDemoResponse(userMessage, relevantContent) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Risposte demo basate su parole chiave
    if (lowerMessage.includes('defi') || lowerMessage.includes('finanza decentralizzata')) {
      return `La finanza decentralizzata (DeFi) è un sistema finanziario che opera su blockchain senza intermediari tradizionali come banche.

**Caratteristiche principali:**
• **Decentralizzazione**: Nessun controllo centrale
• **Trasparenza**: Tutte le transazioni sono pubbliche sulla blockchain
• **Accessibilità**: Aperto a chiunque abbia una connessione internet
• **Interoperabilità**: Le applicazioni possono interagire tra loro

**Come iniziare:**
1. Configura un wallet non-custodial (MetaMask, Rabby, Phantom)
2. Acquista ETH e invialo al tuo wallet
3. Connetti il wallet a piattaforme DeFi come Uniswap o Aave
4. Inizia con operazioni semplici come swap o staking

**⚠️ Importante**: La DeFi comporta rischi. Inizia sempre con piccole somme e fai le tue ricerche prima di investire.`;
    }

    if (lowerMessage.includes('blockchain') || lowerMessage.includes('blockchain')) {
      return `Una blockchain è un database decentralizzato che memorizza informazioni in blocchi collegati tra loro attraverso la crittografia.

**Come funziona:**
• **Blocchi**: Contengono transazioni e dati
• **Crittografia**: Garantisce sicurezza e immutabilità
• **Consenso**: Meccanismo per validare le transazioni
• **Nodi**: Computer che mantengono e verificano la rete

**Blockchain principali:**
• **Ethereum**: Piattaforma per smart contract e dApps
• **Bitcoin**: Prima criptovaluta, principalmente riserva di valore
• **Polygon**: Layer 2 per Ethereum con costi ridotti
• **Solana**: Blockchain ad alta velocità e bassi costi

**Vantaggi:**
• Immutabilità dei dati
• Trasparenza delle transazioni
• Eliminazione degli intermediari
• Accesso globale 24/7`;
    }

    if (lowerMessage.includes('nft') || lowerMessage.includes('token non fungibile')) {
      return `Gli NFT (Non-Fungible Token) sono token unici che rappresentano proprietà di asset digitali o fisici sulla blockchain.

**Caratteristiche:**
• **Unicità**: Ogni NFT è unico e non intercambiabile
• **Proprietà verificabile**: La proprietà è registrata sulla blockchain
• **Scarsità digitale**: Controllo dell'offerta e della distribuzione
• **Interoperabilità**: Utilizzabili su diverse piattaforme

**Casi d'uso:**
• Arte digitale e collezionabili
• Gaming e oggetti di gioco
• Identità digitale e domini
• Biglietti e certificati
• Proprietà immobiliare tokenizzata

**Come acquistare NFT:**
1. Configura un wallet compatibile (MetaMask)
2. Visita marketplace come OpenSea o Magic Eden
3. Connetti il wallet e naviga le collezioni
4. Fai le tue ricerche prima di acquistare

**⚠️ Attenzione**: Il mercato NFT è volatile. Investi solo quello che puoi permetterti di perdere.`;
    }

    if (lowerMessage.includes('wallet') || lowerMessage.includes('portafoglio')) {
      return `Un wallet cripto è uno strumento per gestire le tue criptovalute e interagire con le applicazioni Web3.

**Tipi di wallet:**
• **Non-custodial**: Hai il controllo completo delle tue chiavi private
• **Custodial**: Un terzo parte gestisce le tue chiavi

**Wallet popolari:**
• **MetaMask**: Il più utilizzato per Ethereum e Layer 2
• **Rabby**: Alternativa moderna a MetaMask
• **Phantom**: Specializzato per Solana
• **Rainbow**: Wallet mobile user-friendly

**Come configurare un wallet:**
1. Scarica l'estensione o app ufficiale
2. Crea un nuovo wallet
3. **IMPORTANTE**: Salva la frase di recupero in un posto sicuro
4. Non condividere mai le tue chiavi private
5. Inizia con piccole somme per testare

**Sicurezza:**
• Mai condividere la frase di recupero
• Usa hardware wallet per somme importanti
• Verifica sempre gli indirizzi prima di inviare
• Mantieni aggiornato il software`;
    }

    // Risposta generica
    return `Ciao! Sono DeFi Mentor, il tuo assistente per il mondo Web3. 

Posso aiutarti con domande su:
• **Blockchain e criptovalute**
• **DeFi (finanza decentralizzata)**
• **NFT e collezionabili digitali**
• **Wallet e sicurezza**
• **Trading e investimenti**
• **Applicazioni decentralizzate (dApps)**

Fammi una domanda specifica e ti fornirò una spiegazione dettagliata e pratica!

**💡 Suggerimento**: Inizia con domande come "Come funziona DeFi?" o "Cos'è un wallet non-custodial?" per esplorare i concetti base.`;
  }
}

module.exports = new AIService();
