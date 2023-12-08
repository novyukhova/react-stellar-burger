import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ onClick, children }) {
  return (
    <section
      className={styles.overlay}
      onClick={(event) =>
        event.currentTarget === event.target && onClick && onClick()
      }
    >
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};

export { ModalOverlay };
