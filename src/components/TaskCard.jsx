export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const moveOptions = ['To Do', 'In Progress', 'Done'].filter((status) => status !== task.status);

  return (
    <div className="task-card">
      <div className="task-header">
        <strong>{task.title}</strong>
        <button className="icon-button" onClick={() => onEdit(task)} aria-label="Edit task">✏️</button>
      </div>
      <p>{task.description || 'No description'}</p>
      <p className="task-meta">Assigned: {task.assignedTo?.name || 'Unknown'}</p>
      {task.dueDate && (
        <p className="task-meta">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <div className="task-footer">
        <span className="badge">{task.priority || 'Medium'}</span>
        <button className="delete-button" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
      {onMove && moveOptions.length > 0 && (
        <div className="move-actions">
          {moveOptions.map((status) => (
            <button
              key={status}
              type="button"
              className="secondary move-button"
              onClick={() => onMove(task, status)}
            >
              Move to {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
