export const useChangeTitle = (onClick) => {
  fetch(`http://localhost:3005/todos/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: "Купить чипсы",
      completed: false,
      text: "Да, точно. Я хотел купить чипсы.",
    }),
  })
    .then((rawResp) => rawResp.json())
    .then(() => onClick());
};
