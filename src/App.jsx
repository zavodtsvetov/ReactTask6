import s from "./App.module.css";
import { useState, useRef } from "react";
import { useChangeTitle, useAdd, deleteTask } from "./hooks/index";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Task } from "./Task";
import { MainPage } from "./MainPage";
import { NotFound } from "./NotFound";

export const App = () => {
  const [toDoList, setToDoList] = useState([]);
  const [task, setTask] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const navigate = useNavigate();
  const onInputNewTask = ({ target }) => {
    setNewTaskName(target.value);
  };
  const onInputNewTaskText = ({ target }) => {
    setNewTaskText(target.value);
  };

  const onClick = () => {
    setIsClicked(!isClicked);
  };
  const sorted = [...toDoList];
  const onHandleSort = () => {
    sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
    setToDoList(sorted);
    setIsSorted(true);
  };

  const useAddTask = (event) => {
    event.preventDefault();
    useAdd(onClick, newTaskName, newTaskText);
  };

  const useChangeTodoTitle = () => {
    useChangeTitle(onClick);
  };

  const useDeleteTitle = () => {
    deleteTask(onClick, task);
    navigate("/");
  };

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
    toDoList.forEach((task) => {
      if (target.value.trim() === task.title) {
        setCurrentTask(task.id);
        refButton.current.focus();
      }
    });
  };

  const refButton = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    if (currentTask) {
      alert(`Номер вашего таска: ${currentTask}`);
    } else {
      alert("Перепроверьте ввод");
    }
  };

  return (
    <>
      <form onSubmit={useAddTask}>
        <input
          onChange={onInputNewTask}
          type="text"
          placeholder="Введите название дела"
        />
        <input
          onChange={onInputNewTaskText}
          type="text"
          placeholder="Введите описание дела"
        />
        <button
          type="submit"
          className={s.addButton}
          disabled={newTaskName && newTaskText ? false : true}
        >
          Добавить дело
        </button>
      </form>

      <button
        disabled={isSorted ? true : false}
        onClick={onHandleSort}
        className={isSorted ? s.sortedButton : s.buttonShowAll}
      >
        {isSorted ? "Отсортировано" : "Сорт. по алфавиту"}
      </button>

      <form onSubmit={onSubmit}>
        <input
          className={s.inputTask}
          onChange={onInputChange}
          type="text"
          name="search"
          placeholder="Поиск задачи..."
        />{" "}
        <button
          ref={refButton}
          disabled={inputValue === "" ? true : false}
          style={{ border: "none" }}
          type="submit"
        >
          {" "}
          🔍
        </button>
      </form>
      <ul>
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
      </ul>
      <p style={{ textAlign: "center" }}>___________________________________</p>
      <h1 style={{ textAlign: "center" }}>Cписок дел:</h1>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              onClick={onClick}
              isClicked={isClicked}
              toDoList={toDoList}
              setToDoList={setToDoList}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        >
          <Route
            path="task/:id"
            element={
              <Task
                useChangeTodoTitle={useChangeTodoTitle}
                useDeleteTitle={useDeleteTitle}
                navigate={navigate}
                task={task}
                setTask={setTask}
                isClicked={isClicked}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Route>
        <Route path="/404" element={<NotFound navigate={navigate} />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <br />
    </>
  );
};
