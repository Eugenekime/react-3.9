import "../assets/styles/taskList.css";
import { useEffect, useState } from "react";
import Task from "./Task";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

function TaskList({
  tasks,
  setTasks,
  error,
  deleteTask,
  filteredTasks,
  editTask,
}) {
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const [_, setUpdateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  if (error)
    return (
      <p
        style={{
          fontSize: "24px",
          fontFamily: "inherit",
          fontWeight: "inherits",
          lineHeight: "1.4em",
          color: "gray",
          textAlign: "center",
        }}
      >
        {error}
      </p>
    );

  return (
    <ul className="todo-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            text={task.title}
            key={task.id}
            id={task.id}
            onDelete={deleteTask}
            onToggle={toggleCompletion}
            completed={task.completed}
            date={getTimeAgo(task.createdAt)}
            editTask={editTask}
          />
        ))
      ) : (
        <p
          style={{
            fontSize: "24px",
            fontFamily: "inherit",
            fontWeight: "inherits",
            lineHeight: "1.4em",
            color: "gray",
            textAlign: "center",
          }}
        >
          No tasks
        </p>
      )}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  deleteTask: PropTypes.func,
  filteredTasks: PropTypes.array,
  editTask: PropTypes.func,
};

export default TaskList;
