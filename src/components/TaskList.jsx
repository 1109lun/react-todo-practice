function TaskList({ tasks, fetchTasks }) {
  if (!tasks || tasks.length === 0) {
    return <p>尚無任務</p>;
  }

  const toggleTask = async (task) => {
    try {
      const res = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(`更新任務失敗：${JSON.stringify(errData)}`);
      }
  
      fetchTasks(); // 重新載入任務
    } catch (err) {
      alert('更新任務失敗');
      console.error(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks(); // 重新載入任務
    } catch (err) {
      alert('刪除任務失敗');
      console.error(err);
    }
  };

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const sortedTasks = [...tasks].sort((a, b) => {
  const aPriority = a.priority?.toLowerCase() || 'low';
  const bPriority = b.priority?.toLowerCase() || 'low';
  return priorityOrder[aPriority] - priorityOrder[bPriority];
  });
  
  return (
    <ul>
      {sortedTasks.map((task) => (
        <li key={task.id} className={task.completed ? 'done' : ''}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
            className="task-checkbox"
          />
          <div className="task-text">
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <div className="task-dueDate">{task.dueDate}</div>
            <div className={`task-priority ${task.priority?.toLowerCase()}`}>
              {task.priority}
            </div>
          </div>
          <button onClick={() => deleteTask(task.id)}>刪除</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
