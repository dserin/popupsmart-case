import { useState } from "react";
import "./App.css";
import AddTodo from "./components/addTodo/addTodo";
import Login from "./components/login/Login";
import TodoList from "./components/todoList/todoList";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [update, setUpdate] = useState(false);
  const user = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    localStorage.setItem("theme", theme);
  };

  return (
    <div className={theme === "light" ? "lightTheme" : "darkTheme"}>
      <div>
        <button className="btn-theme" onClick={() => themeToggler()}>
          Change Theme
        </button>
      </div>
      <div className="main">
        <div>
          <h2>TO DO LIST</h2>
          <br />
          <div className="main-logout">
            <span className="user"> {user} </span>
            {user && (
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            )}
          </div>
          {user ? (
            <div className="container">
              <div className="components">
                <AddTodo update={update} setUpdate={setUpdate} />
                <br />
                <TodoList update={update} setUpdate={setUpdate} />
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
