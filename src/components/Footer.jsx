import '../assets/styles/footer.css';
import TaskFilter from './TasksFilter';
import PropTypes from 'prop-types';
import { useTodoStore } from '../store/todoStore';

function Footer({ clearCompleted }) {
  const todos = useTodoStore((state) => state.todos);
  const count = todos.filter((task) => task.completed === false).length;

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter />
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
  clearCompleted: () => {},
};

Footer.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
