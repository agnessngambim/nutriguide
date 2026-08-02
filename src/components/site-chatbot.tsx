import { Link } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { CONDITIONS } from "@/data/conditions";

const STORAGE_KEY = "nutriguide-admin-plans";

type StoredPlan = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  specifications: string;
  pdfName: string;
  pdfDataUrl?: string;
  soldCount: number;
  createdAt: string;
};

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const askSiteAssistant = createServerFn({ method: "POST" })
  .validator((data: { message: string }) => data)
  .handler(async ({ data }) => {
    const message = String(data?.message ?? "").trim();

    if (!message) {
      return { answer: "Please tell me what condition or plan you need help with." };
    }

    const apiKey = typeof process !== "undefined" ? process.env.GEMINI_API_KEY : undefined;
    const model =
      typeof process !== "undefined" ? process.env.GEMINI_MODEL ?? "gemini-flash-latest" : "gemini-flash-latest";

    if (!apiKey) {
      return {
        answer:
          "The Gemini AI model is not connected yet. I can still guide you with the website content, so try asking for a condition such as diabetes, HIV, hypertension, or weight loss, and I’ll help point you to the right place.",
      };
    }

    const conditionNames = CONDITIONS.map((condition) => condition.name).join(", ");
    const systemGuidance =
      "You are a helpful nutrition sales assistant for People's Choice Nutrition Care. Answer using only the site's known content and social/ecommerce context. If the user asks about price, answer in dollars and mention mobile money or bank transfer as payment options. If the user asks about a condition, recommend the relevant Build My Plan page and related paid guides. Do not invent prices or medical claims.";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemGuidance}\n\nKnown supported conditions: ${conditionNames}.\n\nUser question: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.35,
          },
        }),
      },
    );

    if (!response.ok) {
      return {
        answer:
          "The AI service is temporarily unavailable. You can still browse the site and use the Build My Plan page for a free guide.",
      };
    }

    const payload = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    return {
      answer:
        payload.candidates?.[0]?.content?.parts?.[0]?.text ??
        "I’m not able to answer that right now.",
    };
  });

function readPlansFromStorage(): StoredPlan[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredPlan[]) : [];
  } catch {
    return [];
  }
}

function getConditionMatch(query: string) {
  const q = query.toLowerCase();
  return CONDITIONS.find((condition) => {
    return [condition.name, condition.id, condition.goal, condition.cat]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}

function buildBotReply(query: string, plans: StoredPlan[]) {
  const trimmed = query.trim();
  const lowered = trimmed.toLowerCase();

  if (!trimmed) {
    return "Tell me what condition or diet plan you want help finding, and I’ll point you in the right direction.";
  }

  const conditionMatch = getConditionMatch(lowered);
  const matchingPlans = plans.filter((plan) => {
    const haystack = [
      plan.title,
      plan.category,
      plan.description,
      plan.specifications,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(lowered);
  });

  if (lowered.includes("price") || lowered.includes("cost") || lowered.includes("how much")) {
    if (matchingPlans.length > 0) {
      return `I found ${matchingPlans.length} related plan${matchingPlans.length === 1 ? "" : "s"}: ${matchingPlans
        .map((plan) => `${plan.title} at $${plan.price}`)
        .join(" • ")}. You can pay with mobile money or bank transfer.`;
    }

    if (conditionMatch) {
      return `For ${conditionMatch.name}, the free preview is available on the Build My Plan page. Paid guides are priced separately in the shop section, and the exact amount depends on the uploaded plan you choose.`;
    }

    return "I can help you compare plan prices once you tell me the condition or plan name you are looking for, such as diabetes, weight loss, HIV, or hypertension.";
  }

  if (matchingPlans.length > 0) {
    const top = matchingPlans[0];
    return `I found a matching guide: ${top.title} (${top.category}) for $${top.price}. It covers ${top.description.toLowerCase()}. You can view the PDF or go to the Build My Plan page for a free starter version.`;
  }

  if (conditionMatch) {
    return `You’re likely looking for ${conditionMatch.name}. Try the free preview on the Build My Plan page, and if you want a more detailed guide, check the related paid plans that appear for that condition.`;
  }

  if (lowered.includes("condition") || lowered.includes("health") || lowered.includes("support")) {
    return "This site supports common nutrition concerns like diabetes, hypertension, heart disease, kidney disease, gout, gastritis, weight management, HIV, TB, and diarrhoea. Use the search box or ask me for a specific condition.";
  }

  if (lowered.includes("payment") || lowered.includes("momo") || lowered.includes("bank")) {
    return "Plans can be paid for in dollars using mobile money or bank transfer. The site is set up to present those payment options alongside the product cards.";
  }

  if (lowered.includes("where") || lowered.includes("how") || lowered.includes("plan")) {
    return "You can start from the home page, open the Build My Plan page for a free preview, and then browse the related paid guide options that match your search.";
  }

  return "I can help you find the right condition, review the free starter plan, and compare related paid nutrition guides. Try asking for a condition like diabetes, HIV, hypertension, or weight loss.";
}

export function SiteChatbot() {
  const askSiteAssistantFn = useServerFn(askSiteAssistant);
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState<StoredPlan[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you find a condition, compare nutrition plans, and check the related prices. Try asking for diabetes, HIV, hypertension, or weight loss.",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setPlans(readPlansFromStorage());

    const syncPlans = () => setPlans(readPlansFromStorage());
    window.addEventListener("storage", syncPlans);

    return () => window.removeEventListener("storage", syncPlans);
  }, []);

  const planSummary = useMemo(() => {
    return plans
      .slice(0, 4)
      .map((plan) => `${plan.title} — $${plan.price}`)
      .join(" • ");
  }, [plans]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((current) => [...current, userMessage]);
    setInput("");

    try {
      const result = await askSiteAssistantFn({ data: { message: text } });
      const assistantReply = result.answer ?? buildBotReply(text, plans);
      const assistantMessage: ChatMessage = { role: "assistant", content: assistantReply };
      setMessages((current) => [...current, assistantMessage]);
    } catch {
      const assistantReply = buildBotReply(text, plans);
      const assistantMessage: ChatMessage = { role: "assistant", content: assistantReply };
      setMessages((current) => [...current, assistantMessage]);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[360px] overflow-hidden rounded-[22px] border border-line bg-paper shadow-[0_20px_60px_rgba(11,57,43,0.18)]">
          <div className="flex items-center justify-between bg-leaf px-4 py-3 text-primary-foreground">
            <div>
              <div className="text-sm font-semibold">People’s Choice Assistant</div>
              <div className="text-[11px] uppercase tracking-[0.12em] text-primary-foreground/70">
                Website guide · plan finder
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/30 px-2.5 py-1 text-xs font-semibold"
            >
              Close
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto bg-sand/40 p-4 text-[14px]">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-2xl px-3 py-2 ${
                  message.role === "assistant"
                    ? "bg-paper text-ink"
                    : "ml-auto bg-leaf text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            ))}
            {plans.length > 0 ? (
              <div className="rounded-2xl border border-line bg-paper px-3 py-2 text-[13px] text-ink-soft">
                Current catalog highlights: {planSummary}
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-line bg-paper p-3">
            <div className="mb-2 text-[11px] uppercase tracking-[0.12em] text-ink-soft">
              Ask about conditions, prices, or plans
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about diabetes, HIV, or plan prices"
                className="min-w-0 flex-1 rounded-lg border border-line bg-sand px-3 py-2 text-sm outline-none focus:outline-2 focus:outline-offset-1 focus:outline-leaf"
              />
              <button
                type="submit"
                className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-leaf px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_rgba(15,63,53,0.24)]"
        >
          Chat with us
        </button>
      )}

      <div className="mt-2 text-right text-[11px] text-ink-soft">
        <Link to="/plan" className="underline-offset-2 hover:underline">
          Open Build My Plan
        </Link>
      </div>
    </div>
  );
}
