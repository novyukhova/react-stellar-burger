import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

function Modal({ onClose, children, title }) {
  const closeOnEscape = useCallback(
    (event) => event.key === "Escape" && onClose(),
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeOnEscape]);

  return (
    <ModalOverlay onClick={onClose}>
      <div
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        style={{
          backgroundColor: "#1C1C21",
          borderRadius: "40px",
          boxShadow:
            "0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 4px 8px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.04), 0px 24px 32px 0px rgba(0, 0, 0, 0.04)",
          // minHeight: "539px",
          width: "720px",
          boxSizing: "border-box",
        }}
        className="p-10"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className="text text_type_main-large" style={{}}>
            {title}
          </h2>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export { Modal };
