import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/Auth/authSlice";
import {
    FiMenu,
    FiX,
    FiChevronDown,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const API_URL = "http://localhost:8000/api/navbar";
const SERVER_URL = "http://localhost:8000";

function Navbar() {
    const [navbar, setNavbar] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token, user } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const fetchNavbar = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data?.data;

                if (!data) {
                    throw new Error("Navbar data not found");
                }

                setNavbar(data);
            } catch (error) {
                console.error("Failed to fetch navbar:", error);
            }
        };

        fetchNavbar();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout Successfully!");
        setMobileMenu(false);
        navigate("/login", { replace: true });
    };

    const getLogoUrl = () => {
        if (!navbar?.logo) return null;

        return navbar.logo.startsWith("http")
            ? navbar.logo
            : `${SERVER_URL}${navbar.logo}`;
    };

    const handleMenuClick = (index) => {
        setOpenMenu(
            openMenu === index ? null : index
        );
    };

    const closeMenus = () => {
        setMobileMenu(false);
        setOpenMenu(null);
    };

    const linkClass = ({ isActive }) =>
        `px-3 py-2 text-base font-medium transition ${
            isActive
                ? "text-orange-500"
                : "text-gray-800 hover:text-orange-500"
        }`;

    if (!navbar) {
        return null;
    }

    const menuItems = Array.isArray(navbar.menu_items)
        ? navbar.menu_items
        : [];

    return (
        <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="flex min-h-[72px] items-center px-6">
                <Link
                    to="/"
                    onClick={closeMenus}
                    className="flex shrink-0 items-center"
                >
                    {getLogoUrl() ? (
                        <img
                            src={getLogoUrl()}
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
                        {menuItems.map((item, index) => {
                            const isDropdown =
                                item.type === "dropdown";

                            if (!isDropdown) {
                                return (
                                    <NavLink
                                        key={index}
                                        to={item.link || "#"}
                                        className={linkClass}
                                    >
                                        {item.name}
                                    </NavLink>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() =>
                                        setOpenMenu(index)
                                    }
                                    onMouseLeave={() =>
                                        setOpenMenu(null)
                                    }
                                >
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 px-3 py-2 text-base font-medium text-gray-800 hover:text-orange-500"
                                    >
                                        {item.name}
                                        <FiChevronDown size={16} />
                                    </button>

                                    {openMenu === index && (
                                        <div className="absolute left-0 top-full z-50 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                                            {(item.subItems || []).map(
                                                (
                                                    subItem,
                                                    subIndex
                                                ) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={
                                                            subItem.link ||
                                                            "#"
                                                        }
                                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {token ? (
                        <div className="ml-3  items-center gap-3 border-l border-gray-200 pl-3">
                            <p className="font-medium text-gray-800">
                                {user?.fullname}
                            </p>

                            <button
                                onClick={handleLogout}
                                type="button"
                                className="py-2 text-sm font-medium text-gray-700 hover:text-orange-500"
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
                        setMobileMenu((prev) => !prev)
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
                    {menuItems.map((item, index) => {
                        const isDropdown =
                            item.type === "dropdown";

                        if (!isDropdown) {
                            return (
                                <NavLink
                                    key={index}
                                    to={item.link || "#"}
                                    onClick={closeMenus}
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
                            );
                        }

                        return (
                            <div
                                key={index}
                                className="border-b border-gray-100"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleMenuClick(index)
                                    }
                                    className="flex w-full items-center justify-between px-3 py-3 font-medium text-gray-800"
                                >
                                    <span>{item.name}</span>

                                    <FiChevronDown
                                        size={18}
                                        className={
                                            openMenu === index
                                                ? "rotate-180"
                                                : ""
                                        }
                                    />
                                </button>

                                {openMenu === index && (
                                    <div className="mb-2 rounded-lg bg-gray-50">
                                        {(item.subItems || []).map(
                                            (
                                                subItem,
                                                subIndex
                                            ) => (
                                                <Link
                                                    key={subIndex}
                                                    to={
                                                        subItem.link ||
                                                        "#"
                                                    }
                                                    onClick={
                                                        closeMenus
                                                    }
                                                    className="block px-6 py-3 text-sm text-gray-600 hover:text-orange-500"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {token ? (
                        <>
                            <div className="mt-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenus}
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
                                type="button"
                                className="mt-3 w-full rounded-lg border px-4 py-3 text-left font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            onClick={closeMenus}
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