import { useState } from "react";
import { IconHolder } from "../config";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

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
      <div className="relative">
        <div className="absolute z-10 transform -translate-y-1/2 left-3 top-1/2">
          <IconHolder
            name="search"
            size={18}
            className={cn(
              "transition-colors duration-200",
              isFocused ? "text-[#B71D21]" : "text-gray-400"
            )}
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "pl-10 pr-3 py-2 w-full shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.1)] transition-colors duration-200",
            isFocused ? "border-[#B71D21] ring-[#B71D21] ring-1" : "border-gray-100"
          )}
        />
      </div>
    </form>
  );
}

export default SearchBar;
