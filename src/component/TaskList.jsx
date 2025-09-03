import { useState } from "react";
import { useTasks } from "../context/TestContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div>
      <div className="filter-bar">
        <button onClick={() => setFilter("all")} className="btn">All</button>
        <button onClick={() => setFilter("completed")} className="btn">Completed</button>
        <button onClick={() => setFilter("pending")} className="btn">Pending</button>
      </div>
      <div className="task-list">
        {filteredTasks.length ? (
          filteredTasks.map((t) => <TaskItem key={t.id} task={t} />)
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
