import { useState } from "react";
import { createPortal } from "react-dom";
// eslint-disable-next-line react/prop-types
export function ModalContent({ onClose }) {
  return (
    <div className="modal">
      <div>Modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
