import { useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState(['Inbox']);

  const addProject = () => {
    const name = prompt('請輸入專案名稱');
    if (!name || projects.includes(name)) return;
    setProjects([...projects, name]);
  };

  const deleteProject = (name) => {
    setProjects(projects.filter((project) => project !== name));
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((name, index) => (
          <li key={index}>
            {name}
            {name !== 'Inbox' && (
              <button onClick={() => deleteProject(name)}>刪除</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={addProject}>新增專案</button>
    </div>
  );
}

export default ProjectList;
