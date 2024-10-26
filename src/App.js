import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    // استرجاع المهام من localStorage عند تحميل الصفحة
    const savedTodos = window.localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const inputRef = useRef();

  const handelAddTodo = () => {
    const text = inputRef.current.value;
    if (text.trim() === "") return; // منع إضافة عناصر فارغة
    const newItem = { completed: false, text };
    const newTodos = [...todos, newItem];
    setTodos(newTodos);
    inputRef.current.value = "";
  };

  const handelItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handelDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // استخدام useEffect لتحديث localStorage عند كل تغيير في todos
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // يتم التحديث في كل مرة تتغير فيها قائمة todos

  return (
    <div className='parent'>
      <h2>To Do List</h2>
      <div className='to-do-container'>
        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <div className='item' key={index}>
                <li
                  className={completed ? "done" : ""}
                  onClick={() => handelItemDone(index)}
                >
                  {text}
                </li>
                <span onClick={() => handelDeleteItem(index)}>🗑️</span>
              </div>
            );
          })}
        </ul>
        <input ref={inputRef} placeholder='Enter item ...' />
        <button onClick={handelAddTodo}> Add </button>
      </div>
    </div>
  );
}

export default App;
