import { useState } from 'react';
import './App.css';

import { useAutoAnimate } from '@formkit/auto-animate/react';

function App() {
  const [items, setItems] = useState([]);
  const [userInput, setUserInput] = useState('');

  const [listRef] = useAutoAnimate();

  const addNewItem = () => {
    if (userInput) {
      setItems((items) =>
        items.concat([
          {
            id: Date.now().toString(),
            title: userInput,
          },
        ])
      );
      setUserInput('');
    } else {
      window.alert('Please type something!');
    }
  };

  const removeItem = (event) => {
    const id = event.target.dataset.id;

    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleKeyUp = (event) => {
    if (event.key === 13) {
      addNewItem();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  return (
    <div className="root">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter Sentence"
          className="input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <button className="add-btn" onClick={addNewItem}>
        Add item
      </button>

      <ul className="list" ref={listRef}>
        {items.map((item) => (
          <li key={item.id}>
            <span className="label">{item.title}</span>
            <span className="delete-btn" data-id={item.id} onClick={removeItem}>
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
