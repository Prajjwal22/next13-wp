import React from 'react'
import Header from '@/components/header/Header';
import { getMenu } from '@/lib/wordpress';

export default async function Homepage({children}: Readonly<{
    children: React.ReactNode;
  }>) {


    const menu = await getMenu()
    console.log(menu)
  return (
   <>
   <Header menu={menu}/>
   </>
  )
}
