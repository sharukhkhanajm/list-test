import { memo, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// Memoized ListItem component
const ListItem = memo(({ item, isSelected, onItemClick }) => {
  return (
    <li
      className={`List__item List__item--${item.color} ${isSelected ? 'List__item--selected' : ''}`}
      onClick={() => onItemClick(item.name)}
    >
      {item.name}
    </li>
  );
});

function App() {
  const [selectedItems, setSelectedItems] = useState(new Set());

  const toggleItemSelection = (itemName) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemName)) {
        newSelectedItems.delete(itemName);
      } else {
        newSelectedItems.add(itemName);
      }
      return newSelectedItems;
    });
  };

  const isItemSelected = (itemName) => {
    return selectedItems.has(itemName);
  };

  const handleItemClick = (itemName) => {
    toggleItemSelection(itemName);
  };

  // Memoized list of ListItem components
  const renderedItems = useMemo(
    () =>
      items.map((item) => (
        <ListItem
          key={item.name}
          item={item}
          isSelected={isItemSelected(item.name)}
          onItemClick={handleItemClick}
        />
      )),
    [items, isItemSelected, handleItemClick]
  );

  return (
    <>
      <div className="SelectedItems">
        {Array.from(selectedItems).map((itemName) => (
          <span key={itemName} className="SelectedItem">
            {itemName}
          </span>
        ))}
      </div>
      <ul className="List">{renderedItems}</ul>
    </>
  );
}

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

export default App
