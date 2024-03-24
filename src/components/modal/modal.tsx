import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useCallback, useEffect } from "react";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";

function Modal({
  onClose,
  children,
  title,
  smallTitle = false,
}: {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  smallTitle?: boolean;
}) {
  const closeOnEscape = useCallback(
    (event: KeyboardEvent) => event.key === "Escape" && onClose(),
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeOnEscape]);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={`${styles.modal} p-10`}>
        <div className={styles.header}>
          <h2
            className={`text ${
              smallTitle ? "text_type_digits-default" : "text_type_main-large"
            }`}
          >
            {title}
          </h2>
          <span className="modal-close-icon">
            <CloseIcon type="primary" onClick={onClose} />
          </span>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modals")!
  );
}

export { Modal };
