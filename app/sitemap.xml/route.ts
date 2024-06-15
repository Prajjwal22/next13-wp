


const fetchPosts = async () => {
  const perPage = 100; // Number of posts to fetch per request
  let page = 1;
  let allPosts: Posts[] = [];

  try {
    while (true) {
      const response = await fetch(
        `https://api.howtoshout.com/wp-json/wp/v2/posts?_fields=slug,id,modified&per_page=${perPage}&page=${page}`,
        { next: { revalidate: 3600 } }
      );

      const data = await response.json();
      if (data.code === 'rest_post_invalid_page_number') {
        break; // No more posts to fetch, exit the loop
      }

      if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
      }

      allPosts = [...allPosts, ...data];
      page++;
    }

    return allPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

const URL = "https://howtoshout.com/";

function generateSiteMap(allPosts: Posts[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${URL}</loc>
     </url>
     ${allPosts
       .map(({ slug, modified }) => {
         return `
           <url>
               <loc>${`${URL}${slug}`}</loc>
               <lastmod>${new Date(modified).toISOString()}</lastmod>

           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function GET() {
  const posts = await fetchPosts();
  const body = generateSiteMap(posts);

  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}