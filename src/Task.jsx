import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductNotFound } from "./ProductNotFound";
const LOADING_TASK_TIME = 500;

export const Task = ({
  isClicked,
  useDeleteTitle,
  useChangeTodoTitle,
  navigate,
  task,
  setTask,
}) => {
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const remindButton = <button onClick={useChangeTodoTitle}>Напомнить</button>;
  const deleteButton = <button onClick={useDeleteTitle}>Удалить задачу</button>;
  const params = useParams();

  useEffect(() => {
    setIsTaskLoading(true);
    fetch(`http://localhost:3005/todos/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setIsTaskLoading(false);
          setTask(data);
        }, LOADING_TASK_TIME);
      });
  }, [params.id, isClicked]);

  if (task.id === undefined) {
    return <ProductNotFound navigate={navigate} />;
  }

  const { text, title } = task;
  return (
    <>
      {isTaskLoading ? (
        "Открываю таск"
      ) : (
        <>
          <h2 style={{ color: "green", fontSize: "30px" }}>{title} </h2>
          <h3>{text}</h3>
          <ul>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              {" "}
              Назад{" "}
            </button>
            {deleteButton}
            {task.id === 1 ? remindButton : ""}
          </ul>
        </>
      )}
    </>
  );
};
