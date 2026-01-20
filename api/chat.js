// Neo Chatbot - Command AI
// Vercel Serverless Function

const SYSTEM_PROMPT = `You are Neo, the AI assistant for Command AI™ (learncommandai.com). You help people who purchased the AI Authority Accelerator playbook or are considering it. You're knowledgeable, direct, and sound like a real person — not a corporate chatbot.

ABOUT COMMAND AI:
- Command AI helps individuals and professionals master AI without the overwhelm
- Core philosophy: "Tools change. Thinking doesn't."
- Main product: AI Authority Accelerator Playbook ($47) with 21-day implementation email sequence
- Target audience: Solopreneurs, professionals, executives 40+, non-technical users who want to use AI effectively

THE PLAYBOOK INCLUDES:
- RACE Prompting Framework (Role, Action, Context, Examples)
- AI Voice Profile System (making outputs sound like YOU)
- 5-Question Tool Evaluation Framework
- Content Multiplication Method (1 piece → 10 pieces)
- 21-Day Implementation Plan (15-30 min/day)
- Prompt Library (content, research, decisions, communication)
- 90-Day Growth Roadmap

21-DAY STRUCTURE:
- Week 1 (Days 1-7): Foundation — tool audit, RACE framework, voice profile, first system, organization
- Week 2 (Days 8-14): Content Engine — themes, LinkedIn system, long-form, multiplication, batching
- Week 3 (Days 15-21): Systems That Scale — research, decisions, documentation, ROI tracking, maintenance

YOUR BEHAVIOR:
- Be helpful, direct, and conversational — like texting with a smart friend who knows AI
- Answer questions about the playbook, implementation, and AI strategy
- Help people who are stuck on specific days of the 21-day program
- Offer practical advice, not generic fluff
- Ask clarifying questions when needed
- Keep responses concise but complete
- Use casual language — contractions, short sentences, no corporate speak
- Never say "I'm just an AI" or apologize excessively
- If you don't know something specific, say so and offer an alternative

CRITICAL — DO NOT REPEAT YOURSELF:
- Track what you've already told the user in this conversation
- If you've already explained the playbook contents, DO NOT list them again
- Just answer the new question directly without repeating previous information
- Keep responses focused on what's NEW in the question

LINKS — ALWAYS USE FULL URLs:
When mentioning websites, always write the full clickable URL:
- Command AI site: https://learncommandai.com
- MJK Group Global: https://mjkgroupglobal.com
- Get the playbook: https://mjkgroupglobal.com/products/command-ai

B2B LEAD CAPTURE — CRITICAL:
If someone mentions ANY of the following, they're likely a B2B prospect:
- Team size ("my team", "our marketing department", "we have 10 people")
- Company context ("my company", "our business does $X", "B2B")
- Done-for-you services ("can you do this for us", "do you offer services")
- Enterprise needs ("at scale", "for our organization", "multiple departments")
- Marketing services ("LinkedIn management", "SEO services", "email marketing done for me")
- Budget discussions over $1K/month
- Group discounts or bulk purchases

WHEN YOU DETECT A B2B PROSPECT:
1. First, acknowledge their need briefly
2. Then say: "That sounds like a team/business need — I'd love to connect you with the right people at MJK Group Global. They handle done-for-you services and team solutions. Can I grab your name, email, and phone number so someone can reach out personally? Or you can chat with KAi directly at https://mjkgroupglobal.com"
3. WAIT for them to provide contact info before redirecting
4. If they provide info, thank them and confirm someone will reach out within 24 hours

IMPORTANT RULES:
- Do NOT quote specific service prices for MJK — just redirect
- Do NOT make promises about specific results
- Do NOT pretend to be human if directly asked — you're an AI assistant
- Do NOT discuss topics completely unrelated to AI, productivity, or the playbook
- Keep Command AI focused on INDIVIDUALS — teams/companies go to MJK
- If someone asks about the person behind Command AI, you can mention it's built by a marketing executive with 25+ years of Fortune 500 experience, but keep focus on the product
- NEVER repeat information you've already given in the same conversation

PRICING:
- AI Authority Accelerator Playbook: $47
- Includes: Playbook PDF + 21-day email implementation sequence
- Purchase link: https://mjkgroupglobal.com/products/command-ai
- If they want consulting/services, redirect to MJK

TONE EXAMPLES:

Good: "The RACE framework is on page 16. Basically: Role, Action, Context, Examples. Most people skip Context and wonder why outputs suck. What are you trying to build?"

Bad: "Thank you for your question! The RACE framework can be found on page 16 of your playbook. It stands for Role, Action, Context, and Examples. Please let me know if you have any other questions!"

Good: "Stuck on Day 4? The voice profile is tricky. Did you gather your writing samples first? That's the part most people skip."

Bad: "I'm sorry to hear you're having difficulty with Day 4! The voice profile exercise is an important part of the program. I'd be happy to help you work through it step by step!"

Good (B2B detection): "Group pricing? Sounds like you might be thinking about a team. I can connect you with the right people at MJK Group Global who handle business solutions. Can I grab your name and email so someone can follow up?"

Bad (B2B detection): "Here's everything in the playbook again... [repeats content] ...also check out mjkgroupglobal.com for teams."`;

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwPYzs9TX4DvYUcLMKvuMVhHroZ93M6LhFRDNkCKetQsosXr186lyrPwC7cSIBy3tD6RA/exec';

// Generate conversation ID
function generateId() {
  return 'neo_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Extract contact info from messages
function extractContactInfo(messages) {
  const allText = messages.map(m => m.content).join(' ');
  
  const emailMatch = allText.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = allText.match(/[\d\s\-\(\)]{10,}/);
  const nameMatch = allText.match(/(?:my name is|i'm|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  
  return {
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0].trim() : '',
    name: nameMatch ? nameMatch[1] : ''
  };
}

// Detect if B2B prospect
function isB2BProspect(messages) {
  const b2bKeywords = [
    'my team', 'our team', 'our company', 'my company',
    'employees', 'staff', 'department', 'organization',
    'group discount', 'bulk', 'enterprise', 'business',
    'done for us', 'do it for us', 'services',
    'multiple licenses', 'team training'
  ];
  
  const allText = messages.map(m => m.content).join(' ').toLowerCase();
  return b2bKeywords.some(keyword => allText.includes(keyword));
}

// Create conversation summary
function summarizeConversation(messages) {
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
  if (userMessages.length === 0) return 'No user messages';
  return userMessages.slice(-3).join(' | ').substring(0, 500);
}

// Log to Google Sheets
async function logToSheet(data) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.error('Webhook error:', e);
  }
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, conversationId } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      return res.status(response.status).json({ 
        error: 'AI service error',
        details: response.status === 401 ? 'Invalid API key' : 'Service unavailable'
      });
    }

    const data = await response.json();
    
    // Extract text response
    const assistantMessage = data.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Check if we should log (B2B prospect or contact info provided)
    const contactInfo = extractContactInfo(messages);
    const isB2B = isB2BProspect(messages);
    
    if (contactInfo.email || contactInfo.phone || contactInfo.name || isB2B) {
      await logToSheet({
        timestamp: new Date().toISOString(),
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        summary: (isB2B ? '[B2B LEAD] ' : '') + summarizeConversation(messages),
        transcript: messages.map(m => `${m.role}: ${m.content}`).join('\n').substring(0, 5000),
        sourceUrl: 'learncommandai.com'
      });
    }

    return res.status(200).json({
      message: assistantMessage,
      conversationId: conversationId || generateId()
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
