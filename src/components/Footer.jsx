import '../assets/styles/footer.css';
import TaskFilter from './TasksFilter';
import PropTypes from 'prop-types';

function Footer({ countTasks, clearCompleted, setFilter }) {
  const count = countTasks.filter((task) => task.completed === false).length;
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  countTasks: [],
  clearCompleted: () => {},
  setFilter: () => {},
};

Footer.propTypes = {
  countTasks: PropTypes.array.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Footer;
