import { useState } from "react";
import "../assets/styles/taskFilter.css";
import PropTypes from "prop-types";

function TaskFilter({ setFilter }) {
  const [active, setActive] = useState("all");
  const handleClick = (buttonId) => {
    setActive(buttonId);
    setFilter(buttonId);
  };
  return (
    <ul className="filters">
      <li>
        <button
          className={active === "all" ? `selected` : ""}
          onClick={() => handleClick("all")}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={active === "active" ? `selected` : ""}
          onClick={() => handleClick("active")}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={active === "completed" ? `selected` : ""}
          onClick={() => handleClick("completed")}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TaskFilter.propTypes = {
  setFilter: PropTypes.func,
};

export default TaskFilter;
