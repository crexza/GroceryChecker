import { useState } from "react";
import { format } from "date-fns";
import Header from "./components/Header.jsx";
import InputForm from "./components/InputForm.jsx";
import GroceryList from "./components/GroceryList.jsx";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (name) => {
    const newItem = {
      id: Date.now(),
      name,
      checked: false,
      date: format(new Date(), "dd/MM/yyyy"),
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const remaining = items.filter((item) => !item.checked).length;

  return (
    <div className="app-container">
      <div className="grocery-box">
        <Header />
        <p className="subtitle">Add your shopping items and tick them when bought</p>
        <InputForm addItem={addItem} />
        <p className="counter">Items left: {remaining}</p>
        <GroceryList
          items={items}
          toggleItem={toggleItem}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
}

export default App;