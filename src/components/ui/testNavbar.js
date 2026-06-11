import React, { useState } from 'react';
import { Menu, X, Home, Settings, Bell, User, Moon, Sun, Search, ChevronDown } from 'lucide-react';

export default function ModernNavbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const bgPrimary = darkMode ? 'bg-gray-900' : 'bg-white';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-800' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

  const navLinks = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'Dashboard', icon: Settings, href: '#' },
    { name: 'Notifications', icon: Bell, href: '#' },
  ];

  return (
    <nav className={`${bgPrimary} border-b ${borderColor} shadow-sm transition-colors duration-300 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className={`text-xl font-bold ${textPrimary} hidden sm:block`}>Dashboard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center">
              <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${textMuted}`} />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-64 transition-all`}
                />
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${hoverBg} ${textSecondary} hover:text-orange-500 transition-all duration-200`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-lg ${hoverBg} ${textSecondary} hover:text-orange-500 transition-all duration-200 relative`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className={`flex items-center gap-2 p-1 rounded-lg ${hoverBg} transition-all duration-200`}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  JD
                </div>
                <ChevronDown className={`w-4 h-4 ${textSecondary} hidden sm:block transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {profileDropdown && (
                <div className={`absolute right-0 mt-2 w-56 ${bgPrimary} rounded-xl shadow-xl border ${borderColor} py-2 transition-all duration-200`}>
                  <div className="px-4 py-3 border-b ${borderColor}">
                    <p className={`font-semibold ${textPrimary}`}>John Doe</p>
                    <p className={`text-sm ${textMuted}`}>john@example.com</p>
                  </div>
                  <a href="#" className={`flex items-center gap-3 px-4 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}>
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </a>
                  <a href="#" className={`flex items-center gap-3 px-4 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t ${borderColor} mt-2 pt-2">
                    <button className={`w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 ${hoverBg} transition-all`}>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${hoverBg} ${textSecondary} transition-all`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${borderColor}`}>
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                );
              })}
              {/* Mobile Search */}
              <div className="px-4 py-2">
                <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${textMuted}`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}