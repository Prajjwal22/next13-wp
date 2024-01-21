export async function getMenu(id: string) {
  let menuID = `\"${id}\"`;
  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query NewQuery($menuID:ID!) {
            menu(id: $menuID) {
              menuItems {
                nodes {
                  label
                  uri
                  id
                }
              }
            }
          }
      `,
      variables: {
        menuID: menuID,
      },
    }),
    next: { revalidate: 10 },
  });
  const data = await res.json();
  console.log(data);
  return data.data.menu.menuItems.nodes;
}

export async function getPosts() {
  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query PostLists {
        posts(first:9) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            title
            slug
            modified
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
                slug
              }
            }
          }
        }
      }
      `,
    }),
    next: { revalidate: 10 },
  });
  const data = await res.json();

  return data.data.posts.nodes;
}

export async function getPaginatedPosts(endCursor: string) {
  let after = !endCursor ? "" : `\"${endCursor}\"`;

  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetPosts($after: String) {
        posts(first: 9, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            title
            slug
            modified
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            excerpt
            categories {
              nodes {
                name
                slug
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
                slug
              }
            }
          }
        }
      }
      `,
      variables: {
        after: after,
      },
    }),
    next: { revalidate: 10 },
  });

  const data = await res.json();
  return data.data.posts;
}

export async function getPostBySlug(postSlug: string) {
  let slug = !postSlug ? "" : `\"${postSlug}\"`;

  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetPosts($slug: String) {
        postBy(slug: $slug) {
          author {
            node {
              avatar {
                url
              }
              name
              slug
            }
          }
          postId
          categories {
            nodes {
              name
              slug
              posts(first: 4) {
                nodes {
                  title
                  slug
                  modified
                  categories {
                    nodes {
                      name
                      slug
                    }
                  }
                  excerpt
                  author {
                    node {
                      avatar {
                        url
                      }
                      name
                      slug
                    }
                  }
                  featuredImage {
                    node {
                      sourceUrl(size: LARGE)
                    }
                  }
                }
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              srcSet
            }
          }
          modified
          slug
          title
          content
          seo {
            fullHead
          }
        }
      }
      `,
      variables: {
        slug: postSlug,
      },
    }),
    next: { revalidate: 10 },
  });

  const data = await res.json();
  return data.data.postBy;
}

export async function getAllParams() {
  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetAllSlugs {
        posts(first: 100) {
          nodes {
            slug
          }
        }
      }
      `,
    }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();

  return data.data.posts.nodes;
}
