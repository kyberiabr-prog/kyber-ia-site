export default async function handler(req, res) {
  // 🔥 LIBERA CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🔥 RESPONDE preflight (IMPORTANTE)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ]
        })
      }
    );
    
    const data = await response.json();
    
    console.log("Resposta Gemini:", JSON.stringify(data));
    
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(data);
    
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
