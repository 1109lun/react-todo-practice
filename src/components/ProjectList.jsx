import { useState } from "react";

function ProjectList(){
    const [projects , setProjects] = useState(['Inbox']);

    return (
        <ul>
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      );
    }

export default ProjectList;