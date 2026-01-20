/**
 * Neo Chat Widget - Command AI™
 * Embeddable chat widget for learncommandai.com
 * 
 * Usage: <script src="https://your-vercel-url.vercel.app/widget.js" async defer></script>
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    apiEndpoint: 'https://commandai-neo-chatbot.vercel.app/api/chat', // UPDATE AFTER DEPLOY
    widgetTitle: 'Neo',
    widgetSubtitle: 'Your AI Strategist',
    brandName: 'Command AI™',
    brandUrl: 'https://learncommandai.com',
    footerText: 'Powered by Command AI™',
    placeholderText: 'Type your message...',
    logoUrl: 'https://cdn.shopify.com/s/files/1/0729/6407/9808/files/NEO_Your_AI_Strategist.png?v=1768937579',
    ctaUrl: 'https://mjkgroupglobal.com/products/command-ai',
    ctaText: 'Get the Playbook',
    b2bRedirectUrl: 'https://mjkgroupglobal.com',
    b2bBotName: 'KAi'
  };

  // ============================================
  // COLORS
  // ============================================
  const COLORS = {
    primary: '#0a1a2f',
    primaryHover: '#142240',
    accent: '#d4af37',
    accentHover: '#c9a22e',
    accentLight: '#f5f0e1',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0a1a2f',
    textLight: '#64748b',
    textMuted: '#94a3b8',
    userBubble: '#0a1a2f',
    userText: '#ffffff',
    botBubble: '#f1f5f9',
    botText: '#0a1a2f',
    border: '#e2e8f0',
    success: '#10b981',
    error: '#ef4444'
  };

  // ============================================
  // OPENING MESSAGES
  // ============================================
  const OPENING_MESSAGES = [
    "Hey — I'm Neo, your AI guide for Command AI. Whether you're working through the 21-day playbook or just figuring out where to start with AI, I'm here to help. What's on your mind?",
    "Hey there. I'm Neo — here to help you get the most out of Command AI. Stuck on something? Have a question about the playbook? Just want to talk through how AI fits into your workflow? I've got you.",
    "Hi — Neo here. I help people navigate Command AI and the 21-day implementation. Whether you're on Day 1 or Day 21, I can point you in the right direction. What are you working on?"
  ];

  // ============================================
  // STYLES
  // ============================================
  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

    #neo-chat-container * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    /* Chat Button */
    #neo-chat-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${COLORS.primary};
      border: 3px solid ${COLORS.accent};
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(10, 26, 47, 0.3), 0 0 0 0 rgba(212, 175, 55, 0.4);
      z-index: 999998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: neo-pulse 2s infinite;
      overflow: hidden;
    }

    @keyframes neo-pulse {
      0%, 100% { box-shadow: 0 4px 24px rgba(10, 26, 47, 0.3), 0 0 0 0 rgba(212, 175, 55, 0.4); }
      50% { box-shadow: 0 4px 24px rgba(10, 26, 47, 0.3), 0 0 0 8px rgba(212, 175, 55, 0); }
    }

    #neo-chat-button:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 32px rgba(10, 26, 47, 0.4);
    }

    #neo-chat-button img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    #neo-chat-button.neo-open {
      animation: none;
    }

    #neo-chat-button .neo-close-icon {
      display: none;
      width: 24px;
      height: 24px;
    }

    #neo-chat-button.neo-open img {
      display: none;
    }

    #neo-chat-button.neo-open .neo-close-icon {
      display: block;
    }

    /* Chat Window */
    #neo-chat-window {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 400px;
      height: 600px;
      max-height: calc(100vh - 140px);
      background: ${COLORS.background};
      border-radius: 20px;
      box-shadow: 0 12px 48px rgba(10, 26, 47, 0.2), 0 0 0 1px ${COLORS.border};
      z-index: 999999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #neo-chat-window.neo-visible {
      display: flex;
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      #neo-chat-window {
        width: calc(100vw - 16px);
        height: calc(100vh - 100px);
        max-height: calc(100vh - 100px);
        right: 8px;
        bottom: 88px;
        border-radius: 16px;
      }

      #neo-chat-button {
        bottom: 16px;
        right: 16px;
        width: 56px;
        height: 56px;
      }
    }

    /* Header */
    #neo-chat-header {
      background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 2px solid ${COLORS.accent};
    }

    #neo-header-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid ${COLORS.accent};
      object-fit: cover;
    }

    #neo-header-info {
      flex: 1;
    }

    #neo-header-title {
      color: ${COLORS.background};
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    #neo-header-subtitle {
      color: ${COLORS.accent};
      font-size: 13px;
      font-weight: 500;
      margin-top: 2px;
    }

    #neo-header-status {
      display: flex;
      align-items: center;
      gap: 6px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 11px;
    }

    #neo-header-status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: ${COLORS.success};
      border-radius: 50%;
      animation: neo-status-pulse 2s infinite;
    }

    @keyframes neo-status-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Messages Area */
    #neo-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: ${COLORS.background};
    }

    #neo-chat-messages::-webkit-scrollbar {
      width: 6px;
    }

    #neo-chat-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    #neo-chat-messages::-webkit-scrollbar-thumb {
      background: ${COLORS.border};
      border-radius: 3px;
    }

    .neo-message {
      display: flex;
      gap: 10px;
      max-width: 88%;
      animation: neo-message-in 0.3s ease-out;
    }

    @keyframes neo-message-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .neo-message.neo-user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .neo-message-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex-shrink: 0;
      background: ${COLORS.primary};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .neo-message-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .neo-message.neo-user .neo-message-avatar {
      background: ${COLORS.accent};
    }

    .neo-message-avatar svg {
      width: 18px;
      height: 18px;
    }

    .neo-message-bubble {
      padding: 12px 16px;
      border-radius: 18px;
      line-height: 1.5;
      font-size: 14px;
    }

    .neo-message.neo-bot .neo-message-bubble {
      background: ${COLORS.botBubble};
      color: ${COLORS.botText};
      border-bottom-left-radius: 6px;
    }

    .neo-message.neo-user .neo-message-bubble {
      background: ${COLORS.userBubble};
      color: ${COLORS.userText};
      border-bottom-right-radius: 6px;
    }

    .neo-message-bubble a {
      color: ${COLORS.accent};
      text-decoration: underline;
    }

    .neo-message.neo-user .neo-message-bubble a {
      color: ${COLORS.accent};
    }

    /* Typing Indicator */
    .neo-typing {
      display: flex;
      gap: 5px;
      padding: 16px;
    }

    .neo-typing-dot {
      width: 8px;
      height: 8px;
      background: ${COLORS.textMuted};
      border-radius: 50%;
      animation: neo-typing-bounce 1.4s infinite;
    }

    .neo-typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .neo-typing-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes neo-typing-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }

    /* Input Area */
    #neo-chat-input-area {
      padding: 16px;
      background: ${COLORS.surface};
      border-top: 1px solid ${COLORS.border};
    }

    #neo-chat-input-wrapper {
      display: flex;
      gap: 10px;
      align-items: flex-end;
    }

    #neo-chat-input {
      flex: 1;
      border: 2px solid ${COLORS.border};
      border-radius: 24px;
      padding: 12px 18px;
      font-size: 14px;
      resize: none;
      outline: none;
      min-height: 48px;
      max-height: 120px;
      line-height: 1.4;
      background: ${COLORS.background};
      color: ${COLORS.text};
      transition: border-color 0.2s;
    }

    #neo-chat-input:focus {
      border-color: ${COLORS.accent};
    }

    #neo-chat-input::placeholder {
      color: ${COLORS.textMuted};
    }

    #neo-send-button {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: ${COLORS.accent};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    #neo-send-button:hover {
      background: ${COLORS.accentHover};
      transform: scale(1.05);
    }

    #neo-send-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    #neo-send-button svg {
      width: 22px;
      height: 22px;
      color: ${COLORS.primary};
    }

    /* Footer */
    #neo-chat-footer {
      padding: 10px 16px;
      text-align: center;
      font-size: 11px;
      color: ${COLORS.textMuted};
      background: ${COLORS.surface};
      border-top: 1px solid ${COLORS.border};
    }

    #neo-chat-footer a {
      color: ${COLORS.accent};
      text-decoration: none;
      font-weight: 600;
    }

    #neo-chat-footer a:hover {
      text-decoration: underline;
    }

    /* Error State */
    .neo-error {
      background: rgba(239, 68, 68, 0.1);
      color: ${COLORS.error};
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 13px;
      text-align: center;
      margin: 8px 0;
    }

    /* Quick Actions */
    .neo-quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .neo-quick-action {
      background: ${COLORS.accentLight};
      color: ${COLORS.primary};
      border: 1px solid ${COLORS.accent};
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .neo-quick-action:hover {
      background: ${COLORS.accent};
      color: ${COLORS.primary};
    }
  `;

  // ============================================
  // WIDGET CLASS
  // ============================================
  class NeoWidget {
    constructor() {
      this.isOpen = false;
      this.messages = [];
      this.conversationId = null;
      this.isTyping = false;
      this.init();
    }

    init() {
      this.injectStyles();
      this.createWidget();
      this.bindEvents();
      this.loadConversation();
    }

    injectStyles() {
      const style = document.createElement('style');
      style.id = 'neo-chat-styles';
      style.textContent = STYLES;
      document.head.appendChild(style);
    }

    createWidget() {
      const container = document.createElement('div');
      container.id = 'neo-chat-container';
      container.innerHTML = `
        <!-- Chat Button -->
        <button id="neo-chat-button" aria-label="Open chat with Neo">
          <img src="${CONFIG.logoUrl}" alt="Neo">
          <svg class="neo-close-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- Chat Window -->
        <div id="neo-chat-window" role="dialog" aria-label="Chat with Neo">
          <!-- Header -->
          <div id="neo-chat-header">
            <img id="neo-header-avatar" src="${CONFIG.logoUrl}" alt="Neo">
            <div id="neo-header-info">
              <div id="neo-header-title">${CONFIG.widgetTitle}</div>
              <div id="neo-header-subtitle">${CONFIG.widgetSubtitle}</div>
            </div>
            <div id="neo-header-status">Online</div>
          </div>

          <!-- Messages -->
          <div id="neo-chat-messages"></div>

          <!-- Input -->
          <div id="neo-chat-input-area">
            <div id="neo-chat-input-wrapper">
              <textarea 
                id="neo-chat-input" 
                placeholder="${CONFIG.placeholderText}"
                rows="1"
                aria-label="Type your message"
              ></textarea>
              <button id="neo-send-button" aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div id="neo-chat-footer">
            ${CONFIG.footerText}
          </div>
        </div>
      `;
      document.body.appendChild(container);

      // Cache DOM elements
      this.button = document.getElementById('neo-chat-button');
      this.window = document.getElementById('neo-chat-window');
      this.messagesContainer = document.getElementById('neo-chat-messages');
      this.input = document.getElementById('neo-chat-input');
      this.sendButton = document.getElementById('neo-send-button');
    }

    bindEvents() {
      // Toggle chat
      this.button.addEventListener('click', () => this.toggle());

      // Send message
      this.sendButton.addEventListener('click', () => this.sendMessage());
      
      // Enter to send (Shift+Enter for newline)
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      // Auto-resize textarea
      this.input.addEventListener('input', () => {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
      });

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggle();
        }
      });
    }

    toggle() {
      this.isOpen = !this.isOpen;
      this.button.classList.toggle('neo-open', this.isOpen);
      this.window.classList.toggle('neo-visible', this.isOpen);

      if (this.isOpen) {
        // Show opening message if no messages
        if (this.messages.length === 0) {
          this.showOpeningMessage();
        }
        setTimeout(() => this.input.focus(), 300);
      }
    }

    showOpeningMessage() {
      const message = OPENING_MESSAGES[Math.floor(Math.random() * OPENING_MESSAGES.length)];
      this.addMessage('bot', message);
      this.showQuickActions();
    }

    showQuickActions() {
      const actions = [
        "What's in the playbook?",
        "Help with Day 1",
        "RACE framework"
      ];

      const container = document.createElement('div');
      container.className = 'neo-quick-actions';
      
      actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'neo-quick-action';
        btn.textContent = action;
        btn.addEventListener('click', () => {
          container.remove();
          this.input.value = action;
          this.sendMessage();
        });
        container.appendChild(btn);
      });

      this.messagesContainer.appendChild(container);
      this.scrollToBottom();
    }

    addMessage(role, content) {
      const message = { role, content, timestamp: Date.now() };
      this.messages.push(message);
      this.renderMessage(message);
      this.scrollToBottom();
      this.saveConversation();
    }

    renderMessage(message) {
      const div = document.createElement('div');
      div.className = `neo-message neo-${message.role}`;
      
      const avatar = message.role === 'bot' 
        ? `<img src="${CONFIG.logoUrl}" alt="Neo">`
        : `<svg viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;

      div.innerHTML = `
        <div class="neo-message-avatar">${avatar}</div>
        <div class="neo-message-bubble">${this.formatMessage(message.content)}</div>
      `;

      // Remove quick actions if present
      const quickActions = this.messagesContainer.querySelector('.neo-quick-actions');
      if (quickActions) quickActions.remove();

      this.messagesContainer.appendChild(div);
    }

    formatMessage(text) {
      // Convert URLs to links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      text = text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener">$1</a>');
      
      // Convert newlines to breaks
      text = text.replace(/\n/g, '<br>');
      
      // Basic markdown bold
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return text;
    }

    showTyping() {
      this.isTyping = true;
      const div = document.createElement('div');
      div.id = 'neo-typing-indicator';
      div.className = 'neo-message neo-bot';
      div.innerHTML = `
        <div class="neo-message-avatar"><img src="${CONFIG.logoUrl}" alt="Neo"></div>
        <div class="neo-message-bubble">
          <div class="neo-typing">
            <div class="neo-typing-dot"></div>
            <div class="neo-typing-dot"></div>
            <div class="neo-typing-dot"></div>
          </div>
        </div>
      `;
      this.messagesContainer.appendChild(div);
      this.scrollToBottom();
    }

    hideTyping() {
      this.isTyping = false;
      const indicator = document.getElementById('neo-typing-indicator');
      if (indicator) indicator.remove();
    }

    showError(message) {
      const div = document.createElement('div');
      div.className = 'neo-error';
      div.textContent = message || 'Something went wrong. Please try again.';
      this.messagesContainer.appendChild(div);
      this.scrollToBottom();
      
      setTimeout(() => div.remove(), 5000);
    }

    scrollToBottom() {
      setTimeout(() => {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }, 50);
    }

    async sendMessage() {
      const text = this.input.value.trim();
      if (!text || this.isTyping) return;

      // Clear input
      this.input.value = '';
      this.input.style.height = 'auto';

      // Add user message
      this.addMessage('user', text);

      // Show typing
      this.showTyping();
      this.sendButton.disabled = true;

      try {
        // Prepare messages for API
        const apiMessages = this.messages
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .map(m => ({
            role: m.role === 'bot' ? 'assistant' : m.role,
            content: m.content
          }));

        // Call API
        const response = await fetch(CONFIG.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            conversationId: this.conversationId
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        this.hideTyping();
        this.conversationId = data.conversationId;
        
        if (data.message) {
          this.addMessage('bot', data.message);
        } else {
          throw new Error('No message in response');
        }

      } catch (error) {
        console.error('Neo chat error:', error);
        this.hideTyping();
        this.showError('Connection error. Please try again.');
      } finally {
        this.sendButton.disabled = false;
        this.input.focus();
      }
    }

    saveConversation() {
      try {
        const data = {
          messages: this.messages,
          conversationId: this.conversationId,
          timestamp: Date.now()
        };
        sessionStorage.setItem('neo-chat-data', JSON.stringify(data));
      } catch (e) {
        // Ignore storage errors
      }
    }

    loadConversation() {
      try {
        const data = JSON.parse(sessionStorage.getItem('neo-chat-data'));
        if (data && data.timestamp > Date.now() - 1800000) { // 30 min expiry
          this.messages = data.messages || [];
          this.conversationId = data.conversationId;
          this.messages.forEach(m => this.renderMessage(m));
        }
      } catch (e) {
        // Ignore storage errors
      }
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  function initNeo() {
    if (document.getElementById('neo-chat-container')) return;
    new NeoWidget();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNeo);
  } else {
    initNeo();
  }

})();
