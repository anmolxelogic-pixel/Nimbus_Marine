import React from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
import Dashboard from '../Pages/Dashboard';
import User from '../Pages/User';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../../Frontend/src/features/Auth/authSlice';
import Contact from '../Pages/Contact';
import Service from '../Pages/Service';
import HomeText from '../Pages/HomeText';

function AdminDashboard() {
    const [menu, setMenu] = useState("dashboard");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout successfully")
        navigate("/login");
    }

    const main = [
        { id: "dashboard", name: "Dashboard" },
        { id: "HomepageManager", name: " HomePage Manager" },
        { id: "HomeText", name: " HomeText" },
        { id: "users", name: "Users" },
        { id: "contact", name: "Contact" },
        { id: "logout", name: "Logout" },
    ];

    const renderPage = () => {
        switch (menu) {
            case "dashboard":
                return (
                    <>
                        <Dashboard />
                    </>
                );
            case "HomepageManager":
                return (
                    <>
                      <Service/>
                    </>
                );
            case "HomeText":
                return (
                    <>
                      <HomeText/>
                    </>
                );
            case "users":
                return (
                    <>
                        <User />
                    </>
                );
            case "contact":
                return (
                    <>
                        <Contact />
                    </>
                );
            case "logout":
                return (
                    <>
                        <h1 className="text-4xl text-red-600 font-bold mb-4">Logout</h1>
                        <p>Welcome to the Logout Dashboard.</p>
                    </>
                );



        }
    }


    return (
        <div className="flex h-screen">


            <aside className="w-90 bg-gray-300  text-black">

                <div className="text-3xl font-bold p-6 border-b border-gray-700">
                    Admin Panel
                </div>

                <nav className="mt-4">
                    {main.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === "logout") {
                                    handleLogout();
                                } else {
                                    setMenu(item.id);
                                }
                            }}
                            className={`w-full text-left px-6 py-4 transition ${menu === item.id
                                ? "bg-orange-500 text-black font-semibold"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

            </aside>

            <main className="flex-1 bg-gray-100 ">
                {renderPage()}
            </main>

        </div>
    )

}
export default AdminDashboard;
