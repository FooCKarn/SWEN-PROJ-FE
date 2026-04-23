'use client';

import Link from 'next/link';

/**
 * ContentRemovedPage — shared fallback UI shown whenever a blog post
 * has been removed by an administrator.
 *
 * Used by:
 *   - /blog/[id]/page.tsx  (when the API returns null / 404)
 */
export default function ContentRemovedPage() {
  return (
    <div className="blog-page" style={{ textAlign: 'center', paddingTop: 80 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 72, height: 72, borderRadius: '50%',
        background: '#FFF0EC', fontSize: '2rem', marginBottom: 24,
      }}>
        🚫
      </div>

      <h2 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: '1.6rem', marginBottom: 12, color: 'var(--text)',
      }}>
        Content Removed by Administrator
      </h2>

      <p style={{
        fontSize: '0.9rem', color: 'var(--muted)',
        maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7,
      }}>
        This blog post has been permanently removed due to a violation
        of our community guidelines. The original content is no longer
        available.
      </p>

      <Link href="/blog">
        <button className="btn-create-post" style={{ background: 'var(--text)' }}>
          ← Back to Blog Feed
        </button>
      </Link>
    </div>
  );
}