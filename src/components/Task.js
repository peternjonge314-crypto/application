import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../features/tasks/tasksSlice';

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  const saveEdit = (event) => {
    event.preventDefault();
    const trimmedDescription = description.trim();
    if (!trimmedDescription) return;
    dispatch(editTask({ id: task.id, description: trimmedDescription }));
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li className="task-row">
      <button
        className={`check-button${task.isDone ? ' checked' : ''}`}
        type="button"
        aria-label={`${task.isDone ? 'Mark' : 'Mark'} ${task.description} as ${task.isDone ? 'not done' : 'done'}`}
        aria-pressed={task.isDone}
        onClick={() => dispatch(toggleTask(task.id))}
      >
        {task.isDone && <span className="checkmark" aria-hidden="true">✓</span>}
      </button>

      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            className="task-input"
            aria-label={`Edit ${task.description}`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={160}
            autoFocus
          />
          <button className="save-edit" type="submit">Save</button>
          <button className="icon-button" type="button" aria-label="Cancel edit" onClick={cancelEdit}>×</button>
        </form>
      ) : (
        <>
          <span className={`task-description${task.isDone ? ' completed' : ''}`}>{task.description}</span>
          <div className="task-actions">
            <button className="icon-button" type="button" aria-label={`Edit ${task.description}`} onClick={() => setIsEditing(true)}>✎</button>
            <button className="icon-button delete" type="button" aria-label={`Delete ${task.description}`} onClick={() => dispatch(deleteTask(task.id))}>×</button>
          </div>
        </>
      )}
    </li>
  );
}

export default Task;