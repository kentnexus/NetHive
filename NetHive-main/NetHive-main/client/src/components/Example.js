import React, { useState } from 'react';

const App = () => {
  const initialData = [
    { id: 1, name: 'Item 1', category: 'Category A', color: 'Red' },
    { id: 2, name: 'Item 2', category: 'Category B', color: 'Blue' },
    { id: 3, name: 'Item 3', category: 'Category A', color: 'Green' },
    // Add more items here
  ];

  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    category: '',
    color: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = data.filter((item) => {
    const { category, color } = filters;
    return (
      (category === '' || item.category === category) &&
      (color === '' || item.color === color)
    );
  });

  const uniqueCategories = [...new Set(data.map((item) => item.category))];
  const uniqueColors = [...new Set(data.map((item) => item.color))];

  return (
    <div>
      <h1>Multiple Dropdown Filters with Relative Selection</h1>
      <div>
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color:
          <select name="color" value={filters.color} onChange={handleFilterChange}>
            <option value="">All</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category}, {item.color})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
