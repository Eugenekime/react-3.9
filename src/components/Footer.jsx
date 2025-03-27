import "../assets/styles/footer.css";
import TaskFilter from "./TasksFilter";
import PropTypes from "prop-types";

function Footer({ countTasks, clearCompleted, setFilter }) {
  const count = countTasks.filter((task) => task.completed === false).length;
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  countTasks: PropTypes.array,
  clearCompleted: PropTypes.func,
  setFilter: PropTypes.func,
};

export default Footer;
