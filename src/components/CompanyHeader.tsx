import { CompanyItem } from '../../interface';
import StarDisplay from './StarDisplay';

interface CompanyHeaderProps {
  company: CompanyItem;
  reviewCount: number;
  /** ID of the currently-logged-in user (empty string if not logged in) */
  currentUserId: string;
  /** true if the logged-in user already has a review for this company */
  hasUserReview: boolean;
  onOpenReviewModal: () => void;
  onOpenBookModal: () => void;
}

/**
 * Top section of the company profile page.
 * Shows the company logo, name, address, description, star rating and action buttons.
 */
export default function CompanyHeader({
  company,
  reviewCount,
  currentUserId,
  hasUserReview,
  onOpenReviewModal,
  onOpenBookModal,
}: CompanyHeaderProps) {
  const avgRating = company.averageRating ?? 0;

  return (
    <div className="company-header">
      {/* Logo */}
      <div className="company-logo-box">
        <span className="company-logo-placeholder">🏢</span>
      </div>

      {/* Info */}
      <div className="company-header-info">
        <h1>{company.name}</h1>
        {company.address && (
          <p className="company-header-address">{company.address}</p>
        )}
        {company.description && (
          <p className="company-header-desc">{company.description}</p>
        )}

        {/* Rating summary */}
        <div className="company-rating-row">
          <StarDisplay rating={avgRating} />
          <span className="company-rating-text">
            <strong>{avgRating.toFixed(1)}/5.0</strong>
            {' '}({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>

        {/* Action buttons */}
        <div className="company-actions">
          {currentUserId && (
            <button className="btn-review-now" onClick={onOpenReviewModal}>
              {hasUserReview ? '✏️ Edit Review' : 'Reviews Now!'}
            </button>
          )}
          <button className="btn-book-now" onClick={onOpenBookModal}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}