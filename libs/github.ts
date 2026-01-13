// app/lib/github.ts
export async function getGitHubStars() {
  const res = await fetch(
    "https://api.github.com/repos/projectlks/my-components",
    {
      next: { revalidate: 100 }, // revalidate every 1 hour
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.stargazers_count as number;
}
