import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  // const [filteredTodos, setFilteredTodos] = useState([])

  type Todo = {
    inputValue: string;
    id: string;
    checked: boolean;
    status: string;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputText(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!inputText) {
      return;
    }

    const newTodo: Todo = {
      inputValue: inputText,
      id: uuidv4(),
      checked: false,
      status: "",
    };

    setTodos([newTodo, ...todos]);
    console.log(inputText);
    setInputText(inputText);
  };

  //todo編集
  const handleEdit = (id: string, inputValue: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    console.log(deepCopy);

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //完了未完了
  const handleChecked = (id: string, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    // console.log(deepCopy);

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //削除
  const handleDelete = (id: string) => {
    //idが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEditStatus = (id: string, status: string) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.status = status;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'notStarted':
        return !todo.checked && todo.status === 'notStarted';
      case 'inProgress':
        return !todo.checked && todo.status === 'inProgress';
      case 'done':
        return !todo.checked && todo.status === 'done';
      default:
        return true;
    }
  });


  return (
    <div className="App">
      <div>
        <h2>Todoリスト 初級</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">すべて</option>
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
         {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
            type="text"
            value={todo.inputValue}
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            disabled={todo.checked}
            />
            <select value={todo.status} onChange={(e) => handleEditStatus(todo.id, e.target.value)}>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleChecked(todo.id, todo.checked)}
            />
            <button onClick={() => handleDelete(todo.id)}>消</button>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default App;