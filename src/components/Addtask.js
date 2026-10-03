import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

function Addtask() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedDescription = description.trim();
    if (!trimmedDescription) return;

    dispatch(addTask({ id: nanoid(), description: trimmedDescription, isDone: false }));
    setDescription('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        aria-label="New task description"
        placeholder="e.g. Plan my week"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength={160}
      />
      <button className="add-button" type="submit">
        <span className="add-plus" aria-hidden="true">+</span>
        <span className="add-button-label">Add task</span>
      </button>
    </form>
  );
}

export default Addtask;