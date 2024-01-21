import Image from "next/image";
import styles from "./page.module.css";
import Homepage from "@/components/templates/Homepage";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Homepage>{children}</Homepage>;
}
