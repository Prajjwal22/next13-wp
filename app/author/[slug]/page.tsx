import LoadMore from '@/components/sections/threecolgrid/LoadMore';
import { getAllAuthors } from '@/lib/wordpress';
import { Metadata } from 'next';
import React from 'react'

export default function AuthorPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    return (
      <div>
        <LoadMore/>
      </div>
    )
}


// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
    const categories = await getAllAuthors();
  
    return categories.map((cat: Posts) => ({
      slug: cat.slug,
    }));
  }
  
  
  export const metadata: Metadata = {
    title: "PostPage",
    description: '...',
  }