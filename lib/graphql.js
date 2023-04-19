
const endpoint = "https://api.howtoshout.com/graphql";

export async function getGraphQLQuery(query) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const { data } = await res.json();
  return data;
}
