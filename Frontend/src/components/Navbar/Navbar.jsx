import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Auth/authSlice";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import logo2 from "../../assets/logo2.png";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropOne, setDropOne] = useState(false);
  const [dropTwo, setDropTwo] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, role, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setMobileMenu(false);
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-base font-medium transition duration-300 ${
      isActive
        ? "text-orange-500"
        : "text-gray-800 hover:text-orange-500"
    }`;

  const navLinks = [
    {
      name: "Home",
      path: "/home",
      roles: ["user", "admin"],
    },
    {
      name: "About",
      path: "/about",
      roles: ["user", "admin"],
    },
    {
      name: "Locations",
      path: "/locations",
      roles: ["user", "admin"],
    },
    {
      name: "Contact",
      path: "/contact",
      roles: ["user", "admin"],
    },
    {
      name: "Career",
      path: "/career",
      roles: ["user", "admin"],
    },
    {
      name: "Profile",
      path: "/dashboard",
      roles: ["user"],
    },
  ];

  const services = [
    {
      name: "Crew Management",
      path: "/services/crew-management",
    },
    {
      name: "Training",
      path: "/services/training",
    },
    {
      name: "Payroll Management",
      path: "/services/payroll",
    },
  ];

  const sectors = [
    {
      name: "Maritime / Commercial Shipping",
      path: "/sector/maritime",
    },
    {
      name: "Offshore Construction & Subsea",
      path: "/sector/offshore",
    },
    {
      name: "Offshore Wind & Renewable Projects",
      path: "/sector/wind",
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          to="/home"
          onClick={() => setMobileMenu(false)}
          className="flex shrink-0 items-center"
        >
          <img
            src={logo2}
            alt="Logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <div className="hidden items-center lg:flex">

          {token ? (
            <div className="flex items-center gap-1">

              {navLinks
                .filter((item) => item.roles.includes(role))
                .map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={linkClass}
                  >
                    {item.name}
                  </NavLink>
                ))}

              <div
                className="relative"
                onMouseEnter={() => setDropOne(true)}
                onMouseLeave={() => setDropOne(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-800 transition hover:text-orange-500"
                >
                  Services
                  <FiChevronDown size={16} />
                </button>

                {dropOne && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setDropTwo(true)}
                onMouseLeave={() => setDropTwo(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-800 transition hover:text-orange-500"
                >
                  Sector
                  <FiChevronDown size={16} />
                </button>

                {dropTwo && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                    {sectors.map((sector) => (
                      <Link
                        key={sector.path}
                        to={sector.path}
                        className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                      >
                        {sector.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="ml-3 flex items-center gap-2 border-l border-gray-200 pl-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 transition hover:text-orange-500"
                >
                  <CgProfile size={24} />
                </Link>

                <span className="max-w-[120px] truncate text-sm font-semibold text-gray-700">
                  {user?.fullname}
                </span>
              </div>

              <button
                onClick={handleLogout}
                type="button"
                className="ml-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Login
            </NavLink>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 text-gray-800 transition hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">

          {token ? (
            <div className="flex flex-col">

              {navLinks
                .filter((item) => item.roles.includes(role))
                .map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={({ isActive }) =>
                      `border-b border-gray-100 px-3 py-3 text-base font-medium ${
                        isActive
                          ? "text-orange-500"
                          : "text-gray-800"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

              <div className="border-b border-gray-100">

                <button
                  type="button"
                  onClick={() => setDropOne(!dropOne)}
                  className="flex w-full items-center justify-between px-3 py-3 text-base font-medium text-gray-800"
                >
                  <span>Services</span>

                  <FiChevronDown
                    size={18}
                    className={`transition ${
                      dropOne ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropOne && (
                  <div className="mb-2 rounded-lg bg-gray-50">

                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => setMobileMenu(false)}
                        className="block px-6 py-3 text-sm text-gray-600 hover:text-orange-500"
                      >
                        {service.name}
                      </Link>
                    ))}

                  </div>
                )}
              </div>

              <div className="border-b border-gray-100">

                <button
                  type="button"
                  onClick={() => setDropTwo(!dropTwo)}
                  className="flex w-full items-center justify-between px-3 py-3 text-base font-medium text-gray-800"
                >
                  <span>Sector</span>

                  <FiChevronDown
                    size={18}
                    className={`transition ${
                      dropTwo ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropTwo && (
                  <div className="mb-2 rounded-lg bg-gray-50">

                    {sectors.map((sector) => (
                      <Link
                        key={sector.path}
                        to={sector.path}
                        onClick={() => setMobileMenu(false)}
                        className="block px-6 py-3 text-sm text-gray-600 hover:text-orange-500"
                      >
                        {sector.name}
                      </Link>
                    ))}

                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-4">

                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenu(false)}
                  className="text-gray-700"
                >
                  <CgProfile size={28} />
                </Link>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Logged in as
                  </p>

                  <p className="truncate font-semibold text-gray-800">
                    {user?.fullname}
                  </p>
                </div>

              </div>

              <button
                onClick={handleLogout}
                type="button"
                className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-left font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                Logout
              </button>

            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="block w-full rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white hover:bg-orange-600"
            >
              Login
            </NavLink>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;