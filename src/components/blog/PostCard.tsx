import { BlogPost } from '../../../interface';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

interface PostCardProps {
  post: BlogPost;
  currentUserId: string;
  index: number;
  onClick: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

export default function PostCard({ post, currentUserId, index, onClick, onDelete }: PostCardProps) {
  const authorId = post.author;
  const isOwner = currentUserId && currentUserId === authorId;

  return (
    <div
      className="post-card"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onClick(post)}
    >
      <div className="post-card-header">
        <h3 className="post-card-title">{post.title}</h3>
        {isOwner && (
          <div className="post-card-actions" onClick={(e) => e.stopPropagation()}>
            <button className="btn-post-delete" onClick={() => onDelete(post)}>Delete</button>
          </div>
        )}
      </div>

      <p className="post-card-meta">
        {formatDate(post.createdAt)}
      </p>

      <p className="post-card-preview">{post.content}</p>
    </div>
  );
}
