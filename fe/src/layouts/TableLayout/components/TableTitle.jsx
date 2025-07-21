import { IconHolder } from "@/config";

function TableTitle({ title, subtitle, icon = "question-mark-circle" }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center justify-center rounded-xl shadow-sm p-3"
          style={{ backgroundColor: 'var(--brand-accent-light)' }}
        >
          <IconHolder 
            name={icon} 
            size={32} 
            style={{ color: 'var(--brand-accent)' }}
          />
        </div>
        <div className="flex flex-col">
          <span 
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </span>
          <span 
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TableTitle;
