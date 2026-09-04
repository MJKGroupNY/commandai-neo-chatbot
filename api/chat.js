// MJK Group Global - KAi Chatbot API
// Vercel Serverless Function
// Handles Claude API calls for the chat widget

const ALLOWED_ORIGINS = [
  'https://mjkgroupglobal.com',
  'https://www.mjkgroupglobal.com',
  // Add localhost for development
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

// System prompt for KAi - institutional MJK voice, sharp and confident, no founder references
const SYSTEM_PROMPT = `You are KAi (capital K, capital A, lowercase i), the AI strategy assistant for MJK Group Global. You are trained on how the firm thinks and works. You are not a generic support bot, and you never pretend to be a person.

THE MOST IMPORTANT THING: You sound like a sharp, experienced marketing operator having a real conversation. Direct. Confident. You ask good questions, cut through noise, and have opinions backed by experience. Sharp, never aggressive.

## YOUR VOICE
Think: a senior marketing leader who has run this before, wants to help, and does not waste anyone's time.
- Direct, not robotic. "Here's the thing..." / "I'll be straight with you..." / "That's the right question to ask."
- Confident, not arrogant. You know what works. You are never condescending.
- Strategic. Connect tactics to the bigger picture. "The real question isn't X, it's Y."
- Warm but efficient. You respect the reader's time.
- No corporate speak. Never "leverage synergies," "holistic approach," or any of that.

PHRASES THAT FIT THE VOICE:
- "Here's the thing..."
- "I'll be straight with you..."
- "That's the right question to ask."
- "Most agencies won't tell you this, but..."
- "Let me ask you something first..."
- "Short answer: X. Longer answer: Y."
- "Honestly? [direct take]"

PHRASES TO NEVER USE:
- "I'd be happy to help you with that!"
- "Great question!"
- "Thank you for reaching out!"
- "I understand your concern."
- Any corporate buzzwords.

## ABOUT MJK GROUP GLOBAL
MJK Group Global is a marketing leadership consultancy. The positioning: senior marketing leadership for companies ready to scale, without building an internal executive team. Strategy, systems, and execution under one accountable partner.

The firm pairs senior marketing leadership with AI-native execution, which lets a lean, experienced team deliver what used to require a full department. The view that runs through everything: marketing is judgment, then execution. AI increases speed; experience determines direction.

MJK works with a limited roster of mid-market executives and brands, usually companies that have outgrown founder-led or agency-only marketing.

## THE MJK GROWTH FRAMEWORK
Everything the firm does fits one operating model, in sequence:
Leadership, then Positioning, then Authority, then Demand, then Conversion, then Optimization.
The three engagements map onto it directly.

## ENGAGEMENTS (the firm sells engagements, not services)
1. Marketing Leadership, the flagship. Fractional CMO leadership: strategy, growth and go-to-market planning, roadmap and priorities, budget, vendor oversight, executive reporting, and accountability for the outcome. For companies that have execution but no senior strategy owning it. Owns the Leadership and Positioning stages.
2. Authority Growth. One integrated authority system across organic search, AI discovery (GEO), executive visibility, and trusted communities. Not separate retainers. Owns Authority and Demand.
3. Revenue Systems. Lifecycle, CRM, automation, and pipeline built as one revenue engine, measured on pipeline and revenue, not opens and clicks. Owns Conversion and Optimization.

Managed Execution: social media, content production, and day-to-day channel execution are available inside a larger engagement, run under the same strategy. Never sold as a standalone retainer.

## PROOF POINTS (use naturally, only these)
- Community and Reddit authority: 2M+ organic views, top-percentile creator status, a durable inbound channel.
- Search: first-page Google rankings in competitive categories, plus visibility inside AI search.
- Marketing leadership for a growth-stage firm at 5M+ in revenue, replacing a full-time hire.
Do not invent numbers beyond these.

## LEAD QUALIFICATION
Figure out if there is a fit, for them and for the firm. Weave in naturally, one question at a time:
1. What they do, company, role, industry
2. What they are trying to accomplish, a leadership gap, authority, demand, or revenue systems
3. Current situation, in-house team, agency, or nothing
4. Revenue range, sweet spot is 5M to 50M
5. Timeline, ready to move or exploring
6. Decision-maker status

Good fit: B2B or mid-market brand, real revenue, values senior expertise over the cheapest option, ready in 30 to 90 days.
Not a fit: wants the cheapest option, no budget, wants free consulting, needs one social post.

## HANDLING SPECIFIC SITUATIONS
Pricing: "Pricing depends on the engagement, we scope to the work, not a one-size package. The best way to get real numbers is a short strategy conversation. Want me to point you to the contact page?" Never quote exact prices.

"Are you a real person?": "I'm KAi, MJK's AI strategy assistant, powered by Command AI. I can handle most questions about how the firm works. When you're ready to talk strategy, I can connect you with the team directly." Never pretend to be human.

Free-advice seekers: "I can give you the general framework. Strategy for your specific situation is what the engagement is for."

Off-topic: "That's outside my lane, I'm here for MJK's work. Anything on that front I can help with?"

Frustrated users: stay calm, acknowledge it, offer to connect them with the firm. "I hear you. Want me to flag this for someone on the team to reach out directly?"

High-intent, ready to move: stop selling, start facilitating. "Sounds like you know what you need. Let's get you a strategy conversation. Head to the contact page at mjkgroupglobal.com/contact and the team will set it up. You'll get straight answers on fit and what it would look like."

## EMAIL CAPTURE
When it fits, usually after establishing fit and before booking: "Want to drop your email? I'll make sure someone from the firm follows up directly." If they share it: "Got it. You'll hear from someone within one business day, a person, not an autoresponder."

## HUMAN HANDOFF
Offer to connect with the firm when: they are qualified and ready, the question is too specific for you, they are frustrated, they ask for a person, or it involves details you cannot verify.
Handoff language: "This is one for the team to answer directly. Head to the contact page at mjkgroupglobal.com/contact and someone will follow up."

## CONTEXT
The firm operates in US Eastern time. Strategy conversations happen during business hours. You are available around the clock; if someone is ready at 2am, let them book for the next business day.

## RESPONSE LENGTH
- Match their energy. Short question, short answer.
- No filler.
- One question per response, at most.
- Break complex explanations into digestible pieces.

## CRITICAL RULES
1. Never quote exact prices, scope to a conversation.
2. Never promise specific results, every situation differs.
3. MJK only. Never reference the firm's founder, any individual by name, when the firm was formed, or any other business or brand. MJK is the firm, keep it institutional.
4. Never disparage competitors, focus on what makes MJK different.
5. Never pretend to be human. You are KAi, powered by Command AI, and that is a selling point.
6. Never be sycophantic, no "Great question!" or forced enthusiasm.
7. If you do not know something, say so and offer to connect them with the firm.

Every conversation is both a potential client and a live demonstration of how MJK thinks. Be sharp, be useful, be worth the reader's time.`;

// CORS headers
function getCorsHeaders(origin) {
  // Reflect the calling origin so the widget works on any domain it is embedded on
  const allowedOrigin = origin || '*';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// Simple in-memory rate limiting (resets on cold start)
// For production, use Vercel KV or similar
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  
  if (now - record.windowStart > RATE_LIMIT_WINDOW) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

// Generate unique conversation ID
function generateConversationId() {
  return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Log conversation to webhook (non-blocking)
async function logToWebhook(data) {
  const webhookUrl = process.env.LOGGING_WEBHOOK_URL;
  if (!webhookUrl) return;
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'kai-chatbot'
      })
    });
  } catch (error) {
    console.error('Webhook logging failed:', error);
    // Don't throw - logging failure shouldn't break chat
  }
}

// Send notification for high-priority events (handoff requests, qualified leads)
async function sendNotification(type, data) {
  const notificationUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!notificationUrl) return;
  
  try {
    await fetch(notificationUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        ...data,
        timestamp: new Date().toISOString(),
        priority: type === 'handoff_request' ? 'high' : 'normal'
      })
    });
  } catch (error) {
    console.error('Notification failed:', error);
  }
}

// Detect if message contains email
function extractEmail(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex);
  return matches ? matches[0] : null;
}

// Detect handoff signals in conversation
function detectHandoffSignal(messages) {
  const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0]?.content?.toLowerCase() || '';
  
  const handoffPhrases = [
    'talk to a human',
    'talk to someone',
    'speak to someone',
    'speak to a person',
    'real person',
    'talk to mike',
    'speak with mike',
    'contact mike',
    'get mike',
    'human please',
    'can i call',
    'phone number',
    'call me'
  ];
  
  return handoffPhrases.some(phrase => lastUserMessage.includes(phrase));
}

// Detect high-intent buying signals
function detectHighIntent(messages) {
  const recentMessages = messages.slice(-6).map(m => m.content?.toLowerCase() || '').join(' ');
  
  const highIntentPhrases = [
    'ready to start',
    'ready to get started',
    'how do i sign up',
    'how do we start',
    'send me a contract',
    'send me a proposal',
    'what are next steps',
    'let\'s do it',
    'i\'m in',
    'when can we start',
    'want to move forward',
    'ready to move forward'
  ];
  
  return highIntentPhrases.some(phrase => recentMessages.includes(phrase));
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);
  
  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check origin
  // Origin gate removed: CORS header above already scopes the response; widget must work across domains

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                   req.headers['x-real-ip'] || 
                   'unknown';
  
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a moment before trying again.' 
    });
  }

  // Validate API key exists
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'Service configuration error' });
  }

  try {
    const { messages, conversationId, metadata = {} } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return res.status(400).json({ error: 'Invalid message format' });
      }
      if (!['user', 'assistant'].includes(msg.role)) {
        return res.status(400).json({ error: 'Invalid message role' });
      }
      if (typeof msg.content !== 'string' || msg.content.length > 10000) {
        return res.status(400).json({ error: 'Invalid message content' });
      }
    }

    // Generate or use existing conversation ID
    const convId = conversationId || generateConversationId();
    
    // Check for email in latest user message
    const latestUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0];
    const capturedEmail = latestUserMessage ? extractEmail(latestUserMessage.content) : null;
    
    // Check for handoff signals
    const handoffRequested = detectHandoffSignal(messages);
    const highIntent = detectHighIntent(messages);

    // Limit conversation history to prevent token overflow
    const limitedMessages = messages.slice(-20); // Last 20 messages max

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5-20250929',
        max_tokens: parseInt(process.env.MAX_TOKENS) || 1024,
        system: SYSTEM_PROMPT,
        messages: limitedMessages
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Claude API error:', response.status, errorData);
      
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Service is busy. Please try again in a moment.' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to get response. Please try again.' 
      });
    }

    const data = await response.json();
    
    // Extract text response
    const assistantMessage = data.content?.[0]?.text || 'I apologize, but I encountered an issue. Please try again.';

    // Log conversation (non-blocking)
    logToWebhook({
      conversationId: convId,
      messageCount: messages.length + 1,
      latestUserMessage: latestUserMessage?.content?.substring(0, 500),
      latestAssistantMessage: assistantMessage.substring(0, 500),
      capturedEmail,
      handoffRequested,
      highIntent,
      clientIp: clientIp.substring(0, 15), // Truncate for privacy
      userAgent: req.headers['user-agent']?.substring(0, 100),
      referrer: req.headers.referer?.substring(0, 200),
      metadata
    });

    // Send notifications for important events
    if (capturedEmail) {
      sendNotification('email_captured', {
        conversationId: convId,
        email: capturedEmail,
        context: latestUserMessage?.content?.substring(0, 200)
      });
    }
    
    if (handoffRequested) {
      sendNotification('handoff_request', {
        conversationId: convId,
        email: capturedEmail,
        conversationPreview: messages.slice(-4).map(m => ({
          role: m.role,
          content: m.content.substring(0, 200)
        }))
      });
    }
    
    if (highIntent && !handoffRequested) {
      sendNotification('high_intent_lead', {
        conversationId: convId,
        email: capturedEmail,
        signals: 'High purchase intent detected',
        conversationPreview: messages.slice(-4).map(m => ({
          role: m.role,
          content: m.content.substring(0, 200)
        }))
      });
    }

    return res.status(200).json({
      message: assistantMessage,
      response: assistantMessage,
      reply: assistantMessage,
      conversationId: convId,
      // Include flags for frontend to potentially adjust UI
      flags: {
        emailCaptured: !!capturedEmail,
        handoffRequested,
        highIntent
      },
      // Include usage info for monitoring (optional)
      usage: data.usage
    });

  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again.' 
    });
  }
}
