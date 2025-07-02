function MenuItemLv1({ title, children }) {
  return (
    <div className="w-full mb-3">
      <h3 className="px-2 mb-3 text-sm font-bold tracking-wider text-gray-500">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export default MenuItemLv1;