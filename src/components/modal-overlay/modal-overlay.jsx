import PropTypes from "prop-types";
import { useCallback } from "react";

function ModalOverlay({ onClick, children }) {
  const onClickCallback = useCallback(
    (event) => event.currentTarget === event.target && onClick && onClick(),
    [onClick]
  );
  return (
    <section
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        position: "fixed",
        top: 0,
        transition: "visibility .5s,opacity .5s",
        width: "100%",
      }}
      onClick={onClickCallback}
    >
      {children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};

export { ModalOverlay };
