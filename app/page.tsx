import React, { ReactNode } from "react";
import Homepage from "@/components/templates/Homepage";
import type { Metadata } from 'next'

type HomeProps ={
  children?: ReactNode;
}

export default function Home() {
  return <Homepage/>;
}