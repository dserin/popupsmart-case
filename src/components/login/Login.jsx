import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  
  const handleChange = (e) => {
    let value = e.target.value;
    setUser(value);
    localStorage.setItem("user", value);
  };

  return (
    <div className="login">
      <form>
        <input
          value={user}
          type="text"
          placeholder="Please write username"
          onChange={handleChange}
        />
        <button className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default Login;
