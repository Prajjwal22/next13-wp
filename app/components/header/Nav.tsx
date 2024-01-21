import { getMenu } from '@/lib/wordpress'
import React from 'react'

export default async function Nav() {
    
  const menu = await getMenu()
  console.log(menu)
  return (
    <div>Nav</div>
  )
}
