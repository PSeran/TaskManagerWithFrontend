import { useTasks } from "../context/TestContext";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  return (
    <div className="task-item">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => updateTask(task.id, { completed: !task.completed })}
        />
        <span className={task.completed ? "completed" : ""}>{task.title}</span>
        {task.dueDate && <span className="due-date"> {task.dueDate}</span>}
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
      <button onClick={() => deleteTask(task.id)} className="btn delete">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
