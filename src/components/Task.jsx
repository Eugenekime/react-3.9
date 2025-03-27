import "../assets/styles/task.css";
import { useState } from "react";
import PropTypes from "prop-types";

function Task({ id, text, onDelete, completed, onToggle, date }) {
  ///////////    ↓ This code turn a task to an input ↓
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(!isEditing);

  /////////// ↓ This code for edit a task ↓
  const [taskText, setTaskText] = useState(text);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value.trim() === "") {
      onDelete(id);
    } else if (event.key === "Enter") {
      setIsEditing(!isEditing);
    }
  };

  return (
    <li className="editing">
      <div className="view" style={{ display: isEditing ? "none" : "block" }}>
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <label>
          <span
            className="description"
            style={{
              color: completed ? "#cdcdcd" : "",
              textDecoration: completed ? "line-through" : "",
            }}
          >
            {taskText}
          </span>
          <span className="created">{`created ${date}`}</span>
        </label>
        <button className="icon icon-edit" onClick={handleEdit}></button>
        <button
          className="icon icon-destroy"
          onClick={() => onDelete(id)}
        ></button>
      </div>
      <input
        type="text"
        className="edit"
        value={taskText}
        style={{ display: isEditing ? "block" : "none" }}
        onChange={(event) => {
          setTaskText(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsEditing(false)}
      />
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  onDelete: PropTypes.func,
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default Task;
