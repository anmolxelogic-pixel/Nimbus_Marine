import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Auth/authSlice";
import { CgProfile } from "react-icons/cg";
import logo2 from "../../assets/logo2.png";

function Navbar() {
  const [dropOne, setDropOne] = useState(false);
  const [dropTwo, setDropTwo] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, role, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Succesfully!");
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-lg font-medium transition duration-300 ${isActive
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
      name: "About ",
      path: "/about",
      roles: ["user", "admin"],
    },
    {
      name: "Locations",
      path: "/locations",
      roles: ["user", "admin"],
    },
    {
      name: "Contact ",
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
    }
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
    <nav className=" top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <NavLink to="/home">
          <img
            src={logo2}
            alt="Logo"
            className="h-14 object-contain"
          />
        </NavLink>

        {token ? (
          <div className="flex items-center gap-6">


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
              <button className="px-3 py-2 flex text-lg font-medium text-gray-800 hover:text-orange-500 ">
                Services▼
              </button>

              {dropOne && (
                <div className="absolute left-0 mt-2 w-64 rounded-lg border bg-white shadow-xl overflow-hidden">

                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-5 py-3 hover:bg-orange-50"
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
              <button className="px-3 py-2 text-lg font-medium text-gray-800 hover:text-orange-500 transition">
                Sector▼
              </button>

              {dropTwo && (
                <div className="absolute left-0 mt-2 w-72 rounded-lg border bg-white shadow-xl overflow-hidden">

                  {sectors.map((sector) => (
                    <Link
                      key={sector.path}
                      to={sector.path}
                      className="block px-5 py-3 hover:bg-orange-50"
                    >
                      {sector.name}
                    </Link>
                  ))}

                </div>
              )}
            </div>

            <div className="flex items-center gap-2 ml-3">
             <Link to='/dashboard'> <CgProfile size={24} /></Link>
              <span className="font-semibold text-gray-700">
                {user?.fullname}
              </span>
            </div>



            <button
              onClick={handleLogout}
              className="rounded-lg  px-4 py-2 text-black transition cursor-pointer"
            >
              Logout
            </button>

          </div>
        ) : (
          <NavLink
            to="/login"
            className="rounded-lg px-5 py-2 text-black  cursor-pointer"
          >
            Login
          </NavLink>
        )}

      </div>
    </nav>
  );
}

export default Navbar;