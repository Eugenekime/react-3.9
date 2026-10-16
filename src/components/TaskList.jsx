import '../assets/styles/taskList.css';
import { useEffect, useState } from 'react';
import Task from './Task';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { useTodoStore } from '../store/todoStore';

function TaskList() {
  const todos = useTodoStore((state) => state.todos);
  const error = useTodoStore((state) => state.error);

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

  const getUpdatedTimeAgo = (updatedAt) => {
    return formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
  };

  if (error)
    return (
      <p
        style={{
          fontSize: '24px',
          fontFamily: 'inherit',
          fontWeight: 'inherits',
          lineHeight: '1.4em',
          color: 'gray',
          textAlign: 'center',
        }}
      >
        {error}
      </p>
    );

  return (
    <ul className="todo-list">
      {todos.length > 0 ? (
        todos.map((task) => (
          <Task
            key={task._id}
            data={task}
            createdAt={getTimeAgo(task.createdAt)}
            updatedAt={
              task.updatedAt ? getUpdatedTimeAgo(task.updatedAt) : null
            }
          />
        ))
      ) : (
        <li
          style={{
            fontSize: '24px',
            fontFamily: 'inherit',
            fontWeight: 'inherits',
            lineHeight: '1.4em',
            color: 'gray',
            textAlign: 'center',
          }}
        >
          No tasks
        </li>
      )}
    </ul>
  );
}
TaskList.defaultProps = {
  tasks: [],
  setTasks: () => {},
  error: null,
  deleteTask: () => {},
  filteredTasks: [],
  editTask: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  error: PropTypes.string,
  deleteTask: PropTypes.func.isRequired,
  filteredTasks: PropTypes.array.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default TaskList;
