import { createHighlighter } from "shiki";

let _highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (!_highlighter) {
    _highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: [
        "javascript", "typescript", "jsx", "tsx",
        "html", "css", "bash", "json", "sql", "python",
      ],
    });
  }
  return _highlighter;
}

export async function highlightCode(code: string, language: string): Promise<string> {
  const hl = await getHighlighter();
  const lang = hl.getLoadedLanguages().includes(language as never) ? language : "text";
  return hl.codeToHtml(code, { lang, theme: "github-dark" });
}
