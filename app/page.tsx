"use client";

import { useEffect, useState } from "react";
import { prompt } from "./actions/groq";

export default function Home() {
  const [promptMsg, setPromptMsg] = useState("");
  const [responseMst, setResponseMsg] = useState("");
  const [displayMsg, setDisplayMsg] = useState("");

  const send = async (e: any) => {
    e.preventDefault();
    setPromptMsg("")
    const res = await prompt(promptMsg);
    setResponseMsg(res);
  };

  useEffect(() => {
    setDisplayMsg("");
    if (responseMst.length > 0) {
      const fakeStreamText = async () => {
        let count = 0;
        do {
          setDisplayMsg((prev) => prev + responseMst[count]);
          await new Promise((resolve) => setTimeout(resolve, 25));
          count++;
        } while (count < responseMst.length);
      };
      fakeStreamText();
    }
  }, [responseMst]);

  return (
    <form onSubmit={send} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center">
        AI App Wrapper
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <input
          className="text-[black]"
          type="text"
          value={promptMsg}
          onChange={(e) => setPromptMsg(e.target.value)}
        />
        <button type='submit'>Submit</button>
        <textarea className="text-[black] w-screen" value={displayMsg} />
      </div>
    </form>
  );
}
