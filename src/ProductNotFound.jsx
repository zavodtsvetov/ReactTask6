import s from "./App.module.css";
export const ProductNotFound = ({ navigate }) => (
  <>
    <h2 style={{ color: "brown" }}>Такая задача не найдена</h2>
    <button className={s.back} onClick={() => navigate("/")}>
      ⏎ назад
    </button>
  </>
);
