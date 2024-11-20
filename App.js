import React, { useState, useEffect } from "react";
import "./App.css";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todolist")) || [];
    const storedCompletedTodos =
      JSON.parse(localStorage.getItem("completedTodos")) || [];
    setTodos(storedTodos);
    setCompletedTodos(storedCompletedTodos);
  }, []);

  const handleAddTodo = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newTodoItem = {
        title: newTitle,
        description: newDescription,
      };

      const updatedTodos = [...allTodos, newTodoItem];
      setTodos(updatedTodos);

      // Save to localStorage
      localStorage.setItem("todolist", JSON.stringify(updatedTodos));

      // Clear input fields
      setNewTitle("");
      setNewDescription("");
    } else {
      alert("Both title and description are required!");
    }
  };

  const handleComplete = (index) => {
    const completedItem = allTodos[index];
    const updatedTodos = allTodos.filter((_, i) => i !== index);

    const updatedCompletedTodos = [...completedTodos, completedItem];
    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedTodos);

    // Save to localStorage
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));
  };

  const handleDelete = (index, isCompleted) => {
    if (isCompleted) {
      const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
      setCompletedTodos(updatedCompletedTodos);
      localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedTodos));
    } else {
      const updatedTodos = allTodos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
      localStorage.setItem("todolist", JSON.stringify(updatedTodos));
    }
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen ? "active" : ""}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen ? "active" : ""}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen ? (
            completedTodos.length === 0 ? (
              <p>No completed todos!</p>
            ) : (
              completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiTwotoneDelete
                      className="icon"
                      title="Delete?"
                      onClick={() => handleDelete(index, true)}
                    />
                  </div>
                </div>
              ))
            )
          ) : allTodos.length === 0 ? (
            <p>No todos available!</p>
          ) : (
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiTwotoneDelete
                    className="icon"
                    title="Delete?"
                    onClick={() => handleDelete(index, false)}
                  />
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                    title="Complete?"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
