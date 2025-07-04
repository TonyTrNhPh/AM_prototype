import { useState } from "react";
import { IconHolder, LanguageFlag, LanguageOption, getAvailableLanguages, getDefaultLanguage } from "../../../config";

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(getDefaultLanguage());

  // Get available languages from registry
  const languages = getAvailableLanguages();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100"
      >
        <div className="mr-2">
          <LanguageFlag language={selectedLanguage} size="default" />
        </div>
        <span className="mr-1">{selectedLanguage.code}</span>
        <IconHolder 
          name="chevron-down" 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 z-20 w-48 px-0 py-2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg top-16">
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <IconHolder 
                  name="globe" 
                  size={16} 
                  className="mr-2 text-gray-500"
                />
                <span>Chọn ngôn ngữ</span>
              </div>
            </div>
            
            {/* Language Options */}
            <div className="py-1">
              {languages.map((language) => (
                <LanguageOption
                  key={language.code}
                  language={language}
                  isSelected={selectedLanguage.code === language.code}
                  onClick={handleLanguageSelect}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSelector;
