export const useAdd = (onClick, newTaskName, newTaskText) => {
  fetch(`http://localhost:3005/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: newTaskName,
      completed: false,
      text: newTaskText,
    }),
  })
    .then((rawResp) => rawResp.json())
    .then(() => onClick());
};
