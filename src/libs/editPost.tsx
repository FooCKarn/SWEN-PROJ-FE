import { BlogPost } from '../../interface';

export default async function editPost(
  token: string,
  postId: string,
  title: string,
  content: string
): Promise<BlogPost> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/blogs/${postId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || data.msg || 'Failed to update post');
  return data.data;
}
