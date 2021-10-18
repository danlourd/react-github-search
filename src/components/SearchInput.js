import { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchText);
    }
  }

  return (
    <input
      id="searchInput"
      className="form-control"
      type="text"
      placeholder="Search repositories"
      aria-label="Search github repositories"
      value={searchText}
      onKeyPress={handleKeyPress}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchInput;