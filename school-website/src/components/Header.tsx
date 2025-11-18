import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📧 school@harishankar.edu.in</span>
            <span>📞 +91 1234567890</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span>Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="hover:text-secondary">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-secondary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and School Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl">
              HSS
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                +2 Hari Shankar Singh High School
              </h1>
              <p className="text-sm text-gray-600">Sharmapur - Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium transition">
              About
            </Link>
            <Link to="/academics" className="text-gray-700 hover:text-primary font-medium transition">
              Academics
            </Link>
            <Link to="/faculty" className="text-gray-700 hover:text-primary font-medium transition">
              Faculty
            </Link>
            <Link to="/admissions" className="text-gray-700 hover:text-primary font-medium transition">
              Admissions
            </Link>
            <Link to="/notices" className="text-gray-700 hover:text-primary font-medium transition">
              Notices
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-primary font-medium transition">
              Gallery
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition">
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to={user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'}
                className="btn-primary text-sm"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 fade-in">
            <Link to="/" className="block text-gray-700 hover:text-primary font-medium py-2">
              Home
            </Link>
            <Link to="/about" className="block text-gray-700 hover:text-primary font-medium py-2">
              About
            </Link>
            <Link to="/academics" className="block text-gray-700 hover:text-primary font-medium py-2">
              Academics
            </Link>
            <Link to="/faculty" className="block text-gray-700 hover:text-primary font-medium py-2">
              Faculty
            </Link>
            <Link to="/admissions" className="block text-gray-700 hover:text-primary font-medium py-2">
              Admissions
            </Link>
            <Link to="/notices" className="block text-gray-700 hover:text-primary font-medium py-2">
              Notices
            </Link>
            <Link to="/gallery" className="block text-gray-700 hover:text-primary font-medium py-2">
              Gallery
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-primary font-medium py-2">
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to={user?.role === 'admin' ? '/admin' : user?.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'}
                className="block btn-primary text-center"
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
