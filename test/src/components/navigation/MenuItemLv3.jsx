function MenuItemLv3({ title, onClick, isActive = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4.5 py-2 text-sm rounded-lg group transition-colors duration-200 ${
        isActive 
          ? 'bg-[#FFE4E4] text-[#B71D21]' 
          : 'hover:bg-gray-100 hover:text-gray-900 text-gray-500'
      }`}
    >
      <div className={`w-2 h-2 rounded-full mr-3 transition-colors duration-200 ${
        isActive 
          ? 'bg-[#B71D21]' 
          : 'bg-gray-300 group-hover:bg-gray-900'
      }`}></div>
      <div className="font-bold">{title}</div>
    </button>
  );
}

export default MenuItemLv3;