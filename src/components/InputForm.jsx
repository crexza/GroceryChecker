import { useState } from "react";

function InputForm({ addItem }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    addItem(input);
    setInput("");
  };

  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter grocery item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add Item</button>
    </div>
  );
}

export default InputForm;