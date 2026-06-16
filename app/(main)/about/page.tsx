import type { Metadata } from "next";
import { getAboutPage } from "@/sanity/queries/about-page";
import { AboutContent } from "./_about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Inside the terminal and beyond — Oscar's story as a full-stack engineer and beginner content creator.",
};

export default async function AboutPage() {
  const data = await getAboutPage();
  return <AboutContent data={data} />;
}
