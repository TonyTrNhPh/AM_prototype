import { IconHolder } from "../config";

function MenuItem({ item, onClick }) {
  const getItemStyles = (type) => {
    switch (type) {
      case 'danger':
        return {
          text: 'text-red-600 hover:bg-red-50',
          icon: 'text-red-500'
        };
      case 'primary':
        return {
          text: 'text-[#B71D21] hover:bg-[#FFE4E4]',
          icon: 'text-[#B71D21]'
        };
      default:
        return {
          text: 'text-gray-700 hover:bg-gray-50',
          icon: 'text-gray-400'
        };
    }
  };

  const styles = getItemStyles(item.type);

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center px-4 py-2 text-sm text-left transition-colors duration-200 ${styles.text}`}
    >
      <IconHolder 
        name={item.icon} 
        size={16} 
        className={`mr-3 ${styles.icon}`}
      />
      {item.label}
    </button>
  );
}

export default MenuItem;
