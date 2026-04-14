'use client';

import { useState, useEffect } from 'react';
import ModalWrapper from '../ModalWrapper';
import { ReviewItem } from '../../../interface';
import '@/styles/review.css';

interface ReviewModalProps {
  userName: string;
  bookingDate: string;
  existingReview?: ReviewItem | null;
  submitting: boolean;
  onConfirm: (rating: number, comment: string) => void;
  onClose: () => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? '#E8A020' : 'none'}
      stroke={filled ? '#E8A020' : '#C4BDB8'} strokeWidth="1.8">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export default function ReviewModal({
  userName, bookingDate, existingReview, submitting, onConfirm, onClose
}: ReviewModalProps) {
  const [rating,  setRating]  = useState(existingReview?.rating  ?? 0);
  const [hover,   setHover]   = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? '');
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  function handleSubmit() {
    if (rating === 0) { setError('Please select a star rating.'); return; }
    if (!comment.trim()) { setError('Please write a comment.'); return; }
    if (comment.trim().length > 100) { setError('Comment cannot exceed 100 characters.'); return; }
    setError('');
    onConfirm(rating, comment.trim());
  }

  const isEdit = !!existingReview;

  return (
    <ModalWrapper open onClose={onClose} className="review-modal-inner">
      {/* Header meta */}
      <div className="review-modal-meta" style={{ marginBottom: 18 }}>
        <span className="meta-tag meta-user">
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {userName}
        </span>
        <span className="meta-tag">
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {bookingDate}
          <span style={{ marginLeft: 2 }}>✏️</span>
        </span>
      </div>

      {/* Textarea */}
      <div className="review-textarea-wrap">
        <textarea
          className="review-textarea"
          placeholder="Write Your Review!!!"
          value={comment}
          maxLength={100}
          onChange={(e) => { setComment(e.target.value); setError(''); }}
        />
        <span className="textarea-limit">(limit 100 characters)</span>
      </div>

      {/* Star input */}
      <div className="star-rating-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="star-btn"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => { setRating(star); setError(''); }}
            type="button"
          >
            <StarIcon filled={(hover || rating) >= star} />
          </button>
        ))}
      </div>

      {error && (
        <p style={{ fontSize: '.8rem', color: '#A02020', marginBottom: 12 }}>{error}</p>
      )}

      {/* Actions */}
      <div className="modal-actions">
        <button className="btn-modal-cancel" onClick={onClose} disabled={submitting}>
          Cancel
        </button>
        <button
          className="btn-modal-confirm"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? <><span className="btn-spinner" />Saving…</> : (isEdit ? 'Save Changes' : 'Publish')}
        </button>
      </div>
    </ModalWrapper>
  );
}
