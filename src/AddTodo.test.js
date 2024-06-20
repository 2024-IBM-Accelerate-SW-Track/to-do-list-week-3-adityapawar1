import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const createTask = (taskName, dueDate) => {
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i })
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addTodo = screen.getByTestId("new-item-button");
  fireEvent.change(inputTask, { target: { value: taskName } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addTodo);

  return screen.getByTestId(taskName);
}


test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const obj1 = createTask("Test", "06/14/2024");
  const obj2 = createTask("Test", "06/14/2024");

  expect(obj1).toBe(obj2);
});

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  expect(() => {
    createTask("", "06/14/2024")
  }).toThrow();
});

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  expect(() => {
    createTask("Test", "")
  }).toThrow();
});

test('test that App component can be deleted through checkbox', () => {
  render(<App />);
  createTask("Task", "06/14/2024");
  const checkbox = screen.getByTestId("Task-delete")
  fireEvent.click(checkbox);
  expect(() => {
    screen.getByTestId(taskName);
  }).toThrow();
});


test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const dayMillis = 60 * 60 * 24 * 1000;
  const today = new Date()
  const yesterday = new Date(today.getTime() - dayMillis).toLocaleString("en-US", { // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const tomorrow = new Date(today.getTime() + dayMillis).toLocaleString("en-US", { // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const overdue = createTask("Overdue", yesterday);
  const notOverdue = createTask("Not Overdue", tomorrow)
  const overdueColor = "rgb(255, 204, 204)"
  const notOverdueColor = "rgb(255, 255, 255)"

  expect(JSON.stringify(overdue.style)).toContain(overdueColor);
  expect(JSON.stringify(notOverdue.style)).toContain(notOverdueColor);
})

