import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-LvAb0pmrE09VeWXo5iA6T3BlbkFJJ2kQ4LNvKyZpPy3Ouxvr',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { disease } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: `Explain ${disease} and recommend treatments.` }],
        model: 'gpt-4',
      });

      res.status(200).json(completion.choices[0].message);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      res.status(500).json({ error: 'Error fetching explanation' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
