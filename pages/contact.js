import Head from "next/head";
import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContactForm from "../components/form/ContactForm";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";

export default function Contact({menu,footerMenu}) {
  return (
    <>
      <Head>
        <title>HowToShout - Get Latest Tech Guides</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={menu} />
      <main className="container">
      <h1 className="mb-10">Contact Us/Tip Us!
</h1>
<p>Contact us or reach us for any question, query or suggestion or if you want to tip us then, feel free to use this contact form to send us your query, or if you wish to partner up. We will try to connect with you shortly 🙂

</p></main>
      <ContactForm/>
      <Footer footerMenu={footerMenu} />
    </>
  );
}


export async function getStaticProps() {
    const result = await client.query({
      query: gql`
        query PostLists {
          Navigation: menu(id: "dGVybToxMw==") {
            menuItems {
                   nodes {
                     key: id
                     title: label
                     uri
                   }
                 }
           }
          menu(id: "dGVybToz") {
            menuItems {
                   nodes {
                     key: id
                     title: label
                     uri
                   }
                 }
           }
        }
      `,
    });
  
    return {
      props: {
        menu: result?.data?.Navigation.menuItems?.nodes,
        footerMenu: result?.data.menu.menuItems?.nodes,
      },
      revalidate: 10,
    };
  }