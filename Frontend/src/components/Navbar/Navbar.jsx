import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Auth/authSlice";
import {FiMenu,FiX,FiChevronDown,} from "react-icons/fi";

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [dropOne, setDropOne] = useState(false);
    const [dropTwo, setDropTwo] = useState(false);

    const [navbar, setNavbar] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token, role, user } = useSelector(
        (state) => state.auth
    );

    
    useEffect(() => {
        const fetchNavbar = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/navbar"
                );

                setNavbar(response.data);

            } catch (error) {
                console.error(
                    "Failed to fetch navbar:",
                    error
                );
            }
        };

        fetchNavbar();
    }, []);

    

    const handleLogout = () => {
        dispatch(logout());

        toast.success("Logout Successfully!");

        setMobileMenu(false);

        navigate("/login", {
            replace: true,
        });
    };

    

    const linkClass = ({ isActive }) =>
        `px-3 py-2 text-base font-medium transition ${
            isActive
                ? "text-orange-500"
                : "text-gray-800 hover:text-orange-500"
        }`;

    

    const navLinks = navbar
        ? [
              {
                  name: navbar.home_text,
                  path: "/home",
              },
              {
                  name: navbar.about_text,
                  path: "/about",
              },
              {
                  name: navbar.locations_text,
                  path: "/locations",
              },
              {
                  name: navbar.contact_text,
                  path: "/contact",
              },
              {
                  name: navbar.career_text,
                  path: "/career",
              },
          ]
        : [];

   

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

    

    if (!navbar) {
        return null;
    }

    return (
        <nav className="w-full border-b border-gray-200 bg-white shadow-sm">


            <div className="flex min-h-[72px] items-center px-6">

               

                <Link
                    to="/home"
                    onClick={() => setMobileMenu(false)}
                    className="flex shrink-0 items-center"
                >
                    {navbar.logo ? (
                        <img
                            src={`http://localhost:8000${navbar.logo}`}
                            alt="Logo"
                            className="h-20 w-auto object-contain"
                        />
                    ) : (
                        <span className="text-xl font-bold text-orange-500">
                            Logo
                        </span>
                    )}
                </Link>


                <div className="ml-auto hidden items-center lg:flex">

                   

                    <div className="flex items-center">

                        {navLinks.map((item) => (
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
                            onMouseEnter={() =>
                                setDropOne(true)
                            }
                            onMouseLeave={() =>
                                setDropOne(false)
                            }
                        >
                            <button
                                type="button"
                                className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-800 hover:text-orange-500"
                            >
                                {navbar.services_text}

                                <FiChevronDown size={16} />
                            </button>

                            {dropOne && (
                                <div className="absolute left-0 top-full z-50 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">

                                    {services.map((service) => (
                                        <Link
                                            key={service.path}
                                            to={service.path}
                                            className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                        >
                                            {service.name}
                                        </Link>
                                    ))}

                                </div>
                            )}
                        </div>


                        <div
                            className="relative"
                            onMouseEnter={() =>
                                setDropTwo(true)
                            }
                            onMouseLeave={() =>
                                setDropTwo(false)
                            }
                        >
                            <button
                                type="button"
                                className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-800 hover:text-orange-500"
                            >
                                {navbar.sector_text}

                                <FiChevronDown size={16} />
                            </button>

                            {dropTwo && (
                                <div className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">

                                    {sectors.map((sector) => (
                                        <Link
                                            key={sector.path}
                                            to={sector.path}
                                            className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                        >
                                            {sector.name}
                                        </Link>
                                    ))}

                                </div>
                            )}
                        </div>

                    </div>


                    {token ? (
                        <div className="ml-3 flex items-center border-l border-gray-200 pl-3">
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="ml-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500"
                            >
                                Logout
                            </button>

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="ml-3 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                        >
                            Login
                        </Link>
                    )}

                </div>


                <button
                    type="button"
                    onClick={() =>
                        setMobileMenu(!mobileMenu)
                    }
                    className="ml-auto rounded-lg p-2 text-gray-800 hover:bg-gray-100 lg:hidden"
                >
                    {mobileMenu ? (
                        <FiX size={26} />
                    ) : (
                        <FiMenu size={26} />
                    )}
                </button>

            </div>


            {mobileMenu && (
                <div className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg lg:hidden">

                    {/* NORMAL LINKS */}

                    {navLinks.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() =>
                                setMobileMenu(false)
                            }
                            className={({ isActive }) =>
                                `block border-b border-gray-100 px-3 py-3 text-base font-medium ${
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
                            onClick={() =>
                                setDropOne(!dropOne)
                            }
                            className="flex w-full items-center justify-between px-3 py-3 font-medium text-gray-800"
                        >
                            <span>
                                {navbar.services_text}
                            </span>

                            <FiChevronDown
                                size={18}
                                className={
                                    dropOne
                                        ? "rotate-180"
                                        : ""
                                }
                            />
                        </button>

                        {dropOne && (
                            <div className="mb-2 rounded-lg bg-gray-50">

                                {services.map((service) => (
                                    <Link
                                        key={service.path}
                                        to={service.path}
                                        onClick={() =>
                                            setMobileMenu(false)
                                        }
                                        className="block px-6 py-3 text-sm text-gray-600 hover:text-orange-500"
                                    >
                                        {service.name}
                                    </Link>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* SECTOR */}

                    <div className="border-b border-gray-100">

                        <button
                            type="button"
                            onClick={() =>
                                setDropTwo(!dropTwo)
                            }
                            className="flex w-full items-center justify-between px-3 py-3 font-medium text-gray-800"
                        >
                            <span>
                                {navbar.sector_text}
                            </span>

                            <FiChevronDown
                                size={18}
                                className={
                                    dropTwo
                                        ? "rotate-180"
                                        : ""
                                }
                            />
                        </button>

                        {dropTwo && (
                            <div className="mb-2 rounded-lg bg-gray-50">

                                {sectors.map((sector) => (
                                    <Link
                                        key={sector.path}
                                        to={sector.path}
                                        onClick={() =>
                                            setMobileMenu(false)
                                        }
                                        className="block px-6 py-3 text-sm text-gray-600 hover:text-orange-500"
                                    >
                                        {sector.name}
                                    </Link>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* USER */}

                    {token ? (
                        <>
                            <div className="mt-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3">

                                <Link
                                    to="/dashboard"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                >
                                    <CgProfile size={28} />
                                </Link>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Logged in as
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        {user?.fullname}
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={handleLogout}
                                className="mt-3 w-full rounded-lg border px-4 py-3 text-left font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() =>
                                setMobileMenu(false)
                            }
                            className="mt-3 block rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white"
                        >
                            Login
                        </Link>
                    )}

                </div>
            )}

        </nav>
    );
}

export default Navbar;