import React, { useState } from "react";
import { toast } from "react-toastify";
import Dashboard from "../Pages/Dashboard";
import User from "../Pages/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../Frontend/src/features/Auth/authSlice";
import Contact from "../Pages/Contact";
import Service from "../Pages/Service";
import HomeText from "../Pages/HomeText";
import CaseStudy from "../Pages/CaseStudy";
import Pages from "../Pages/Pages";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import { FiHome, FiLayout, FiMenu, FiType, FiUsers, FiFileText, FiMail, FiBookOpen,FiLogOut, FiChevronDown,} from "react-icons/fi";

function AdminDashboard() {
    const [menu, setMenu] = useState("dashboard");
    const [homeOpen, setHomeOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout successfully");
        navigate("/login");
    };

    const main = [
        {
            id: "dashboard",
            name: "Dashboard",
            icon: <FiHome size={20} />,
        },
        {
            id: "homeManager",
            name: "Home Manager",
            icon: <FiLayout size={20} />,
        },
        {
            id: "footer",
            name: "Footer",
            icon: <FiFileText size={20} />,
        },
        {
            id: "users",
            name: "Users",
            icon: <FiUsers size={20} />,
        },
        {
            id: "pages",
            name: "Pages",
            icon: <FiFileText size={20} />,
        },
        {
            id: "contact",
            name: "Contact",
            icon: <FiMail size={20} />,
        },
        {
            id: "CaseStudy",
            name: "Case Study",
            icon: <FiBookOpen size={20} />,
        },
    ];

    const homeItems = [
        {
            id: "service",
            name: "Services",
            icon: <FiLayout size={18} />,
        },
        {
            id: "navbar",
            name: "Navbar",
            icon: <FiMenu size={18} />,
        },
        
        {
            id: "HomeText",
            name: "Home Text",
            icon: <FiType size={18} />,
        },
        
    ];

    const renderPage = () => {
        switch (menu) {
            case "dashboard":
                return <Dashboard />;

            case "service":
                return <Service />;

            case "navbar":
                return <Navbar />;

            case "HomeText":
                return <HomeText />;

            case "footer":
                return <Footer />;

            case "users":
                return <User />;

            case "contact":
                return <Contact />;

            case "pages":
                return <Pages />;

            case "CaseStudy":
                return <CaseStudy />;

            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <aside className="w-72 shrink-0 bg-white border-r border-gray-200 shadow-sm">
                <div className="h-20 flex items-center px-6 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Admin Panel
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">
                            Website Management
                        </p>
                    </div>
                </div>

                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
                    <button
                        onClick={() => setMenu("dashboard")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            menu === "dashboard"
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                        <FiHome size={20} />
                        <span className="font-medium">Dashboard</span>
                    </button>

                    <div>
                        <button
                            onClick={() => setHomeOpen(!homeOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition ${
                                homeOpen
                                    ? "bg-orange-50 text-orange-500"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <FiLayout size={20} />
                                <span className="font-medium">
                                    Home Manager
                                </span>
                            </div>

                            <FiChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${
                                    homeOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {homeOpen && (
                            <div className="mt-2 ml-4 pl-4 border-l-2 border-orange-200 space-y-1">
                                {homeItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setMenu(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm transition ${
                                            menu === item.id
                                                ? "bg-orange-500 text-white"
                                                : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                                        }`}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setMenu("footer")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            menu === "footer"
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                        <FiFileText size={20} />
                        <span className="font-medium">Footer</span>
                    </button>

                    <button
                        onClick={() => setMenu("users")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            menu === "users"
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                        <FiUsers size={20} />
                        <span className="font-medium">Users</span>
                    </button>

                    <button
                        onClick={() => setMenu("pages")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            menu === "pages"
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                        <FiFileText size={20} />
                        <span className="font-medium">Pages</span>
                    </button>

                    <button
                        onClick={() => setMenu("contact")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            menu === "contact"
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                        <FiMail size={20} />
                        <span className="font-medium">Contact</span>
                    </button>

                    <button
                        onClick={() => setMenu("CaseStudy")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            menu === "CaseStudy"
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                    >
                        <FiBookOpen size={20} />
                        <span className="font-medium">Case Study</span>
                    </button>

                    <div className="pt-4 mt-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition"
                        >
                            <FiLogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            <main className="flex-1 min-w-0 h-screen overflow-y-auto bg-gray-100">
                {renderPage()}
            </main>
        </div>
    );
}
export default AdminDashboard;