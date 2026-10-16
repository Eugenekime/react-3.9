import '../assets/styles/modal.css';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

export default function Modal({ handleOpen, initialTodo = null }) {
  const [errors, setErrors] = useState({});
  const createTodo = useTodoStore((state) => state.createTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const isEditing = Boolean(initialTodo);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('title');
    const description = formData.get('description');
    const priority = formData.get('priority');
    const dueDate = formData.get('dueDate');

    const todo = {
      title: typeof title === 'string' ? title.trim() : '',
      description: typeof description === 'string' ? description.trim() : '',
      priority: typeof priority === 'string' ? priority : '',
      dueDate: typeof dueDate === 'string' && dueDate !== '' ? dueDate : null,
    };

    const newErrors = {};

    if (!todo.title) {
      newErrors.title = 'Title is required';
    } else if (todo.title.length > 100) {
      newErrors.title = 'Title must be at most 100 characters';
    }

    if (!todo.description) {
      newErrors.description = 'Description is required';
    } else if (todo.description.length > 300) {
      newErrors.description = 'Description must be at most 300 characters';
    }

    if (!['low', 'medium', 'high'].includes(todo.priority)) {
      newErrors.priority = 'Invalid priority';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = isEditing
        ? await updateTodo(initialTodo._id, todo)
        : await createTodo(todo);

      if (response?.success === true) {
        handleOpen(false);
      } else {
        setErrors({
          creationError: response?.error || 'Failed to save todo',
        });
      }
    } catch (err) {
      console.log(err);
      setErrors({
        creationError: 'Unable to connect to the server',
      });
    }
  }
  return (
    <section className="wrapper">
      <form
        className="modalForm"
        onSubmit={handleSubmit}
      >
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            defaultValue={initialTodo?.title ?? ''}
            required
          />
        </label>
        {errors.title && <span className="error">{errors.title}</span>}

        <label>
          Description
          <textarea
            name="description"
            placeholder="Enter task description"
            defaultValue={initialTodo?.description ?? ''}
            required
          />
        </label>
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}
        <label>
          Priority
          <select
            name="priority"
            defaultValue={initialTodo?.priority ?? 'low'}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        {errors.priority && <span className="error">{errors.priority}</span>}
        {errors.creationError && (
          <p className="error">{errors.creationError}</p>
        )}

        <label>
          Due date
          <input
            type="date"
            name="dueDate"
            defaultValue={
              initialTodo?.dueDate
                ? new Date(initialTodo.dueDate).toISOString().slice(0, 10)
                : ''
            }
          />
        </label>

        <div className="footerDiv">
          <button
            type="button"
            className="back"
            onClick={() => handleOpen(false)}
          >
            Back
          </button>

          <button
            type="submit"
            className="back"
          >
            {isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </section>
  );
}
