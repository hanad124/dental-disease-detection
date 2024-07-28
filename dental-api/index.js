import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const openai = new OpenAI({
  apiKey: "sk-proj-LvAb0pmrE09VeWXo5iA6T3BlbkFJJ2kQ4LNvKyZpPy3Ouxvr",
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
          content: `Provide a structured explanation and treatment recommendations for ${disease}. Format as follows: Title: <title>\nBody: <body>\nList: <comma separated list items>`,
        },
      ],
      model: "gpt-4",
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
