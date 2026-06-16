import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { PageTransition } from "@/app/components/page-transition";
import { LangProvider } from "@/app/context/lang-context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LangProvider>
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </LangProvider>
  );
}
