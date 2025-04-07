import { useState } from 'react';

function ProjectList({ onProjectSelect }) {
  const [projects, setProjects] = useState(['Inbox']);

  const addProject = () => {
    const name = prompt('請輸入專案名稱');
    if (!name || name.trim() === '') return;
    if (projects.includes(name)) {
      alert('專案已存在');
      return;
    }
    setProjects([...projects, name]);
  };

  return (
    <div>
      <ul id="ProjectList">
        {projects.map((project, index) => (
          <li
            key={index}
            className="project"
            onClick={() => onProjectSelect(project)}
          >
            {project}
          </li>
        ))}
      </ul>
      <button onClick={addProject}>新增專案</button>
    </div>
  );
}

export default ProjectList;
