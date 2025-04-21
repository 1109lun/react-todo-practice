import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import NewTaskDialog from './components/NewTaskDialog';

function App() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/projects')
      .then(res => res.json())
      .then(async (data) => {
        if (data.length === 0) {
          // 自動建立一個 Inbox 專案
          const res = await fetch('http://localhost:8000/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Inbox' }),
          });
          const inbox = await res.json();
          setProjects([inbox]);
          setCurrentProject(inbox);
        } else {
          const firstProject = data[0];
          const tasksRes = await fetch(`http://localhost:8000/projects/${firstProject.id}/tasks`);
          const tasks = await tasksRes.json();
          setCurrentProject({ ...firstProject, tasks });
        }
      })
      .catch(err => console.error('無法取得專案資料', err));
  }, []);

  const refreshProjects = async () => {
    try {
      const res = await fetch('http://localhost:8000/projects');
      const data = await res.json();
      setProjects(data);
  
      if (currentProject) {
        const match = data.find(p => p.id === currentProject.id);
        if (match) {
          const taskRes = await fetch(`http://localhost:8000/projects/${match.id}/tasks`);
          const tasks = await taskRes.json();
          setCurrentProject({ ...match, tasks });
        }
      }
    } catch (err) {
      console.error('刷新專案時發生錯誤', err);
    }
  };
  
  const handleAddBoredTask = async () => {
    try {
      const response = await fetch('https://bored.api.lewagon.com/api/activity');
      const data = await response.json();

      const taskWithProjectId = {
        title: data.activity,
        description: '',
        dueDate: '',
        priority: 'low',
        completed: false,
        project_id: currentProject.id,
      };

      await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskWithProjectId),
      });
  
      refreshProjects();
    } catch (err) {
      console.error('取得無聊任務失敗', err);
    }
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
        <button onClick={handleAddBoredTask}>我好無聊</button>
        <TaskList
          tasks={currentProject?.tasks || []}
          fetchTasks={refreshProjects} 
        />
      </main>

      <NewTaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        projectId={currentProject?.id}
        fetchTasks={refreshProjects}
      />
    </div>
  );
}

export default App;
