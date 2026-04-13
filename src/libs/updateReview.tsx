import { ReviewItem } from '../../interface';

export default async function updateReview(
  token: string,
  reviewId: string,
  rating: number,
  comment: string
): Promise<ReviewItem> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/reviews/${reviewId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, comment }),
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || data.msg || 'Failed to update review');
  return data.data;
}
