import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ImageIcon, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-gray-800">PhotoStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Gallery
            </Link>
            <Link 
              to="/upload" 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Upload
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
              <Link 
                to="/" 
                className="py-2 text-gray-600 hover:text-blue-500 transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link 
                to="/upload" 
                className="py-2 text-gray-600 hover:text-blue-500 transition-colors"
                onClick={toggleMenu}
              >
                Upload
              </Link>
              <Link 
                to="/about" 
                className="py-2 text-gray-600 hover:text-blue-500 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">&copy; 2025 PhotoStore. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;