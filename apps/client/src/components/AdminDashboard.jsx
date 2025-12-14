import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogoutMutation } from "../services/admin";

const AdminDashboard = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/admin/login");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const menuItems = [
    {
      path: "/admin",
      label: "🎬 Dashboard",
      description: "Dashboard",
    },
    {
      path: "/admin/movies",
      label: "🎬 Movie Management",
      description: "Create and manage your movies and TV shows",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex">
      {/* Sidebar */}
      <nav
        className={`${isSidebarOpen ? "w-80" : "w-32"} bg-gray-900/90 backdrop-blur-sm border-r border-gray-700/50 transition-all duration-300 ease-in-out fixed left-0 top-0 h-full z-50`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div
              className={`flex items-center space-x-3 ${!isSidebarOpen && "justify-center"}`}
            >
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              {isSidebarOpen && (
                <div>
                  <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                  <p className="text-gray-400 text-sm">Content Management</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block p-4 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 text-blue-300"
                    : "hover:bg-gray-800/50 border border-transparent text-gray-300 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.label.split(" ")[0]}</span>
                  {isSidebarOpen && (
                    <div>
                      <div className="font-medium">{item.label.slice(2)}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div></div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${isSidebarOpen ? "ml-80" : "ml-32"} transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage your content library</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
              <div className="w-10 h-10 bg-linear-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
