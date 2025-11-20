import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detect if we're in dark mode
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="copy-button"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span className="ml-1.5">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="ml-1.5">Copy</span>
            </>
          )}
        </Button>
      </div>
      <div className="code-block-content">
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            fontSize: '0.875rem',
            lineHeight: '1.7',
            borderRadius: 0,
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
