import './App.css';
import { useSelector } from 'react-redux';
import Addtask from './components/Addtask';
import ListTask from './components/ListTask';

function App() {
  const tasks = useSelector((state) => state.tasks.items);
  const completedCount = tasks.filter((task) => task.isDone).length;

  return (
    <div className="App">
      <main className="workspace">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Daymark home">
            <span className="brand-mark" aria-hidden="true">✓</span>
            <span>mark</span>
          </a>
          <span className="topbar-note"><span className="status-dot" /> </span>
        </header>

        <section className="intro" id="top">
          
      
        </section>

        <section className="todo-card" aria-label="Todo list">
          <Addtask />
          <div className="list-heading">
            <div>
              <h2>Your tasks</h2>
              <p>{tasks.length === 0 ? 'A fresh start is a good place to be.' : `${completedCount} of ${tasks.length} completed`}</p>
            </div>
            <span className="task-count" aria-label={`${tasks.length} total tasks`}>{String(tasks.length).padStart(2, '0')}</span>
          </div>
          <ListTask />
        </section>
      </main>
    </div>
  );
}

export default App;
