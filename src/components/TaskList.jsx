function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    if (tasks.length === 0) {
      return <p>尚無任務</p>;
    }
  
    return (
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(index)}
              className="task-checkbox"
            />
            <div className="task-text">
              <div className="task-title">{task.title}</div>
              <div className="task-description">{task.description}</div>
              <div className="task-dueDate">{task.dueDate}</div>
              <div className={`task-priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </div>
            </div>
            <button onClick={() => onDeleteTask(index)}>刪除</button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default TaskList;
  