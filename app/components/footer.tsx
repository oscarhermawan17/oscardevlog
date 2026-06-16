export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted sm:flex-row">
        <p className="font-mono">
          <span className="text-sky">oscardevlog.me</span> — built &amp;
          deployed by Oscar.
        </p>
        <p>© {new Date().getFullYear()} Oscar Hermawan. All rights reserved.</p>
      </div>
    </footer>
  );
}
