import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// OAuth State Store (in-memory for dev)
const oauthStates = new Map<string, { provider: string; redirectTo: string }>();

// Google OAuth
app.get("/api/auth/google", (req, res) => {
  const state = crypto.randomUUID();
  const appUrl = process.env.VITE_APP_URL || `${req.protocol}://${req.get("host")}`;
  const redirectUri = `${appUrl}/api/auth/google/callback`;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    return res.status(500).json({ error: "Google OAuth not configured" });
  }

  oauthStates.set(state, { provider: "google", redirectTo: "/dashboard" });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent("openid email profile")}` +
    `&state=${state}` +
    `&access_type=offline`;

  res.redirect(googleAuthUrl);
});

app.get("/api/auth/google/callback", async (req, res) => {
  const { code, state, error } = req.query;
  
  if (error || !oauthStates.has(state as string)) {
    return res.redirect("/signin?error=auth_failed");
  }

  oauthStates.delete(state as string);

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const appUrl = process.env.VITE_APP_URL || `${req.protocol}://${req.get("host")}`;
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code as string,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!tokenResponse.ok) {
      return res.redirect("/signin?error=auth_failed");
    }

    const tokens = await tokenResponse.json();
    
    const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`);
    const user = await userResponse.json();

    res.cookie("auth_token", tokens.id_token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie("user_info", JSON.stringify({ email: user.email, name: user.name, picture: user.picture }), { maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.redirect("/signin?error=auth_failed");
  }
});

// GitHub OAuth
app.get("/api/auth/github", (req, res) => {
  const state = crypto.randomUUID();
  const clientId = process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return res.status(500).json({ error: "GitHub OAuth not configured" });
  }

  oauthStates.set(state, { provider: "github", redirectTo: "/dashboard" });

  const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
    `client_id=${clientId}` +
    `&scope=${encodeURIComponent("user:email")}` +
    `&state=${state}`;

  res.redirect(githubAuthUrl);
});

app.get("/api/auth/github/callback", async (req, res) => {
  const { code, state, error } = req.query;
  
  if (error || !oauthStates.has(state as string)) {
    return res.redirect("/signin?error=auth_failed");
  }

  oauthStates.delete(state as string);

  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const tokens = await tokenResponse.json();
    
    if (!tokens.access_token) {
      return res.redirect("/signin?error=auth_failed");
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: { 
        "Authorization": `Bearer ${tokens.access_token}`,
        "User-Agent": "FinTrace-AI"
      }
    });
    const user = await userResponse.json();

    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: { 
        "Authorization": `Bearer ${tokens.access_token}`,
        "User-Agent": "FinTrace-AI"
      }
    });
    const emails = await emailResponse.json();
    const primaryEmail = emails.find((e: any) => e.primary)?.email || user.email;

    res.cookie("auth_token", tokens.access_token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie("user_info", JSON.stringify({ email: primaryEmail, name: user.name || user.login, picture: user.avatar_url }), { maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    res.redirect("/dashboard");
  } catch (err) {
    console.error("GitHub OAuth error:", err);
    res.redirect("/signin?error=auth_failed");
  }
});

// Auth status endpoint
app.get("/api/auth/status", (req, res) => {
  const userInfo = req.cookies?.user_info;
  if (userInfo) {
    res.json({ authenticated: true, user: JSON.parse(userInfo) });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout endpoint
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.clearCookie("user_info");
  res.json({ success: true });
});

// AI Investigation Endpoints
app.post("/api/analyze-transactions", (req, res) => {
  const { transactions } = req.body;
  res.json({
    summary: "Transaction batch received",
    count: transactions?.length || 0,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/fraud-risk/:accountId", (req, res) => {
  const { accountId } = req.params;
  res.json({
    accountId,
    riskScore: Math.floor(Math.random() * 100),
    lastUpdated: new Date().toISOString()
  });
});

app.get("/api/investigation-summary/:caseId", (req, res) => {
  const { caseId } = req.params;
  res.json({
    caseId,
    status: "Open",
    priority: "High",
    assignedTo: "AI Copilot"
  });
});

export default app;
