import s from "./App.module.css";
export const NotFound = ({ navigate }) => (
  <>
    <h1 style={{ color: "red" }}>Страница не найдена</h1>
    <button className={s.back} onClick={() => navigate("/")}>
      ⏎ назад
    </button>
  </>
);
