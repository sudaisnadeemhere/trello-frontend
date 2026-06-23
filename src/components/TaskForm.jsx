import { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

const getUserId = (user) => user._id || user.id;

export default function TaskForm({ users, task, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo?._id || task?.assignedTo?.id || task?.assignedTo || '');
  const [status, setStatus] = useState(task?.status || 'To Do');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.slice(0, 10) : '');

  useEffect(() => {
    if (!assignedTo && users.length) {
      setAssignedTo(getUserId(users[0]));
    }
  }, [users, assignedTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, assignedTo, status, dueDate: dueDate || undefined, priority });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </label>
          <label>
            Assigned To
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
              <option value="" disabled>{users.length ? 'Select assignee' : 'Loading users...'}</option>
              {users.map((user) => (
                <option key={getUserId(user)} value={getUserId(user)}>{user.name}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Due Date
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
          <label>
            Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
