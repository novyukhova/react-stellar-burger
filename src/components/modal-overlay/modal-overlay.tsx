import styles from "./modal-overlay.module.css";

function ModalOverlay({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
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

export { ModalOverlay };
