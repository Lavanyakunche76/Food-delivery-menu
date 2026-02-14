import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, LogOut, LogIn } from "lucide-react";

const AdminNavbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminToken, setAdminToken] = useState(null);
  const [searchText, setSearchText] = useState("");

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setAdminToken(token);
  }, [location.pathname]);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    navigate("/admin/login");
  };

  /* ================= LOGIN ================= */
  const login = () => {
    navigate("/admin/login");
  };

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // 🔥 Send search text to parent
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      className="h-16 flex items-center justify-between px-6
      bg-black/40 backdrop-blur-xl
      border-b border-white/10"
    >
      {/* LEFT: BRAND */}
      <h1
        onClick={() => navigate("/admin")}
        className="text-xl font-bold text-white tracking-wide cursor-pointer"
      >
        🍔 Food Admin
      </h1>

      {/* CENTER: SEARCH (ONLY WHEN LOGGED IN) */}
      {adminToken && (
        <div
          className="hidden md:flex items-center gap-2
          bg-white/10 px-3 py-2 rounded-xl border border-white/10"
        >
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search foods / orders..."
            value={searchText}
            onChange={handleSearch}
            className="bg-transparent outline-none text-sm text-white
              placeholder:text-slate-400 w-56"
          />
        </div>
      )}

      {/* RIGHT: AUTH ACTION */}
      <div className="flex items-center gap-3">
        {!adminToken ? (
          <button
            onClick={login}
            className="flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-green-500/80 hover:bg-green-600
              transition text-sm font-semibold text-white"
          >
            <LogIn size={16} />
            Admin Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-red-500/80 hover:bg-red-600
              transition text-sm font-semibold text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
