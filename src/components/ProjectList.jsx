import { useEffect } from 'react';

function ProjectList({ projects, setProjects, currentProject, setCurrentProject }) {
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:8000/projects');
      const data = await res.json();
      setProjects(data);
      if (data.length > 0) {
        const firstProject = data[0];
        const taskRes = await fetch(`http://localhost:8000/projects/${firstProject.id}/tasks`);
        const tasks = await taskRes.json();
        setCurrentProject({ ...firstProject, tasks });
      }
    } catch (error) {
      console.error('無法載入專案列表:', error);
    }
  };

  const handleSelectProject = async (project) => {
    try {
      const taskRes = await fetch(`http://localhost:8000/projects/${project.id}/tasks`);
      const tasks = await taskRes.json();
      setCurrentProject({ ...project, tasks });
    } catch (error) {
      console.error('切換專案失敗:', error);
    }
  };

  const addProject = async () => {
    const name = prompt('請輸入專案名稱');
    if (!name || name.trim() === '') return;

    if (projects.some(p => p.name === name)) {
      alert('專案已存在');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const newProject = await res.json();
      setProjects([...projects, newProject]);

      // 建立完也要拉 tasks
      const taskRes = await fetch(`http://localhost:8000/projects/${newProject.id}/tasks`);
      const tasks = await taskRes.json();
      setCurrentProject({ ...newProject, tasks });
    } catch (error) {
      alert('新增失敗');
      console.error(error);
    }
  };

  const deleteProject = async () => {
    if (!currentProject) return;

    try {
      await fetch(`http://localhost:8000/projects/${currentProject.id}`, {
        method: 'DELETE',
      });

      const updated = projects.filter(p => p.id !== currentProject.id);
      setProjects(updated);

      if (updated.length > 0) {
        const first = updated[0];
        const taskRes = await fetch(`http://localhost:8000/projects/${first.id}/tasks`);
        const tasks = await taskRes.json();
        setCurrentProject({ ...first, tasks });
      } else {
        setCurrentProject(null);
      }
    } catch (error) {
      alert('刪除失敗');
      console.error(error);
    }
  };

  return (
    <div>
      <ul id="ProjectList">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`project ${project.id === currentProject?.id ? 'active' : ''}`}
            onClick={() => handleSelectProject(project)}
          >
            {project.name}
          </li>
        ))}
      </ul>
      <button onClick={addProject}>新增專案</button>
      <button onClick={deleteProject}>刪除專案</button>
    </div>
  );
}

export default ProjectList;
