import React from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

export default function App() {
  return (
    <div className="container">
      <h1>Gestión de Tareas</h1>
      <CreateTask />
      <TaskList />
    </div>
  );
}
