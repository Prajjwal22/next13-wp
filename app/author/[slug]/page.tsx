import LoadMore from '@/components/sections/threecolgrid/LoadMore';
import { getAllAuthors } from '@/lib/wordpress';
import { Metadata } from 'next';
import React from 'react'

export default async function AuthorPage({ params:{slug} }: { params: { slug: string } }) {

  const authorData = await getAllAuthors(slug)
  console.log(authorData)
    return (
      <div>
        <LoadMore/>
      </div>
    )
}


// Return a list of `params` to populate the [slug] dynamic segment
