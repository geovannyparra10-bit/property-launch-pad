import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CATEGORY_CONTEXT: Record<string, string> = {
  "house-hack": "house hacking strategies (buying a multi-unit or single-family property, living in one unit/room, and renting the others to offset mortgage costs)",
  "brrr": "the BRRR strategy (Buy, Rehab, Rent, Refinance, Repeat) for building a real estate portfolio",
  "flip": "fix-and-flip investing (buying undervalued properties, renovating them, and selling for a profit)",
  "rental": "long-term rental property investing (buy-and-hold strategy, cash flow, property management)",
  "owner-finance": "owner/seller financing (creative financing where the seller acts as the bank)",
  "deals": "real estate deal analysis, sourcing, and evaluation",
  "introductions": "getting started in real estate investing and introducing yourself to the community",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { post_id, title, body, category, lang } = await req.json();

    if (!post_id || !title || !body) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const categoryContext = CATEGORY_CONTEXT[category] || "real estate investing";
    const isSpanish = lang === "es";

    const systemPrompt = isSpanish
      ? `Eres un asistente experto en inversión inmobiliaria para Property Launch Pad. Tu objetivo es dar respuestas prácticas, específicas y útiles a publicaciones del foro sobre ${categoryContext}. Responde en español. Sé conciso pero completo — entre 150 y 300 palabras. Usa viñetas cuando sea útil. Enfócate en consejos accionables. No uses emojis.`
      : `You are an expert real estate investing assistant for Property Launch Pad. Your goal is to give practical, specific, and helpful replies to forum posts about ${categoryContext}. Be concise but thorough — 150 to 300 words. Use bullet points where helpful. Focus on actionable advice. Do not use emojis.`;

    const userPrompt = isSpanish
      ? `Un miembro de la comunidad publicó lo siguiente en la categoría "${category}":\n\nTítulo: ${title}\n\n${body}\n\nProporciona una respuesta útil con consejos prácticos sobre bienes raíces. No menciones que eres una IA al principio — simplemente da el consejo.`
      : `A community member posted the following in the "${category}" category:\n\nTitle: ${title}\n\n${body}\n\nProvide a helpful reply with practical real estate advice. Do not mention you're an AI at the start — just give the advice.`;

    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Anthropic error:", errText);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const aiText = aiData.content?.[0]?.text ?? "";

    const disclaimer = isSpanish
      ? "\n\n*Esta es una respuesta generada por IA. Los miembros de la comunidad pueden tener perspectivas adicionales basadas en su experiencia personal.*"
      : "\n\n*This is an AI-generated response. Community members may have additional insights from their personal experience.*";

    const fullReply = aiText + disclaimer;

    const authorName = isSpanish ? "IA de Property Launch Pad" : "Property Launch Pad AI";

    const { error: insertError } = await supabase.from("forum_replies").insert({
      post_id,
      user_id: null,
      author_name: authorName,
      body: fullReply,
      is_ai: true,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save AI reply" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase.rpc("increment_reply_count", { post_id_arg: post_id });

    return new Response(JSON.stringify({ success: true, reply: fullReply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
