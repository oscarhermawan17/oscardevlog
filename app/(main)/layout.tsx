import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { PageTransition } from "@/app/components/page-transition";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
