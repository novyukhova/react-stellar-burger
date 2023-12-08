import PropTypes from "prop-types";
import { useCallback } from "react";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ onClick, children }) {
  const onClickCallback = useCallback(
    (event) => event.currentTarget === event.target && onClick && onClick(),
    [onClick]
  );
  return (
    <section className={styles.overlay} onClick={onClickCallback}>
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};

export { ModalOverlay };
