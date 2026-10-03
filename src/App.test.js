import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

test('adds, completes, filters, and edits a task', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  fireEvent.change(screen.getByRole('textbox', { name: /new task description/i }), {
    target: { value: 'Write a project plan' },
  });
  fireEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByText('Write a project plan')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /mark write a project plan as done/i }));
  fireEvent.click(screen.getByRole('button', { name: 'To do' }));
  expect(screen.queryByText('Write a project plan')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Done' }));
  fireEvent.click(screen.getByRole('button', { name: /edit write a project plan/i }));
  const editInput = screen.getByRole('textbox', { name: /edit write a project plan/i });
  fireEvent.change(editInput, { target: { value: 'Finish the project plan' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));

  expect(screen.getByText('Finish the project plan')).toBeInTheDocument();
});
