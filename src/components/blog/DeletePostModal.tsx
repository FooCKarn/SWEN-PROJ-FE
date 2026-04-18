'use client';

import ModalWrapper from '../ModalWrapper';

interface DeletePostModalProps {
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeletePostModal({ loading, onConfirm, onClose }: DeletePostModalProps) {
  return (
    <ModalWrapper open onClose={onClose}>
      <div className="modal-icon">🗑️</div>
      <h3>Delete Post?</h3>
      <p>
        Are you sure you want to delete this post?
        <br />
        <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
          This action cannot be undone.
        </span>
      </p>
      <div className="modal-actions">
        <button className="btn-modal-cancel" onClick={onClose}>Keep It</button>
        <button className="btn-modal-confirm" onClick={onConfirm} disabled={loading}>
          {loading ? <><span className="btn-spinner" />Deleting…</> : 'Yes, Delete'}
        </button>
      </div>
    </ModalWrapper>
  );
}
