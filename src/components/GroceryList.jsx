function GroceryList({ items, toggleItem, deleteItem }) {
  return (
    <ul className="grocery-list">
      {items.map((item) => (
        <li key={item.id} className="grocery-item">
          <div className="item-left">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
            />
            <span className={item.checked ? "checked" : ""}>
              {item.name} ({item.date})
            </span>
          </div>
          <button className="delete-btn" onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default GroceryList;