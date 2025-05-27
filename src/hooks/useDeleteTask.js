export const deleteTask = (onClick, task) => {
  fetch(`http://localhost:3005/todos/${task.id}`, {
    method: "DELETE",
  })
    .then((rawResp) => rawResp.json())
    .then(() => {
      onClick();
    });
};
