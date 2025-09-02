/**
 * DeFi Mentor Chat Widget
 * Integrazione per ImparoDeFi Landing Page
 * Modalità Beta - Completamente Gratuita
 */

(function() {
    'use strict';

    // Configurazione del widget
    const CONFIG = {
        apiUrl: 'http://localhost:3000/api/chat', // Cambia con il tuo dominio
        betaMode: true,
        position: 'bottom-right',
        theme: 'imparodefi'
    };

    // Crea il widget HTML
    function createWidgetHTML() {
        return `
            <div id="defi-mentor-widget" class="defi-mentor-widget">
                <div class="defi-mentor-toggle" onclick="DefiMentor.toggle()">
                    <div class="defi-mentor-badge">Beta</div>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                </div>
                
                <div class="defi-mentor-window" id="defi-mentor-window">
                    <div class="defi-mentor-header">
                        <div>
                            <h3>DeFi Mentor</h3>
                            <div class="defi-mentor-status">Modalità Beta • Sempre online</div>
                        </div>
                        <button class="defi-mentor-close" onclick="DefiMentor.toggle()">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="defi-mentor-messages" id="defi-mentor-messages">
                        <div class="defi-mentor-message defi-mentor-bot">
                            <div class="defi-mentor-avatar">🤖</div>
                            <div class="defi-mentor-content">
                                Ciao! Sono DeFi Mentor, il tuo assistente AI per il mondo Web3. 
                                Sono qui per aiutarti a capire Blockchain, DeFi, NFT e molto altro!
                                <br><br>
                                <strong>Modalità Beta attiva</strong> - Prova a farmi una domanda! 🚀
                            </div>
                        </div>
                        
                        <div class="defi-mentor-suggestions">
                            <div class="defi-mentor-suggestion" onclick="DefiMentor.sendSuggestion('Cos\\'è DeFi?')">Cos'è DeFi?</div>
                            <div class="defi-mentor-suggestion" onclick="DefiMentor.sendSuggestion('Come funziona la Blockchain?')">Come funziona la Blockchain?</div>
                            <div class="defi-mentor-suggestion" onclick="DefiMentor.sendSuggestion('Cosa sono gli NFT?')">Cosa sono gli NFT?</div>
                            <div class="defi-mentor-suggestion" onclick="DefiMentor.sendSuggestion('Come creare un wallet?')">Come creare un wallet?</div>
                        </div>
                    </div>
                    
                    <div class="defi-mentor-input-container">
                        <div class="defi-mentor-input-wrapper">
                            <input type="text" class="defi-mentor-input" id="defi-mentor-input" placeholder="Scrivi la tua domanda..." onkeypress="DefiMentor.handleKeyPress(event)">
                            <button class="defi-mentor-send" onclick="DefiMentor.sendMessage()">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Crea gli stili CSS
    function createWidgetCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* DeFi Mentor Widget Styles */
            .defi-mentor-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .defi-mentor-toggle {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                position: relative;
            }

            .defi-mentor-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
            }

            .defi-mentor-toggle svg {
                width: 24px;
                height: 24px;
                color: white;
                transition: transform 0.3s ease;
            }

            .defi-mentor-toggle.active svg {
                transform: rotate(45deg);
            }

            .defi-mentor-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background: #10b981;
                color: white;
                font-size: 10px;
                font-weight: 600;
                padding: 2px 6px;
                border-radius: 8px;
                text-transform: uppercase;
            }

            .defi-mentor-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: none;
                flex-direction: column;
                overflow: hidden;
                transform: translateY(20px) scale(0.95);
                opacity: 0;
                transition: all 0.3s ease;
            }

            .defi-mentor-window.active {
                display: flex;
                transform: translateY(0) scale(1);
                opacity: 1;
            }

            .defi-mentor-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .defi-mentor-header h3 {
                font-size: 16px;
                font-weight: 600;
                margin: 0;
            }

            .defi-mentor-status {
                font-size: 12px;
                opacity: 0.9;
                margin-top: 2px;
            }

            .defi-mentor-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s ease;
            }

            .defi-mentor-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .defi-mentor-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8fafc;
            }

            .defi-mentor-message {
                margin-bottom: 16px;
                display: flex;
                align-items: flex-start;
            }

            .defi-mentor-message.defi-mentor-user {
                justify-content: flex-end;
            }

            .defi-mentor-content {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
            }

            .defi-mentor-bot .defi-mentor-content {
                background: white;
                color: #374151;
                border: 1px solid #e5e7eb;
            }

            .defi-mentor-user .defi-mentor-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .defi-mentor-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
            }

            .defi-mentor-bot .defi-mentor-avatar {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .defi-mentor-user .defi-mentor-avatar {
                background: #e5e7eb;
                color: #374151;
                margin-right: 0;
                margin-left: 8px;
            }

            .defi-mentor-input-container {
                padding: 16px 20px;
                background: white;
                border-top: 1px solid #e5e7eb;
            }

            .defi-mentor-input-wrapper {
                display: flex;
                align-items: center;
                background: #f8fafc;
                border-radius: 24px;
                padding: 8px 16px;
                border: 1px solid #e5e7eb;
            }

            .defi-mentor-input {
                flex: 1;
                border: none;
                background: none;
                outline: none;
                font-size: 14px;
                color: #374151;
                padding: 8px 0;
            }

            .defi-mentor-input::placeholder {
                color: #9ca3af;
            }

            .defi-mentor-send {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                margin-left: 8px;
                transition: transform 0.2s ease;
            }

            .defi-mentor-send:hover {
                transform: scale(1.1);
            }

            .defi-mentor-send svg {
                width: 16px;
                height: 16px;
                color: white;
            }

            .defi-mentor-suggestions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
            }

            .defi-mentor-suggestion {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                padding: 6px 12px;
                font-size: 12px;
                color: #6b7280;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .defi-mentor-suggestion:hover {
                background: #f3f4f6;
                border-color: #d1d5db;
            }

            .defi-mentor-typing {
                display: none;
                align-items: center;
                padding: 12px 16px;
                background: white;
                border-radius: 18px;
                border: 1px solid #e5e7eb;
                max-width: 80px;
            }

            .defi-mentor-typing.active {
                display: flex;
            }

            .defi-mentor-typing-dots {
                display: flex;
                gap: 4px;
            }

            .defi-mentor-typing-dot {
                width: 6px;
                height: 6px;
                background: #9ca3af;
                border-radius: 50%;
                animation: defi-mentor-typing 1.4s infinite ease-in-out;
            }

            .defi-mentor-typing-dot:nth-child(1) { animation-delay: -0.32s; }
            .defi-mentor-typing-dot:nth-child(2) { animation-delay: -0.16s; }

            @keyframes defi-mentor-typing {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }

            @media (max-width: 480px) {
                .defi-mentor-window {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 120px);
                    bottom: 80px;
                    right: 20px;
                    left: 20px;
                }
                
                .defi-mentor-widget {
                    bottom: 20px;
                    right: 20px;
                }
            }
        `;
        return style;
    }

    // API Demo Responses
    const DEMO_RESPONSES = {
        'defi': 'DeFi (Decentralized Finance) è un ecosistema di applicazioni finanziarie costruite su blockchain. Permette di prestare, prendere in prestito, fare trading e guadagnare interessi senza intermediari tradizionali come banche. È una rivoluzione che sta democratizzando l\'accesso ai servizi finanziari!',
        'blockchain': 'Blockchain è una tecnologia di registro distribuito che mantiene una lista crescente di record (blocchi) collegati e protetti usando crittografia. È immutabile, trasparente e decentralizzata. È la base tecnologica di Bitcoin e molte altre criptovalute.',
        'nft': 'Gli NFT (Non-Fungible Token) sono token unici che rappresentano la proprietà di un asset digitale specifico, come arte, musica, video o altri contenuti digitali. Ogni NFT è unico e non può essere replicato.',
        'wallet': 'Per creare un wallet crypto:\n\n1. **Scegli il tipo**: Hot wallet (MetaMask, Trust Wallet) per uso quotidiano o cold wallet (Ledger, Trezor) per massima sicurezza\n\n2. **Scarica l\'app**: Vai su App Store/Play Store e scarica MetaMask o Trust Wallet\n\n3. **Crea account**: Segui la procedura guidata, crea una password forte\n\n4. **Salva la seed phrase**: 12-24 parole di recupero - SCRIVILE e CONSERVALE al sicuro!\n\n5. **Verifica**: Testa con piccole quantità prima di depositi importanti\n\n⚠️ **IMPORTANTE**: Mai condividere la seed phrase con nessuno!',
        'default': 'Interessante domanda! In modalità beta, posso fornire informazioni generali su Web3, DeFi, Blockchain e NFT. Per risposte più specifiche e personalizzate, considera di attivare la modalità AI avanzata.'
    };

    // Widget API
    window.DefiMentor = {
        isOpen: false,
        conversationHistory: [],

        init: function() {
            // Aggiungi CSS
            document.head.appendChild(createWidgetCSS());
            
            // Aggiungi HTML
            document.body.insertAdjacentHTML('beforeend', createWidgetHTML());
            
            // Event listeners
            this.setupEventListeners();
            
            console.log('🚀 DeFi Mentor Widget inizializzato!');
        },

        setupEventListeners: function() {
            // Close on outside click
            document.addEventListener('click', (event) => {
                const widget = document.getElementById('defi-mentor-widget');
                if (this.isOpen && !widget.contains(event.target)) {
                    this.toggle();
                }
            });
        },

        toggle: function() {
            const window = document.getElementById('defi-mentor-window');
            const toggle = document.querySelector('.defi-mentor-toggle');
            
            this.isOpen = !this.isOpen;
            
            if (this.isOpen) {
                window.classList.add('active');
                toggle.classList.add('active');
                document.getElementById('defi-mentor-input').focus();
            } else {
                window.classList.remove('active');
                toggle.classList.remove('active');
            }
        },

        handleKeyPress: function(event) {
            if (event.key === 'Enter') {
                this.sendMessage();
            }
        },

        sendSuggestion: function(text) {
            document.getElementById('defi-mentor-input').value = text;
            this.sendMessage();
        },

        sendMessage: async function() {
            const input = document.getElementById('defi-mentor-input');
            const message = input.value.trim();
            
            if (!message) return;

            // Add user message
            this.addMessage(message, 'user');
            input.value = '';

            // Show typing
            this.showTyping();

            try {
                const response = await this.getBotResponse(message);
                this.hideTyping();
                this.addMessage(response, 'bot');
            } catch (error) {
                this.hideTyping();
                this.addMessage('Scusa, si è verificato un errore. Riprova più tardi.', 'bot');
            }
        },

        addMessage: function(content, sender) {
            const messages = document.getElementById('defi-mentor-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `defi-mentor-message defi-mentor-${sender}`;
            
            const avatar = document.createElement('div');
            avatar.className = 'defi-mentor-avatar';
            avatar.textContent = sender === 'bot' ? '🤖' : '👤';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'defi-mentor-content';
            contentDiv.textContent = content;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(contentDiv);
            
            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;
        },

        showTyping: function() {
            const messages = document.getElementById('defi-mentor-messages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'defi-mentor-message defi-mentor-bot';
            typingDiv.id = 'defi-mentor-typing-indicator';
            
            const avatar = document.createElement('div');
            avatar.className = 'defi-mentor-avatar';
            avatar.textContent = '🤖';
            
            const typingContent = document.createElement('div');
            typingContent.className = 'defi-mentor-typing active';
            typingContent.innerHTML = `
                <div class="defi-mentor-typing-dots">
                    <div class="defi-mentor-typing-dot"></div>
                    <div class="defi-mentor-typing-dot"></div>
                    <div class="defi-mentor-typing-dot"></div>
                </div>
            `;
            
            typingDiv.appendChild(avatar);
            typingDiv.appendChild(typingContent);
            messages.appendChild(typingDiv);
            messages.scrollTop = messages.scrollHeight;
        },

        hideTyping: function() {
            const typing = document.getElementById('defi-mentor-typing-indicator');
            if (typing) {
                typing.remove();
            }
        },

        getBotResponse: async function(userMessage) {
            if (CONFIG.betaMode) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
                
                const message = userMessage.toLowerCase();
                
                if (message.includes('defi')) return DEMO_RESPONSES.defi;
                if (message.includes('blockchain')) return DEMO_RESPONSES.blockchain;
                if (message.includes('nft')) return DEMO_RESPONSES.nft;
                if (message.includes('wallet') || message.includes('creare')) return DEMO_RESPONSES.wallet;
                
                return DEMO_RESPONSES.default;
            } else {
                // Real API call
                const response = await fetch(CONFIG.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        history: this.conversationHistory
                    })
                });
                
                const data = await response.json();
                this.conversationHistory.push({ role: 'user', content: userMessage });
                this.conversationHistory.push({ role: 'assistant', content: data.response });
                
                return data.response;
            }
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => DefiMentor.init());
    } else {
        DefiMentor.init();
    }

})();
