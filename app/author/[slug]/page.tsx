import LoadMore from '@/components/sections/threecolgrid/LoadMore';
import { getAllAuthors } from '@/lib/wordpress';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react'

export default async function AuthorPage({ params:{slug} }: { params: { slug: string } }) {

  const authorData = await getAllAuthors(slug)
    return (
      <div>
        <LoadMore authorData={authorData}/>
      </div>
    )
}


// Return a list of `params` to populate the [slug] dynamic segment
export async function generateMetadata(
  { params}: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const authorData = await getAllAuthors(slug)
  // fetch data

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: `Posts by ${slug}`,
    description: authorData.description,
   
    openGraph: {
      images: authorData.avatar.url,
    },
    alternates: {
      canonical: `https://howtoshout.com/author/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}