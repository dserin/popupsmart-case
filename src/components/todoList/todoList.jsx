import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashCan,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

const TodoList = ({ update, setUpdate }) => {
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axios.get(
          "https://6313302aa8d3f673ffc614e3.mockapi.io/todos"
        );
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, [update]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://6313302aa8d3f673ffc614e3.mockapi.io/todos/${id}`
      );
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDone = async (id) => {
    const done = {
      isCompleted: true,
    };
    try {
      await axios.put(
        `https://6313302aa8d3f673ffc614e3.mockapi.io/todos/${id}`,
        done
      );
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (id) => {
    setModal(!modal);
    setId(id);
  };

  return (
    <div>
      <br />
      {todos && todos.length ? "" : "No tasks.."}
      {todos.map((todo, i) => (
        <div className="taskTd">
          <div className={todo.isCompleted ? "done" : ""}>
            <span className="taskNumber">{i + 1}</span>
            <span className="taskText">{todo.content}</span>
          </div>
          <div className="iconsWrap">
            <span
              title="Completed / Not Completed"
              onClick={() => handleDone(todo.id)}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
            <span title="Edit">
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => toggleModal(todo.id)}
              />
            </span>
            <span title="Delete" onClick={() => handleDelete(todo.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </div>
        </div>
      ))}
      <Modal
        modal={modal}
        toggleModal={toggleModal}
        id={id}
        update={update}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default TodoList;
