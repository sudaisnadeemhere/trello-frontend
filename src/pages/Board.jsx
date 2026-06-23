import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { apiRequest } from '../api';
import { useAuth } from '../auth/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const STATUS_COLUMNS = ['To Do', 'In Progress', 'Done'];
const LOCAL_TASKS_KEY = 'trello-lite-tasks';
const LOCAL_USERS_KEY = 'trello-lite-users';

const getStored = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') || fallback;
  } catch {
    return fallback;
  }
};

export default function Board() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(() => getStored(LOCAL_TASKS_KEY, []));
  const [users, setUsers] = useState(() => getStored(LOCAL_USERS_KEY, []));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    const storedTasks = getStored(LOCAL_TASKS_KEY, []);
    const storedUsers = getStored(LOCAL_USERS_KEY, []);

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [taskList, userList] = await Promise.all([
          apiRequest('/tasks', 'GET', null, token),
          apiRequest('/tasks/users', 'GET', null, token),
        ]);
        setTasks(taskList);
        setUsers(userList);
        localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(taskList));
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(userList));
      } catch (err) {
        if (storedTasks.length) {
          setTasks(storedTasks);
          setUsers(storedUsers.length ? storedUsers : user ? [user] : []);
          setError('Unable to reach server; loaded saved tasks locally.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, token, navigate]);

  const filteredTasks = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return tasks;
    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || '';
      const assigned = task.assignedTo?.name?.toLowerCase() || task.assignedTo?.email?.toLowerCase() || '';
      return title.includes(query) || assigned.includes(query);
    });
  }, [tasks, filter]);

  const groupedTasks = useMemo(() => {
    return STATUS_COLUMNS.reduce((acc, status) => {
      acc[status] = filteredTasks.filter((task) => task.status === status);
      return acc;
    }, {});
  }, [filteredTasks]);

  const syncTask = async (taskId, updatedFields) => {
    try {
      const updated = await apiRequest(`/tasks/${taskId}`, 'PUT', updatedFields, token);
      setTasks((prev) => prev.map((task) => (task._id === updated._id ? updated : task)));
    } catch (err) {
      setTasks((prev) => prev.map((task) => (task._id === taskId ? { ...task, ...updatedFields } : task)));
      setError('Offline mode: task updated locally.');
    }
  };

  const createTask = async (taskData) => {
    try {
      const created = await apiRequest('/tasks', 'POST', taskData, token);
      setTasks((prev) => [...prev, created]);
      closeForm();
    } catch (err) {
      const assignedUser = users.find((u) => (u._id || u.id) === taskData.assignedTo) || user || { name: 'You', email: '' };
      const fallbackTask = {
        _id: `local-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        assignedTo: assignedUser,
        createdBy: user?.id || user?._id,
        status: taskData.status || 'To Do',
        dueDate: taskData.dueDate,
        priority: taskData.priority || 'Medium',
      };
      setTasks((prev) => [...prev, fallbackTask]);
      setError('Offline mode: task saved locally.');
      closeForm();
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await apiRequest(`/tasks/${taskId}`, 'DELETE', null, token);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setError('Offline mode: task removed locally.');
    }
  };

  const closeForm = () => {
    setSelectedTask(null);
    setIsFormOpen(false);
  };

  const handleSave = async (taskData) => {
    if (selectedTask) {
      await syncTask(selectedTask._id, taskData);
      closeForm();
    } else {
      await createTask(taskData);
    }
  };

  const handleMove = async (task, nextStatus) => {
    if (task.status === nextStatus) return;
    try {
      const updated = await apiRequest(`/tasks/${task._id}/status`, 'PATCH', { status: nextStatus }, token);
      setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    } catch (err) {
      setTasks((prev) => prev.map((item) => (item._id === task._id ? { ...item, status: nextStatus } : item)));
      setError('Offline mode: task status changed locally.');
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;
    if (sourceStatus === destStatus) return;
    const task = tasks.find((item) => item._id === draggableId);
    if (!task) return;
    await handleMove(task, destStatus);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayUsers = users.length ? users : user ? [user] : [];

  return (
    <div className="board-shell page-transition">
      <header className="board-header">
        <div className="header-left">
          <h1>📋 Task Board</h1>
          <p>Welcome, <strong>{user?.name}</strong></p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => { setSelectedTask(null); setIsFormOpen(true); }}>+ New Task</button>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="board-search">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="🔍 Search tasks by title or assignee"
        />
      </div>

      <div className="board-stats">
        <span>{tasks.length} tasks saved</span>
        <span>{groupedTasks['To Do'].length} in To Do</span>
        <span>{groupedTasks['In Progress'].length} in Progress</span>
        <span>{groupedTasks['Done'].length} completed</span>
      </div>

      {error && <div className="error-box">{error}</div>}
      {loading ? (
        <div className="loading">⏳ Loading tasks…</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="board-grid">
            {STATUS_COLUMNS.map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <section className="board-column" ref={provided.innerRef} {...provided.droppableProps}>
                    <h2>{status}</h2>
                    {groupedTasks[status].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onEdit={(taskToEdit) => { setSelectedTask(taskToEdit); setIsFormOpen(true); }}
                              onDelete={(id) => deleteTask(id)}
                              onMove={handleMove}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </section>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {isFormOpen && (
        <TaskForm
          users={displayUsers}
          task={selectedTask}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}
