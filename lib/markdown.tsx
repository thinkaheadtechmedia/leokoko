/**
 * Tiny, dependency-free Markdown renderer for devotionals.
 * Supports: headings, paragraphs, bold/italic, links, blockquotes, lists, code.
 * Enough for short-form spiritual content without pulling in a full MDX runtime.
 */

import React from "react";

function inline(text: string, keyBase: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let i = 0;
  let buf = "";
  let key = 0;
  const flush = () => {
    if (buf) parts.push(buf);
    buf = "";
  };

  while (i < text.length) {
    const ch = text[i];

    // **bold**
    if (ch === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        flush();
        parts.push(
          <strong key={`${keyBase}-b-${key++}`} className="text-gold-200">
            {text.slice(i + 2, end)}
          </strong>
        );
        i = end + 2;
        continue;
      }
    }

    // *italic*
    if (ch === "*") {
      const end = text.indexOf("*", i + 1);
      if (end !== -1) {
        flush();
        parts.push(<em key={`${keyBase}-i-${key++}`}>{text.slice(i + 1, end)}</em>);
        i = end + 1;
        continue;
      }
    }

    // [text](url)
    if (ch === "[") {
      const close = text.indexOf("]", i + 1);
      if (close !== -1 && text[close + 1] === "(") {
        const urlEnd = text.indexOf(")", close + 2);
        if (urlEnd !== -1) {
          flush();
          parts.push(
            <a
              key={`${keyBase}-a-${key++}`}
              href={text.slice(close + 2, urlEnd)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 underline decoration-gold-500/40 hover:decoration-gold-300"
            >
              {text.slice(i + 1, close)}
            </a>
          );
          i = urlEnd + 1;
          continue;
        }
      }
    }

    // `code`
    if (ch === "`") {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        flush();
        parts.push(
          <code
            key={`${keyBase}-c-${key++}`}
            className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-gold-200"
          >
            {text.slice(i + 1, end)}
          </code>
        );
        i = end + 1;
        continue;
      }
    }

    buf += ch;
    i++;
  }
  flush();
  return parts;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      const Tag = (`h${Math.min(level + 1, 6)}`) as keyof JSX.IntrinsicElements;
      const sizes = [
        "text-3xl md:text-4xl mt-10 mb-4 gold-text",
        "text-2xl md:text-3xl mt-8 mb-3 text-gold-200",
        "text-xl md:text-2xl mt-6 mb-2 text-gold-300",
        "text-lg mt-4 mb-2 text-gold-300",
      ];
      out.push(
        <Tag key={key++} className={`font-display ${sizes[level - 1]}`}>
          {inline(text, `h-${key}`)}
        </Tag>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i++;
      }
      out.push(
        <blockquote
          key={key++}
          className="my-6 border-l-4 border-gold-400/70 bg-white/[0.04] px-5 py-3 italic text-royal-100 rounded-r-lg"
        >
          {inline(buf.join(" "), `q-${key}`)}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      out.push(
        <ul key={key++} className="my-4 list-disc list-inside space-y-1.5 text-royal-100 marker:text-gold-400">
          {items.map((it, idx) => (
            <li key={idx}>{inline(it, `li-${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph (collect consecutive non-empty lines)
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>\s|[-*]\s)/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    out.push(
      <p key={key++} className="my-4 leading-relaxed text-royal-100">
        {inline(buf.join(" "), `p-${key}`)}
      </p>
    );
  }

  return <div className="font-sans">{out}</div>;
}
