function TaskList({ tasks }) {
    return (
      <ul>
        {tasks.length === 0 ? (
          <li>尚無任務</li>
        ) : (
          tasks.map((task, index) => <li key={index}>{task.title}</li>)
        )}
      </ul>
    );
  }
  
  export default TaskList;
  