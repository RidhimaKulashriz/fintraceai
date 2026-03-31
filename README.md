
# FinTrace AI

AI-powered financial investigation platform with graph visualization, blockchain evidence tracking, and AI copilot assistance.

## Features

- **Interactive Graph Explorer** - Visualize financial connections and transaction flows
- **AI Copilot** - Get AI-powered insights for investigations
- **Blockchain Evidence** - Track and verify blockchain transactions
- **Case Reports** - Generate comprehensive investigation reports
- **OAuth Authentication** - Sign in with Google or GitHub
- **Dark/Light Theme** - Toggle between themes

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend:** Express.js (serverless API routes)
- **Authentication:** Google OAuth 2.0, GitHub OAuth
- **Deployment:** Vercel

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/RidhimaKulashriz/fintraceai.git
cd fintraceai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following:

```env
# Required for OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Optional - for production
VITE_APP_URL=https://your-domain.vercel.app
GEMINI_API_KEY=your_gemini_api_key
```

### OAuth Setup

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Google+ API
3. Create OAuth 2.0 credentials (Web application)
4. Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/google/callback`
5. Copy Client ID and Secret to `.env`

**GitHub OAuth:**
1. Go to Settings > Developer settings > OAuth Apps
2. New OAuth App
3. Authorization callback URL: `https://your-domain.vercel.app/api/auth/github/callback`
4. Copy Client ID and Secret to `.env`

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

**Important:** Set all environment variables in Vercel dashboard under Project Settings > Environment Variables.

### Manual Build

```bash
npm run build
# Output is in /dist
```

## Project Structure

```
├── api/
│   └── index.ts          # Serverless API routes (OAuth, auth status)
├── src/
│   ├── components/       # React components
│   ├── context/          # React context (Theme)
│   ├── lib/              # Utilities and data generators
│   ├── pages/            # Route pages
│   ├── App.tsx           # Main app with routes
│   └── main.tsx          # Entry point
├── vercel.json           # Vercel SPA routing configuration
└── package.json
```

## API Routes

| Route | Description |
|-------|-------------|
| `GET /api/auth/google` | Initiate Google OAuth |
| `GET /api/auth/google/callback` | Google OAuth callback |
| `GET /api/auth/github` | Initiate GitHub OAuth |
| `GET /api/auth/github/callback` | GitHub OAuth callback |
| `GET /api/auth/status` | Check auth status |
| `POST /api/auth/logout` | Logout |
| `POST /api/analyze-transactions` | Analyze transaction data |
| `GET /api/fraud-risk/:accountId` | Get fraud risk score |

## Troubleshooting

### OAuth redirect fails (404 or auth_failed error)

1. Verify `VITE_APP_URL` environment variable matches your actual domain
2. Check OAuth callback URLs are correctly configured in Google/GitHub console
3. Ensure all environment variables are set in Vercel dashboard

### Dashboard not loading after sign-in

The app uses cookie-based OAuth state for serverless compatibility. Ensure:
- Cookies are enabled in browser
- Third-party cookies are allowed for your domain

### Build fails

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## License

MIT
