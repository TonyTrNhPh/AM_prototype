function LanguageFlag({ language, size = 'default' }) {
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
      <div className={`${currentSize} flex justify-center align-middle rounded-sm overflow-hidden border border-gray-200`}>
        <FlagComponent 
          className="object-cover w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  // Fallback to emoji if no flag component
  return (
    <span className={`${currentSize} flex items-center justify-center text-sm rounded-sm border border-gray-200`}>
      {language.flag}
    </span>
  );
}

export default LanguageFlag;
