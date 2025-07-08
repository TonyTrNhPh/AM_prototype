import { IconHolder } from "@/config";

function TableTitle({ title, subtitle, icon = "question-mark-circle" }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center bg-[#FFE4E4] rounded-xl shadow-sm p-3">
          <IconHolder name={icon} size={32} className="text-[#B71D21]" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight">{title}</span>
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export default TableTitle;
