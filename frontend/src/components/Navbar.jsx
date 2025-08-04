import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md px-6 py-3 flex justify-between items-center text-white">
      <div className="flex items-center space-x-4">
        {/* Show logo when logged out */}
        {!isLoggedIn && (
          <img
            src={logo} // Replace with your logo file path or external URL
            alt="Logo"
            className="h-10 w-auto"
          />
        )}

        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="font-semibold hover:text-gray-100 transition">
              Dashboard
            </Link>
            <Link to="/my-sessions" className="hover:text-gray-100 transition">
              My Sessions
            </Link>
          </>
        )}
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-medium"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:text-gray-200 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
