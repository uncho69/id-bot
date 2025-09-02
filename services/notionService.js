const axios = require('axios');

class NotionService {
  constructor() {
    this.apiKey = process.env.NOTION_API_KEY;
    this.databaseId = process.env.NOTION_DATABASE_ID;
    this.baseURL = 'https://api.notion.com/v1';
    
    if (!this.apiKey) {
      console.warn('⚠️ NOTION_API_KEY non configurato. Il bot funzionerà in modalità demo.');
    }
  }

  async searchContent(query) {
    try {
      if (!this.apiKey) {
        // Modalità demo con contenuti statici
        return this.getDemoContent(query);
      }

      const response = await axios.post(
        `${this.baseURL}/search`,
        {
          query: query,
          filter: {
            property: 'object',
            value: 'page'
          },
          page_size: 10
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
          }
        }
      );

      const pages = response.data.results;
      const enrichedContent = [];

      for (const page of pages.slice(0, 5)) { // Limita a 5 risultati
        try {
          const pageContent = await this.getPageContent(page.id);
          enrichedContent.push({
            title: this.extractTitle(page),
            content: pageContent,
            url: page.url,
            id: page.id
          });
        } catch (error) {
          console.error(`Errore nel recuperare contenuto pagina ${page.id}:`, error);
        }
      }

      return enrichedContent;

    } catch (error) {
      console.error('Errore nella ricerca Notion:', error);
      return this.getDemoContent(query);
    }
  }

  async getPageContent(pageId) {
    try {
      const response = await axios.get(
        `${this.baseURL}/blocks/${pageId}/children`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Notion-Version': '2022-06-28'
          }
        }
      );

      return this.extractTextFromBlocks(response.data.results);
    } catch (error) {
      console.error(`Errore nel recuperare contenuto pagina ${pageId}:`, error);
      return '';
    }
  }

  extractTextFromBlocks(blocks) {
    let text = '';
    
    for (const block of blocks) {
      if (block.type === 'paragraph' && block.paragraph?.rich_text) {
        text += this.extractRichText(block.paragraph.rich_text) + '\n';
      } else if (block.type === 'heading_1' && block.heading_1?.rich_text) {
        text += '# ' + this.extractRichText(block.heading_1.rich_text) + '\n';
      } else if (block.type === 'heading_2' && block.heading_2?.rich_text) {
        text += '## ' + this.extractRichText(block.heading_2.rich_text) + '\n';
      } else if (block.type === 'heading_3' && block.heading_3?.rich_text) {
        text += '### ' + this.extractRichText(block.heading_3.rich_text) + '\n';
      } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text) {
        text += '- ' + this.extractRichText(block.bulleted_list_item.rich_text) + '\n';
      } else if (block.type === 'numbered_list_item' && block.numbered_list_item?.rich_text) {
        text += '1. ' + this.extractRichText(block.numbered_list_item.rich_text) + '\n';
      }
    }
    
    return text.trim();
  }

  extractRichText(richTextArray) {
    return richTextArray.map(item => item.plain_text).join('');
  }

  extractTitle(page) {
    if (page.properties?.title?.title) {
      return this.extractRichText(page.properties.title.title);
    } else if (page.properties?.Name?.title) {
      return this.extractRichText(page.properties.Name.title);
    } else {
      return 'Pagina senza titolo';
    }
  }

  getDemoContent(query) {
    // Contenuti demo basati sui risultati della ricerca Notion
    const demoContent = [
      {
        title: "Introduzione a Web3: Blockchain, Criptovalute, DeFi e NFT",
        content: `Web3 rappresenta la prossima evoluzione di Internet, basata su blockchain e tecnologie decentralizzate. 

### Cos'è Web3?
Web3 è un ecosistema di applicazioni decentralizzate (dApps) che operano su blockchain, offrendo agli utenti controllo completo sui propri dati e asset digitali.

### Componenti Principali:
- **Blockchain**: Database decentralizzato e immutabile
- **Criptovalute**: Valute digitali native delle blockchain
- **DeFi**: Finanza decentralizzata senza intermediari
- **NFT**: Token non fungibili per proprietà digitale

### Vantaggi per gli Utenti:
- Controllo completo dei propri dati
- Accesso globale senza restrizioni geografiche
- Trasparenza e immutabilità delle transazioni
- Eliminazione degli intermediari`,
        url: "https://www.notion.so/b00c3e043d8f4844ab44d37a952789c7"
      },
      {
        title: "DeFi - Finanza Decentralizzata",
        content: `La finanza decentralizzata (DeFi) è un sistema finanziario che funziona su blockchain, principalmente attraverso smart contract su Ethereum e le sue Layer2.

### Caratteristiche Chiave:
- **Decentralizzazione**: Nessun controllo centrale
- **Trasparenza**: Tutte le transazioni sono pubbliche
- **Accessibilità**: Aperto a tutti con connessione internet
- **Interoperabilità**: Compatibilità tra diverse applicazioni

### Componenti Principali:
- **DEX (Decentralized Exchanges)**: Scambi senza intermediari
- **Stablecoin**: Criptovalute ancorate a valute fiat
- **Yield Farming**: Guadagno di rendimenti bloccando token
- **Lending & Borrowing**: Prestiti decentralizzati

### Come Accedere:
1. Configura un wallet non-custodial (MetaMask)
2. Acquista ETH e invialo al wallet
3. Connetti il wallet alle piattaforme DeFi
4. Inizia con operazioni semplici come swap o staking`,
        url: "https://www.notion.so/13549a6788df46ef81cfde488ccde4b9"
      },
      {
        title: "Blockchain e Tecnologie",
        content: `Le blockchain sono database decentralizzati che permettono di memorizzare e trasferire dati in modo sicuro e immutabile.

### Come Funziona:
- **Blocchi**: Contengono transazioni e dati
- **Crittografia**: Garantisce sicurezza e immutabilità
- **Consenso**: Meccanismo per validare le transazioni
- **Nodi**: Computer che mantengono la rete

### Blockchain Principali:
- **Ethereum**: Piattaforma per smart contract e dApps
- **Bitcoin**: Prima criptovaluta e riserva di valore
- **Polygon**: Layer 2 per Ethereum con costi ridotti
- **Solana**: Blockchain ad alta velocità e bassi costi

### Layer 2:
Le soluzioni Layer 2 migliorano scalabilità e riducono costi mantenendo la sicurezza della blockchain principale.`,
        url: "https://www.notion.so/4d17210246004b66836b87df277f6139"
      }
    ];

    // Filtra contenuti rilevanti basati sulla query
    const relevantContent = demoContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      this.isQueryRelevant(query, item)
    );

    return relevantContent.length > 0 ? relevantContent : demoContent.slice(0, 2);
  }

  isQueryRelevant(query, content) {
    const queryWords = query.toLowerCase().split(' ');
    const contentText = (content.title + ' ' + content.content).toLowerCase();
    
    return queryWords.some(word => 
      word.length > 3 && contentText.includes(word)
    );
  }
}

module.exports = new NotionService();
