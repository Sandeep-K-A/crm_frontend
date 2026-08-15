const STYLES = {
  lead: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  active: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
  inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STYLES[status] || STYLES.lead}`}
    >
      {status}
    </span>
  );
}
