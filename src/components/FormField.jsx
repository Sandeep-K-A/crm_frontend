
export default function FormField({
  label,
  name,
  type = "text",
  registration,
  error,
  placeholder,
  as = "input",
  children,
}) {
  const baseClasses =
    "w-full rounded-md border px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-teal-500 focus:border-teal-500";
  const borderClass = error ? "border-rose-400" : "border-slate-300";

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {as === "select" ? (
        <select id={name} {...registration} className={`${baseClasses} ${borderClass}`}>
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea
          id={name}
          {...registration}
          placeholder={placeholder}
          rows={3}
          className={`${baseClasses} ${borderClass}`}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...registration}
          placeholder={placeholder}
          className={`${baseClasses} ${borderClass}`}
        />
      )}

      {error && <p className="mt-1 text-xs text-rose-500">{error.message}</p>}
    </div>
  );
}
