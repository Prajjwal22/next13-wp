export async function getMenu() {

    const res= await fetch(`https://api.howtoshout.com/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query NewQuery {
            menu(id: "dGVybToxMw==") {
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
        }),
        next: { revalidate: 10 },
      })
      const data = await res.json()
      return data.data.menu.menuItems.nodes
    }
