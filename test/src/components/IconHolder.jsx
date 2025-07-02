import iconRegistry from '../data/iconData';

function IconHolder({ 
  name, 
  size = 20, 
  className = "", 
  color = "currentColor",
  strokeWidth = 2,
  onClick,
  ...props 
}) {
  const IconComponent = iconRegistry[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return (
      <div 
        className={`inline-flex items-center justify-center text-gray-400 ${className}`}
        style={{ width: size, height: size }}
        title={`Icon "${name}" not found`}
      >
        ?
      </div>
    );
  }
  
  const iconElement = (
    <IconComponent 
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props} 
    />
  );

  // If onClick is provided, wrap in a button
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        type="button"
      >
        {iconElement}
      </button>
    );
  }

  return iconElement;
}

// Helper function to get all available icon names
IconHolder.getAvailableIcons = () => {
  return Object.keys(iconRegistry).sort();
};

// Helper function to check if an icon exists
IconHolder.hasIcon = (name) => {
  return iconRegistry.hasOwnProperty(name);
};

export default IconHolder;
