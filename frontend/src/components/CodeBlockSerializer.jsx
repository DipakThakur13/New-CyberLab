import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlockSerializer({ value }) {
  if (!value?.code) return null;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      <SyntaxHighlighter
        language={value.language || "bash"}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.85rem",
          borderRadius: "0.5rem",
        }}
        wrapLongLines
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  );
}
