import { getGraphQLQuery } from "../lib/graphql";

const Sitemap = () => {};

export async function getServerSideProps({ res }) {
    const limit = 100;
    let hasNextPage = true;
    let endCursor = null;
    let posts = [];
  
    while (hasNextPage) {
      const data = await getGraphQLQuery(`
        query {
          posts(
            where: { status: PUBLISH }
            first: ${limit}
            after: "${endCursor || ''}"
          ) {
            nodes {
              slug
              modified
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `);
  
      posts = [...posts, ...data.posts.nodes];
      hasNextPage = data.posts.pageInfo.hasNextPage;
      endCursor = data.posts.pageInfo.endCursor;
    }


  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

 // Add blog post URLs to sitemap
 posts.forEach((post) => {
    const lastModDate = new Date(post.modified).toISOString().split("T")[0];
    sitemapXml += `
      <url>
        <loc>https://howtoshout.com/${post.slug}</loc>
        <lastmod>${lastModDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  sitemapXml += `
    </urlset>`;

  // Set content-type header to XML
  res.setHeader("Content-Type", "text/xml");

  // Write the sitemap XML to the response
  res.write(sitemapXml);

  // End the response
  res.end();

  // Return an empty object as props
  return {
    props: {},
  };
}

export default Sitemap;
