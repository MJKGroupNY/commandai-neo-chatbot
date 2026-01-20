# Neo Chatbot - Command AI™

AI assistant chatbot for learncommandai.com, helping users with the AI Authority Accelerator playbook and 21-day implementation.

## Tech Stack

- **Backend:** Vercel Serverless Functions
- **AI:** Claude (Anthropic API)
- **Frontend:** Embeddable JavaScript widget
- **Embed Target:** Netlify (learncommandai.com)

## Quick Deploy

### 1. Create GitHub Repository

```bash
# Clone or create repo
git clone https://github.com/yourusername/commandai-neo-chatbot.git
cd commandai-neo-chatbot
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key
5. Click "Deploy"

### 3. Update Widget Endpoint

After deployment, copy your Vercel URL (e.g., `https://commandai-neo-chatbot.vercel.app`)

Edit `frontend/widget.js`, line ~18:
```javascript
apiEndpoint: 'https://commandai-neo-chatbot.vercel.app/api/chat',
```

Commit and push — Vercel auto-redeploys.

### 4. Add to Netlify Site

Add this script before `</body>` on learncommandai.com:

```html
<!-- Neo Chat Widget - Command AI -->
<script src="https://commandai-neo-chatbot.vercel.app/widget.js" async defer></script>
```

## File Structure

```
commandai-neo-chatbot/
├── api/
│   └── chat.js              # Serverless function (Claude API)
├── frontend/
│   └── widget.js            # Chat widget code
├── prompts/
│   └── system-prompt.md     # Reference copy of system prompt
├── vercel.json              # Vercel configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Configuration

### Colors (in widget.js)

```javascript
primary: '#0a1a2f',    // Deep navy
accent: '#d4af37',     // Command AI gold
```

### Opening Messages

Edit the `OPENING_MESSAGES` array in `widget.js` to customize greetings.

### Logo

Currently using Shopify CDN:
```
https://cdn.shopify.com/s/files/1/0729/6407/9808/files/NEO_Your_AI_Strategist.png?v=1768937579
```

## Testing

After deployment, visit learncommandai.com and test:

1. ✅ Click chat button — opens widget
2. ✅ "What's in the playbook?" — explains contents
3. ✅ "I'm stuck on Day 4" — helps with voice profile
4. ✅ "We're a team of 10 looking for help" — redirects to MJK
5. ✅ Mobile responsive — works on phone

## B2B Redirect Logic

Neo automatically redirects B2B prospects to MJK Group Global when they mention:
- Team/company context
- Done-for-you services
- Enterprise needs
- Budget over $1K/month

## Optional: Conversation Logging

To log conversations to Google Sheets:

1. Create a Google Sheet with columns: Timestamp, Conversation ID, Message Count, Last Message, Response, Source
2. Create a Google Apps Script web app to receive webhooks
3. Add `WEBHOOK_URL` environment variable in Vercel

## Support

Built for Command AI™ by MJK Group Global.

---

**Powered by Command AI™**
