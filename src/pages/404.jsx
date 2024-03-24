import styles from "./404.module.css";

function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-medium pb-6">Страница не найдена</h1>
      <p className="text text_type_digits-large pb-6">404</p>
      <p className="text text_type_main-default pb-4">
        Такой страницы не существует.
      </p>
      <p className="text text_type_main-default">
        Воспользуйтесь меню или исправьте ошибку в URL.
      </p>
    </div>
  );
}

export { NotFoundPage };
