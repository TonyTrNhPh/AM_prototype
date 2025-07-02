function LanguageOption({ language, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(language)}
      className={`w-full flex items-center px-3 py-2 text-sm text-left transition-colors duration-200 ${
        isSelected 
          ? 'bg-[#FFE4E4] text-[#B71D21]' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {/* Selection indicator */}
      <div className="flex justify-center w-4 mr-3">
        {isSelected && (
          <div className="w-2 h-2 bg-[#B71D21] rounded-full"></div>
        )}
      </div>
      
      {/* Language code and name */}
      <div className="flex items-center">
        <span className="mr-2 font-semibold">{language.code}</span>
        <span className={isSelected ? 'text-[#B71D21]' : 'text-gray-600'}>
          {language.name}
        </span>
      </div>
    </button>
  );
}

export default LanguageOption;
