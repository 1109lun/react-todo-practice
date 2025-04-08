import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import NewTaskDialog from './components/NewTaskDialog';

function App() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [{ name: 'Inbox', tasks: [] }];
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddTask = (task) => {
    const updatedProjects = projects.map((project) =>
      project === currentProject
        ? { ...project, tasks: [...project.tasks, task] }
        : project
    );
    setProjects(updatedProjects);
    setCurrentProject(updatedProjects.find((p) => p.name === currentProject.name)); // 加這行
  };
  
  const handleToggleTask = (index) => {
    const updatedProjects = projects.map((project) =>
      project.name === currentProject.name
        ? {
            ...project,
            tasks: project.tasks.map((task, i) =>
              i === index ? { ...task, completed: !task.completed } : task
            ),
          }
        : project
    );
    setProjects(updatedProjects);
    const updatedCurrent = updatedProjects.find(p => p.name === currentProject.name);
    setCurrentProject(updatedCurrent);
  };
  
  const handleDeleteTask = (index) => {
    const updatedProjects = projects.map((project) =>
      project.name === currentProject.name
        ? {
            ...project,
            tasks: project.tasks.filter((_, i) => i !== index),
          }
        : project
    );
    setProjects(updatedProjects);
    const updatedCurrent = updatedProjects.find(p => p.name === currentProject.name);
    setCurrentProject(updatedCurrent);
  };
  
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
        <button onClick={() => setDialogOpen(true)}>新增任務</button>
        <TaskList
          tasks={currentProject?.tasks || []}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      <NewTaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;
