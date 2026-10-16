import '../assets/styles/task.css';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import Modal from './Modal';

function Task({ createdAt, data, updatedAt }) {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dueDate = data.dueDate
    ? new Date(data.dueDate).toLocaleDateString()
    : 'No due date';

  return (
    <>
      <li>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={data.completed}
            onChange={() =>
              updateTodo(data._id, {
                completed: !data.completed,
              })
            }
          />
          <div className="titleDiv">
            <span
              className="description"
              style={{
                color: data.completed ? '#cdcdcd' : '',
                textDecoration: data.completed ? 'line-through' : '',
              }}
            >
              {data.title}
            </span>
            <p className="taskDescription">{data.description}</p>
            <div className="taskDetails">
              <span className={`priority priority-${data.priority}`}>
                Priority: {data.priority}
              </span>

              <span className="dueDate">Due: {dueDate}</span>
            </div>
            <div className="timeDiv">
              <span className="created">{`created ${createdAt}`}</span>
              {data.updatedAt ? (
                <span className="created">{`updated ${updatedAt}`}</span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            className="icon icon-edit"
            aria-label="Edit task"
            onClick={() => setIsModalOpen(true)}
          ></button>
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => deleteTodo(data._id)}
          ></button>
        </div>
      </li>
      {isModalOpen && (
        <Modal
          handleOpen={setIsModalOpen}
          initialTodo={data}
        />
      )}
    </>
  );
}

Task.defaultProps = {
  data: {},
  date: '',
};

export default Task;
