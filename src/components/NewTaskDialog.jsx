import { useState, useRef } from 'react';

function NewTaskDialog({ open, onClose, projectId, fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const dialogRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('請輸入任務標題');
      return;
    }

    const newTask = {
      title,
      description,
      due_date: dueDate,
      priority :priority.toLowerCase(),
      completed: false,
      project_id: projectId,
    };

    try {
      const res = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) {
        throw new Error('新增任務失敗');
      }

      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      onClose();
      fetchTasks(); 
    } catch (err) {
      alert('新增任務時發生錯誤');
      console.error(err);
    }
  };

  return (
    <dialog ref={dialogRef} open={open} className="task-dialog">
      <form onSubmit={handleSubmit} className="task-form">
        <h2>新增任務</h2>
        <label>
          Title：
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description：
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Due Date：
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <label>
          Priority：
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <menu>
          <button type="submit">新增</button>
          <button type="button" onClick={onClose}>取消</button>
        </menu>
      </form>
    </dialog>
  );
}

export default NewTaskDialog;
