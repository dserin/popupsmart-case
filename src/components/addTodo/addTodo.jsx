import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ update, setUpdate }) => {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.length < 3) {
      return alert("You can type at least 3 characters");
    }
    const newTodoContent = {
      content: newTodo,
      isCompleted: false,
    };
    try {
      await axios.post(
        "https://6313302aa8d3f673ffc614e3.mockapi.io/todos",
        newTodoContent
      );
      setUpdate(!update);
      setNewTodo("");
    } catch (error) {
      console.log(error + "hata");
    }
  };
  
  return (
    <div className="task">
      <input
        value={newTodo}
        required
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Task</button>
    </div>
  );
};

export default AddTodo;
