import { useState } from "react";
import { IconHolder } from "../config";

function SearchBar({
  placeholder = "Tìm kiếm menu...",
  onSearch,
  value,
  onChange,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(value || "");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)] relative flex items-center w-full px-3 py-2 border rounded-lg transition-colors duration-200 ${
          isFocused ? "border-[#B71D21]" : "border-gray-100"
        }`}
      >
        <IconHolder
          name="search"
          size={18}
          className={`mr-3 transition-colors duration-200 ${
            isFocused ? "text-[#B71D21]" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`flex-1 outline-none bg-transparent transition-colors duration-200 ${
            searchValue.length > 0 ? "text-black" : "text-gray-500"
          } placeholder-gray-400`}
        />
      </div>
    </form>
  );
}

export default SearchBar;
