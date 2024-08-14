import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/explain", async (req, res) => {
  const { disease } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Briefly explain ${disease} and list key treatment options. Format as follows:
          Explanation: [2-3 sentences]
          Treatments: [3-5 bullet points]
          Title: <title>
          Body: <body>
          List: <comma separated list items>`,
        },
      ],
      model: "gpt-4o-mini",
    });

    res.status(200).json(completion.choices[0].message);
  } catch (error) {
    console.error("Error fetching explanation:", error);
    res.status(500).json({ error: "Error fetching explanation" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
