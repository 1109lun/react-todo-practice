import { useState } from 'react';

function ProjectList({ projects, currentProject, setProjects, setCurrentProject }) {
  const addProject = () => {
    const name = prompt('請輸入專案名稱');
    if (!name || name.trim() === '') return;

    if (projects.some(p => p.name === name)) {
      alert('專案已存在');
      return;
    }

    const newProject = { name, tasks: [] };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const deleteProject = () => {
    if (!currentProject) return;

    const updated = projects.filter(p => p !== currentProject);
    setProjects(updated);

    // 若刪除的是目前專案，就切換到下一個或 null
    if (updated.length > 0) {
      setCurrentProject(updated[0]);
    } else {
      setCurrentProject(null);
    }
  };

  return (
    <div>
      <ul id="ProjectList">
        {projects.map((project, index) => (
          <li
            key={index}
            className={`project ${project === currentProject ? 'active' : ''}`}
            onClick={() => setCurrentProject(project)}
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
