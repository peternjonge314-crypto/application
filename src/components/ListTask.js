import { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'To do', value: 'active' },
  { label: 'Done', value: 'completed' },
];

function ListTask() {
  const [filter, setFilter] = useState('all');
  const tasks = useSelector((state) => state.tasks.items);
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isDone;
    if (filter === 'completed') return task.isDone;
    return true;
  });

  return (
    <>
      <div className="task-toolbar" aria-label="Filter tasks">
        {filters.map((option) => (
          <button
            className={`filter-button${filter === option.value ? ' active' : ''}`}
            type="button"
            key={option.value}
            aria-pressed={filter === option.value}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {visibleTasks.length > 0 ? (
        <ul className="task-list" aria-label="Tasks">
          {visibleTasks.map((task) => <Task key={task.id} task={task} />)}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">{tasks.length === 0 ? '＋' : '✓'}</span>
          <strong>{tasks.length === 0 ? 'Nothing on your list yet' : 'All clear here'}</strong>
          <p>{tasks.length === 0 ? 'Add a task above and take the first step.' : 'There are no tasks in this view.'}</p>
        </div>
      )}
    </>
  );
}

export default ListTask;