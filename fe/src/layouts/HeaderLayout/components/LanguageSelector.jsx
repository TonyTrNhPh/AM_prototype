import { useState } from "react";
import { IconHolder, getAvailableLanguages, getDefaultLanguage } from "@/config";

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(getDefaultLanguage());

  // Get available languages from registry
  const languages = getAvailableLanguages();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  // Inline LanguageFlag component
  const LanguageFlag = ({ language, size = 'default' }) => {
    const sizeClasses = {
      small: 'w-4 h-3',
      default: 'w-9 h-6',
      large: 'w-12 h-8'
    };

    const currentSize = sizeClasses[size] || sizeClasses.default;

    // Render flag component from country-flag-icons library
    if (language.flagComponent) {
      const FlagComponent = language.flagComponent;
      return (
        <div className={`${currentSize} flex justify-center items-center rounded-sm overflow-hidden border transition-colors border-main`}>
          <FlagComponent 
            className="object-cover w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      );
    }

    // Fallback to emoji if no flag component
    return (
      <span className={`${currentSize} flex items-center justify-center text-sm rounded-sm border border-main`}>
        {language.flag}
      </span>
    );
  };

  // Inline LanguageOption component
  const LanguageOption = ({ language, isSelected, onClick }) => {
    return (
      <button
        onClick={() => onClick(language)}
        className={`w-full flex items-center px-3 py-2 text-sm text-left transition-colors duration-200 ${
          isSelected 
            ? 'language-selected-bg language-selected-text' 
            : 'bg-transparent text-primary hover-bg-secondary'
        }`}
      >
        {/* Selection indicator */}
        <div className="flex justify-center w-4 mr-3">
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
          )}
        </div>
        
        {/* Language code and name */}
        <div className="flex items-center">
          <span className="mr-2 font-semibold">{language.code}</span>
          <span className={isSelected ? 'text-brand-accent' : 'text-secondary'}>
            {language.name}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg text-primary hover-bg-secondary"
      >
        <div className="mr-2">
          <LanguageFlag language={selectedLanguage} size="default" />
        </div>
        <span className="mr-1">{selectedLanguage.code}</span>
        <IconHolder 
          name="chevron-down" 
          size={16} 
          className={`transition-transform duration-200 text-disabled ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div 
            className="absolute right-0 z-20 w-48 px-0 py-2 mt-1 border rounded-lg shadow-lg bg-background-primary border-main"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-main">
              <div className="flex items-center text-sm text-secondary">
                <IconHolder 
                  name="globe" 
                  size={16} 
                  className="mr-2 text-disabled"
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
