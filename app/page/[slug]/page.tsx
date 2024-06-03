import { getAllPages } from '@/lib/wordpress';
import { Metadata } from 'next';
import React from 'react'

export default function page({ params }: { params: { slug: string } }) {


    console.log("first")
  return (
    <div>page</div>
  )
}


// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page: Posts) => ({
    slug: page.slug,
  }));
}


export const metadata: Metadata = {
  title: "PostPage",
  description: '...',
}