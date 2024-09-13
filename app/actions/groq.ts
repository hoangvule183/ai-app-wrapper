'use server'

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" });

  
  export async function prompt(message: string) {
   const res = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });
    console.log(res.choices);
    console.log(res.choices[0]?.message?.content || "");
    return res.choices[0]?.message?.content || ""
  }