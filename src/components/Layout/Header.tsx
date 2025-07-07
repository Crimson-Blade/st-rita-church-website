import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { strapiApi } from '../../services/api';
import type { ParishInfo } from '../../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [parishInfo, setParishInfo] = useState<ParishInfo | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchParishInfo = async () => {
      const info = await strapiApi.getParishInfo();
      setParishInfo(info);
    };
    fetchParishInfo();
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    {
      label: 'Parish Life',
      dropdown: [
        { path: '/mass-timings', label: 'Mass Timings' },
        { path: '/ministries', label: 'Ministries' },
        { path: '/faith-formation', label: 'Faith Formation' },
        { path: '/vocations', label: 'Vocations' },
      ]
    },
    {
      label: 'News & Events',
      dropdown: [
        { path: '/events', label: 'Events' },
        { path: '/blog', label: 'Blog' },
        { path: '/notice-board', label: 'Notice Board' },
      ]
    },
    { path: '/donate', label: 'Donate' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Sunday Mass: {parishInfo?.sundayMass || '6:30 AM, 8:15 AM, 9:30 AM (English)'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>{parishInfo?.officePhone || '08326638644'}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{parishInfo?.officeEmail || 'st.rita.maina1960@gmail.com'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 p-1">
              <img 
                src="/rita.png"
                alt="St. Rita's Parish Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">{parishInfo?.parishName || 'St. Rita\'s Church'}</h1>
              <p className="text-sm text-gray-600">{parishInfo?.parishSubtitle || 'Catholic Church'}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4">
            {navItems.map((item) => (
              <div key={item.label || item.path} className="relative">
                {item.dropdown ? (
                  <div
                    className="group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button 
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg border z-50">
                        <div className="py-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                isActive(subItem.path)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-4 border-t">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label || item.path}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => setIsMenuOpen(false)}
                              className={`block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                                isActive(subItem.path)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
