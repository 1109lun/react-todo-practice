import './App.css';
import { useState } from 'react';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';

function App() {
  const [projects, setProjects] = useState([{ name: 'Inbox', tasks: [] }]);
  const [currentProject, setCurrentProject] = useState(projects[0]);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Projects</h2>
        <ProjectList
          projects={projects}
          currentProject={currentProject}
          setProjects={setProjects}
          setCurrentProject={setCurrentProject}
        />
      </aside>
      <main className="main-content">
        <h2>{currentProject ? currentProject.name : '尚未選擇專案'}</h2>
        {currentProject && (<TaskList tasks={currentProject.tasks} />)}
      </main>
    </div>
  );
}

export default App;
