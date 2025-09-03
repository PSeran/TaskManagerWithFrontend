import { useAuth } from "../context/AuthContext1";
import TaskForm from "../component/Taskform";
import TaskList from "../component/TaskList";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.email}</h1>
        <button onClick={logout} className="btn logout">Logout</button>
      </div>
      <TaskForm/>
      <TaskList />
    </div>
  );
};

export default Dashboard;
