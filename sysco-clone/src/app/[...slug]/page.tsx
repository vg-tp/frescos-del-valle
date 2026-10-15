import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/SiteChrome";
import InteriorPage from "@/components/InteriorPage";
import { allPages, findPage } from "@/content/nav";
import { getInterior, interiorHrefs } from "@/content/interiors";
import { site } from "@/content/home";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  const hrefs = new Set([...allPages.map((p) => p.href), ...interiorHrefs]);
  return [...hrefs].map((href) => ({
    slug: href.replace(/^\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(`/${slug.join("/")}`);
  if (!page) return { title: site.title };
  return {
    title: `${page.title} | ${site.title}`,
    description: site.description,
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const content = getInterior(path);
  if (!content) notFound();

  return (
    <SiteChrome>
      <InteriorPage content={content} />
    </SiteChrome>
  );
}
