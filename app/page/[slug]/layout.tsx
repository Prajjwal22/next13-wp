import { getPageBySlug } from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container">{children}</div>;
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const page = await getPageBySlug(slug);

  // fetch data

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: page.title,
    description: page?.seo.metaDesc,

    alternates: {
      canonical: `https://howtoshout.com/page/${page?.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
