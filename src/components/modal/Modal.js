import axios from "axios";
import React, { useEffect, useState } from "react";
import "./modal.css";

const Modal = ({ modal, toggleModal, id, update, setUpdate }) => {
  const [selectedTodo, setSelectedTodo] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getSelectedTodo = async () => {
      const res = await axios.get(
        `https://6313302aa8d3f673ffc614e3.mockapi.io/todos/${id}`
      );
      setSelectedTodo(res.data);
    };
    getSelectedTodo();
  }, [modal]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedJob = {
      content,
    };
    try {
      await axios.put(
        `https://6313302aa8d3f673ffc614e3.mockapi.io/todos/${id}`,
        updatedJob
      );
      toggleModal();
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modalContent">
            <input
              type="text"
              value={content}
              placeholder={selectedTodo.content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="updatebutton" onClick={handleUpdate}>
              Update
            </button>
            <button className="closeButton" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
