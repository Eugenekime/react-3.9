import '../assets/styles/taskFilter.css';
import PropTypes from 'prop-types';
import { useTodoStore } from '../store/todoStore';

function TaskFilter() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? `selected` : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? `selected` : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? `selected` : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
TaskFilter.defaultProps = {
  setFilter: () => {},
};

TaskFilter.propTypes = {
  setFilter: PropTypes.func,
};

export default TaskFilter;
