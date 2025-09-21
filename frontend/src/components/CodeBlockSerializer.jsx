// src/components/CodeBlockSerializer.jsx
import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import vs2015 from "react-syntax-highlighter/dist/esm/styles/hljs/vs2015";
import { copy } from "copy-to-clipboard";

/**
 * value = { language: 'bash', code: '...'}
 */
export default function CodeBlockSerializer({ value }) {
  const code = value?.code || value?.children?.[0]?.text || "";
  const language = (value?.language || "text").toLowerCase();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 relative rounded-md overflow-hidden border dark:border-slate-700">
      <div className="flex items-center justify-between bg-slate-900 px-3 py-1 text-xs text-slate-200">
        <div className="font-medium">{language}</div>
        <button onClick={handleCopy} className="ml-2 px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-xs">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter language={language} style={vs2015} customStyle={{ margin: 0, padding: "1rem", background: "#0b1220" }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
