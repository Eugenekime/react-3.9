import "../assets/styles/newTaskForm.css";
import { useState } from "react";
import PropTypes from "prop-types";

function NewTaskForm({ addNewTask }) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && taskTitle.trim()) {
      addNewTask(taskTitle);
      setTaskTitle("");
    }
  };
  return (
    <input
      type="text"
      value={taskTitle}
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
}

NewTaskForm.PropTypes = {
  addNewTask: PropTypes.func,
};

export default NewTaskForm;
