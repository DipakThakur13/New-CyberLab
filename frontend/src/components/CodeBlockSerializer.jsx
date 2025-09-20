import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlockSerializer({ value }) {
  const { code = "", language = "bash" } = value || {};
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="my-4 rounded-md overflow-hidden shadow-md">
      <div className="flex items-center justify-between bg-slate-900/90 px-3 py-1 text-sm text-gray-300 font-mono">
        <span className="text-xs text-gray-400">{language}</span>
        <button onClick={copy} className="text-xs bg-slate-700/70 px-2 py-1 rounded text-gray-100 hover:bg-slate-600">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ margin: 0, padding: "1rem", background: "#0b1220" }} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
