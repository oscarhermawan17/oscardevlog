import { getHomePage } from "@/sanity/queries/home-page";
import { HomeContent } from "./_home-content";

export default async function Home() {
  const data = await getHomePage();
  return <HomeContent data={data} />;
}
