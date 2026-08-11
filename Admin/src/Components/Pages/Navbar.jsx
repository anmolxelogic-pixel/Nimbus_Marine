import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
    const [formData, setFormData] = useState({
        home_text: "",
        about_text: "",
        locations_text: "",
        contact_text: "",
        career_text: "",
        services_text: "",
        sector_text: "",
    });

    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // ==========================================
    // GET CURRENT NAVBAR DATA
    // ==========================================

    useEffect(() => {
        const fetchNavbar = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/navbar"
                );

                console.log("Navbar:", response.data);

                const data = response.data;

                setFormData({
                    home_text: data.home_text || "",
                    about_text: data.about_text || "",
                    locations_text: data.locations_text || "",
                    contact_text: data.contact_text || "",
                    career_text: data.career_text || "",
                    services_text: data.services_text || "",
                    sector_text: data.sector_text || "",
                });

                if (data.logo) {
                    setLogoPreview(
                        `http://localhost:8000${data.logo}`
                    );
                }

            } catch (error) {
                console.error(
                    "Failed to fetch navbar:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load navbar"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchNavbar();
    }, []);


    // ==========================================
    // TEXT CHANGE
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // ==========================================
    // LOGO CHANGE
    // ==========================================

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setLogo(file);

        setLogoPreview(
            URL.createObjectURL(file)
        );
    };


    // ==========================================
    // UPDATE NAVBAR
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = new FormData();

            data.append(
                "home_text",
                formData.home_text
            );

            data.append(
                "about_text",
                formData.about_text
            );

            data.append(
                "locations_text",
                formData.locations_text
            );

            data.append(
                "contact_text",
                formData.contact_text
            );

            data.append(
                "career_text",
                formData.career_text
            );

            data.append(
                "services_text",
                formData.services_text
            );

            data.append(
                "sector_text",
                formData.sector_text
            );


            // Only send logo if admin selected a new one
            if (logo) {
                data.append("logo", logo);
            }


            const response = await axios.put(
                "http://localhost:8000/api/navbar",
                data
            );


            console.log(
                "Navbar updated:",
                response.data
            );


            toast.success(
                "Navbar updated successfully!"
            );


            // Refresh navbar data after saving
            const updated = await axios.get(
                "http://localhost:8000/api/navbar"
            );


            if (updated.data.logo) {
                setLogoPreview(
                    `http://localhost:8000${updated.data.logo}?t=${Date.now()}`
                );
            }

            setLogo(null);

        } catch (error) {

            console.error(
                "Navbar update error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update navbar"
            );

        } finally {
            setSaving(false);
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <p className="text-gray-600">
                    Loading navbar...
                </p>
            </div>
        );
    }


    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Navbar Manager
                </h1>

                <p className="mt-2 text-gray-500">
                    Update the text and logo displayed on your website navbar.
                </p>

            </div>


            <form
                onSubmit={handleSubmit}
                className="max-w-4xl bg-white rounded-xl shadow-sm p-8"
            >

                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        Website Logo
                    </h2>


                    <div className="w-40 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">

                        {logoPreview ? (

                            <img
                                src={logoPreview}
                                alt="Navbar Logo"
                                className="max-w-full max-h-full object-contain"
                            />

                        ) : (

                            <span className="text-gray-400 text-sm">
                                No logo
                            </span>

                        )}

                    </div>


                    <label className="inline-block mt-4">

                        <span className="inline-block bg-orange-500 text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-orange-600 transition">
                            Upload / Change Logo
                        </span>

                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                    </label>

                </div>


                {/* ================================= */}
                {/* NAVBAR TEXT */}
                {/* ================================= */}

                <div className="mb-8">

                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Navbar Text
                    </h2>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* HOME */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Home
                            </label>

                            <input
                                type="text"
                                name="home_text"
                                value={formData.home_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>


                        {/* ABOUT */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                About
                            </label>

                            <input
                                type="text"
                                name="about_text"
                                value={formData.about_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>


                        {/* LOCATIONS */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Locations
                            </label>

                            <input
                                type="text"
                                name="locations_text"
                                value={formData.locations_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>


                        {/* CONTACT */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact
                            </label>

                            <input
                                type="text"
                                name="contact_text"
                                value={formData.contact_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>


                        {/* CAREER */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Career
                            </label>

                            <input
                                type="text"
                                name="career_text"
                                value={formData.career_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>


                        {/* SERVICES */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Services
                            </label>

                            <input
                                type="text"
                                name="services_text"
                                value={formData.services_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>


                        {/* SECTOR */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sector
                            </label>

                            <input
                                type="text"
                                name="sector_text"
                                value={formData.sector_text}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                            />

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* SAVE */}
                {/* ================================= */}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                    >
                        {saving
                            ? "Saving..."
                            : "Save Navbar"
                        }
                    </button>

                </div>

            </form>

        </div>
    );
}

export default Navbar;