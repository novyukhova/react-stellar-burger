// converts `2024-03-24T17:41:50.785Z` to `Сегодня, 17:41` or `Вчера, 17:41`
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = diff / (1000 * 60 * 60 * 24);

  if (diffDays < 1) {
    return `Сегодня, ${date.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  if (diffDays < 2) {
    return `Вчера, ${date.toLocaleTimeString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return date.toLocaleDateString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export { formatTimestamp };
