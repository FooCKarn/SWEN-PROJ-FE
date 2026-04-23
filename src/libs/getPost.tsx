export default async function getPost(postId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/blogs/${postId}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data?.data ?? null;
}