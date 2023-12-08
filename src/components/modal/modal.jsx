import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

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
        className={`${styles.modal} p-10`}
      >
        <div className={styles.header}>
          <h2 className="text text_type_main-large">{title}</h2>
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
