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

export async function getPaginatedPosts(
  endCursor: string,
  catSlug: string,
  authorSlug: string
) {
  let after = !endCursor ? "" : `\"${endCursor}\"`;
  let category = !catSlug ? " " : `\"${catSlug}\"`;
  let author = !authorSlug ? " " : `\"${authorSlug}\"`;

  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetPosts($after: String,$category: String!,$author:String!) {
        posts(first: 9, after: $after, where: {categoryName: $category, authorName:$author}) {
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
        category: category,
        author: author,
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
            metaDesc
            fullHead
            title
            schema {
              articleType
              pageType
            }
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

export async function getAllCategories() {
  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query CategoriesSlug {
        categories(first: 100) {
          nodes {
            slug
            databaseId
            name
          }
        }
      }
      `,
    }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();

  return data.data.categories.nodes;
}

export async function getAllPages() {
  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query Pages {
        pages(first: 100) {
          nodes {
            id
            title
            slug
          }
        }
      }
      `,
    }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.data.pages.nodes;
}

export async function getPageBySlug(postSlug: string) {
  let slug = !postSlug ? "" : `\"${postSlug}\"`;

  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetPages($slug: String) {
        pageBy(uri: $slug) {
          author {
            node {
              avatar {
                url
              }
              name
              slug
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
  return data.data.pageBy;
}

export async function getAllAuthors(authorSlug: string) {
  let slug = !authorSlug ? "" : `\"${authorSlug}\"`;
  const res = await fetch(`https://api.howtoshout.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetAuthor($slug: ID!) {
        user(id:  $slug, idType: SLUG) {
          username
          posts {
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
          description
          avatar {
            url
          }
          slug
        }
      }
      `,
      variables: {
        slug: authorSlug,
      },
    }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.data.user;
}

export async function getHomePageData() {
  try {
    const res = await fetch(`https://api.howtoshout.com/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query HomePage {
  seo {
    meta {
      homepage {
        description
        title
      }
    }
   openGraph {
      defaultImage {
        id
      }
      frontPage {
        image {
          sourceUrl(size: MEDIUM)
        }
      }
    }
    social {
      facebook {
        url
      }
      instagram {
        url
      }
      twitter {
        username
      }
    }
  }
}
        `,
      }),
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.data;
  } catch (err) {}
}

export async function getSearchResults(searchQuery: string) {
  try {
    const res = await fetch(`https://api.howtoshout.com/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
         query GetPostsBySearch($query: String!, $after: String) {
      searchPosts: posts(first: 10, after: $after, where: { search: $query }) {
        nodes {
          title
          excerpt
          slug
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
      `,
        variables: {
          query: searchQuery,
        },
      }),
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
}
