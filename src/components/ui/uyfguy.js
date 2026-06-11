   // THEME STATE
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setDarkMode(theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const bgPrimary = darkMode ? "bg-gray-900" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-300" : "text-gray-700";
  const textMuted = darkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = darkMode ? "border-gray-800" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";

 
 {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4  pb-6 border-t ${borderColor}`}>
            <div className="space-y-1">
              <div className="relative px-3 ">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className={`flex items-center gap-2 p-1 rounded-lg ${hoverBg} transition-all duration-200`}
                >
                  {user ? (
                    <div>
                      <img
                        src={usersas?.photoURL}
                        className="w-12 h-12 rounded-full"
                      ></img>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      <FiUser></FiUser>
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 ${textSecondary} hidden sm:block transition-transform duration-200 ${
                      profileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <NavLink
                to="/profile2"
                className={`flex items-center gap-3 px-4 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </NavLink>
              <NavLink
                to="/books"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <GiSpellBook className="w-5 h-5" />
                <span className="font-medium">All Books</span>
              </NavLink>
              <NavLink
                to="/deshbord"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <MdOutlineDashboardCustomize className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </NavLink>
              <NavLink
                to="/settingse"
                className={`flex items-center gap-3 px-4 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </NavLink>
              {user ? (
                <>
                  <div className=" px-4">
                    <button
                      onClick={() => userLogOut()}
                      className="px-6 py-1.5 mt-2 gap-2 rounded-lg  font-semibold
        bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90
         shadow-lg transition-all flex items-center justify-center duration-300
         hover:scale-105 w-35"
                    >
                      <IoIosLogOut className="w-5 h-5 md:w-4 md:h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className=" flex flex-col px-4 text-center gap-3 ">
                  <Link
                    to="/auth/login"
                    className="px-6 py-[4px]  w-35 rounded-lg font-semibold text-[#e85d04]
                            border-2 hover:border flex items-center gap-3 border-[#e85d04]
                            transition-all duration-300
                            hover:bg-gradient-to-r from-[#C2410C] to-[#e85d04]
                            hover:text-white hover:scale-105"
                  >
                    <FaUserCheck className=" w-4 h-4" /> Login
                  </Link>

                  {/* REGISTER */}
                  <Link
                    to="/auth/rigester"
                    className="px-6 py-1.5 mt-2 gap-2 rounded-lg  font-semibold
        bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90
         shadow-lg transition-all flex items-center justify-center duration-300
         hover:scale-105 w-35"
                  >
                    <FaUserCog className="w-4 h-4 md:w-4 md:h-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        