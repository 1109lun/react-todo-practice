import './App.css';
import ProjectList from './components/ProjectList';
import { useState } from 'react';

function App() {
  const [selectedProject, setSelectedProject] = useState('Inbox');

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Projects</h2>
        <ProjectList onProjectSelect={setSelectedProject} />
      </aside>
      <main className="main-content">
        <h2>{selectedProject}</h2>
        {/* 未來放 TaskList */}
      </main>
    </div>
  );
}

export default App;
