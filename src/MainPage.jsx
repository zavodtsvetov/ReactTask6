import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import s from "./App.module.css";
const url = "http://localhost:3005/todos";
const LOADING_TIME = 500;

export const MainPage = ({
  onClick,
  isClicked,
  toDoList,
  setToDoList,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((loadedData) => {
        setTimeout(() => {
          setIsLoading(true);
          setToDoList(loadedData);
        }, LOADING_TIME);
        setIsLoading(false);

        onClick;
      });
  }, [isClicked]);

  return (
    <>
      {isLoading ? "" : "Загружаем задачи.."}
      <ul>
        {toDoList.map(({ id, title, text }) => (
          <div key={id}>
            <Link to={`task/${id}`} className={s.task}>
              {id}. {title}. {text.slice(0, 5)}...
            </Link>
          </div>
        ))}
      </ul>
      <Outlet />
    </>
  );
};
