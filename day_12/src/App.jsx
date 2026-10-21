import React, { useState } from 'react';

const App = () => {
  const [task, settask] = useState("");
  const [todolist, settodolist] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addHandler = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedlist = [...todolist];
      updatedlist[editIndex] = task;
      settodolist(updatedlist);
      setEditIndex(null);
    } else {
      settodolist([...todolist, task]);
    }

    settask("");
  };

  const deleteHandler = (index) => {
    const updatedlist = todolist.filter((_, i) => i !== index);
    settodolist(updatedlist);

    // Agar jo item edit ho raha hai wahi delete kar diya jaye
    if (editIndex === index) {
      setEditIndex(null);
      settask("");
    }
  };

  const editHandler = (index) => {
    settask(todolist[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h1>TODO List</h1>

      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => settask(e.target.value)}
      />
      
      {/* Edit mode ke hisab se button text toggle */}
      <button onClick={addHandler}>
        {editIndex !== null ? "UPDATE" : "ADD"}
      </button>

      <br /><br />

      {Array.isArray(todolist) && todolist.map((taskItem, index) => (
        <div key={index}>
          <span>{taskItem}</span>
          <button onClick={() => editHandler(index)}>EDIT</button>
          <button onClick={() => deleteHandler(index)}>DELETE</button>
        </div>
      ))}
    </div>
  );
};

export default App;