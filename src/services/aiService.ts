import { GoogleGenAI, Type } from "@google/genai";
import { Node, Link } from "../lib/data-generator";

// Initialize Gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY not set. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export interface FraudAnalysisResult {
  anomalyDetection: string;
  suspiciousChains: string[];
  riskExplanations: string;
  detectedPatterns: string[];
}

export interface InvestigationReport {
  summary: string;
  suspiciousAccounts: string[];
  insights: string[];
}

export class AIService {
  private static model = "gemini-3-flash-preview";

  /**
   * Analyzes a transaction dataset for fraud patterns.
   */
  static async analyzeTransactions(nodes: Node[], links: Link[]): Promise<FraudAnalysisResult> {
    const prompt = `
      Analyze the following transaction dataset for financial fraud patterns.
      Nodes (Accounts): ${JSON.stringify(nodes.slice(0, 50))}
      Links (Transactions): ${JSON.stringify(links.slice(0, 50))}

      Look for:
      - Circular transactions (A -> B -> C -> A)
      - Mule account patterns (many small incoming, one large outgoing)
      - Dormant account activation
      - Rapid fund dispersion

      Return the analysis in JSON format with the following structure:
      {
        "anomalyDetection": "Summary of anomalies",
        "suspiciousChains": ["Chain 1", "Chain 2"],
        "riskExplanations": "Detailed explanation of risks",
        "detectedPatterns": ["Pattern 1", "Pattern 2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            anomalyDetection: { type: Type.STRING },
            suspiciousChains: { type: Type.ARRAY, items: { type: Type.STRING } },
            riskExplanations: { type: Type.STRING },
            detectedPatterns: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["anomalyDetection", "suspiciousChains", "riskExplanations", "detectedPatterns"]
        }
      }
    });

    return JSON.parse(response.text);
  }

  /**
   * AI Copilot chat interaction.
   */
  static async askCopilot(question: string, context: any): Promise<string> {
    const prompt = `
      You are the FinTrace AI Investigation Copilot.
      Context: ${JSON.stringify(context)}
      User Question: ${question}

      Provide a professional, concise, and helpful response for a fraud investigator.
      If asked for fraud routes, explain them clearly.
      If asked to summarize, provide a high-level overview.
    `;

    const response = await ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class financial fraud investigator assistant."
      }
    });

    return response.text;
  }

  /**
   * Generates a formal investigation report.
   */
  static async generateReport(nodes: Node[], links: Link[]): Promise<InvestigationReport> {
    const prompt = `
      Generate a formal fraud investigation report based on this data:
      Nodes: ${JSON.stringify(nodes.slice(0, 20))}
      Links: ${JSON.stringify(links.slice(0, 30))}

      Return JSON:
      {
        "summary": "Overall summary",
        "suspiciousAccounts": ["Account ID 1", "Account ID 2"],
        "insights": ["Insight 1", "Insight 2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suspiciousAccounts: { type: Type.ARRAY, items: { type: Type.STRING } },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "suspiciousAccounts", "insights"]
        }
      }
    });

    return JSON.parse(response.text);
  }
}
