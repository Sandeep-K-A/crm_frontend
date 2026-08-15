import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "?";

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-slate-900 text-slate-200">
      <div>
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500 text-sm font-bold text-slate-900">
            CR
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            CRM<span className="text-teal-500">.</span>
          </span>
        </div>

        <nav className="mt-6 flex flex-col gap-1 px-3">
          <div className="flex items-center gap-3 rounded-lg hover:bg-slate-800 px-3 py-2 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Customers
          </div>
        </nav>
      </div>

      <div className="border-t border-slate-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 w-full rounded-md border border-slate-700 py-1.5 text-sm text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
