import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/navbar";
const SERVER_URL = "http://localhost:8000";

const createMenuItem = () => ({
    name: "",
    type: "link",
    link: "",
    subItems: [],
});

const createSubItem = () => ({
    name: "",
    link: "",
});

function Navbar() {
    const [navbarId, setNavbarId] = useState(null);
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchNavbar = async () => {
        try {
            setLoading(true);

            const response = await axios.get(API_URL);
            const data = response.data?.data;

            if (!data?.id) {
                throw new Error("Navbar data not found");
            }

            setNavbarId(Number(data.id));

            setMenuItems(Array.isArray(data.menu_items) ? data.menu_items : []);

            if (data.logo) {
                setLogoPreview(
                    data.logo.startsWith("http")
                        ? data.logo
                        : `${SERVER_URL}${data.logo}`
                );
            } else {
                setLogoPreview(null);
            }
        } catch (error) {
            console.error("Fetch navbar error:", error);
            toast.error("Failed to load navbar");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNavbar();
    }, []);

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = ["image/png","image/jpeg","image/webp"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Only PNG, JPG and WEBP files are allowed");
            return;
        }

        setLogo(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const addMenuItem = () => {
        setMenuItems((prev) => [
            ...prev,
            createMenuItem(),
        ]);
    };

    const removeMenuItem = (menuIndex) => {
        setMenuItems((prev) =>
            prev.filter((_, index) => index !== menuIndex)
        );
    };

    const updateMenuItem = (menuIndex, field, value) => {
        setMenuItems((prev) =>
            prev.map((item, index) => {
                if (index !== menuIndex) return item;

                const updatedItem = {
                    ...item,
                    [field]: value,
                };

                if (field === "type" && value === "link") {
                    updatedItem.subItems = [];
                }

                if (field === "type" && value === "dropdown") {
                    updatedItem.link = "";
                    updatedItem.subItems = item.subItems || [];
                }

                return updatedItem;
            })
        );
    };

    const addSubItem = (menuIndex) => {
        setMenuItems((prev) =>
            prev.map((item, index) =>
                index === menuIndex
                    ? {
                        ...item,
                        subItems: [
                            ...(item.subItems || []),
                            createSubItem(),
                        ],
                    }
                    : item
            )
        );
    };

    const removeSubItem = (menuIndex, subIndex) => {
        setMenuItems((prev) =>
            prev.map((item, index) =>
                index === menuIndex
                    ? {
                        ...item,
                        subItems: (item.subItems || []).filter(
                            (_, index) => index !== subIndex
                        ),
                    }
                    : item
            )
        );
    };

    const updateSubItem = (menuIndex,subIndex,field, value) => {
        setMenuItems((prev) =>
            prev.map((item, index) =>
                index === menuIndex
                    ? {
                        ...item,
                        subItems: (item.subItems || []).map(
                            (subItem, index) =>
                                index === subIndex
                                    ? {
                                        ...subItem,
                                        [field]: value,
                                    }
                                    : subItem
                        ),
                    }
                    : item
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!navbarId) {
            toast.error("Navbar ID not found");
            return;
        }

        if (!Array.isArray(menuItems)) {
            toast.error("Menu items must be an array");
            return;
        }

        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("menu_items",JSON.stringify(menuItems));

            formData.append("is_active", "true");

            if (logo instanceof File) {
                formData.append("logo", logo);
            }
            // console.log("UPDATE URL:", `${API_URL}/${navbarId}`);

            for (const [key, value] of formData.entries()) {
                // console.log(key, value);
            }

            const response = await axios.put(`${API_URL}/${navbarId}`,formData);

            toast.success("Navbar updated successfully");
            alert("Navbar updated successfully");
            setLogo(null);
            await fetchNavbar();
        } catch (error) {
            console.error("Save navbar error:", error);
            toast.error("Failed to update navbar");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white rounded-xl p-8">
                    <p className="text-gray-500">
                        Loading navbar...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Navbar Manager
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Manage your website logo, navigation menus and dropdown items.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Website Logo
                        </h2>

                        <p className="text-sm text-gray-500 mt-1 mb-5">
                            Upload the logo displayed in your navbar.
                        </p>

                        <div className="flex items-center gap-6">
                            <div className="w-52 h-28 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Navbar Logo" className="max-w-full max-h-full object-contain"/>
                                ) : (
                                    <span className="text-sm text-gray-400">No logo</span>
                                )}
                            </div>

                            <div>
                                <label>
                                    <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg cursor-pointer font-medium">
                                        Upload Logo
                                    </span>

                                    <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleLogoChange}/>

                                </label>

                                <p className="text-xs text-gray-400 mt-2"> PNG, JPG or WEBP </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Navigation Menu
                                </h2>
                                <p className="text-sm text-gray-500 mt-1"> Create menus and dropdown submenus. </p>
                            </div>

                            <button type="button" onClick={addMenuItem} className="bg-gray-900 text-white px-5 py-3 rounded-lg">
                                + Add Menu
                            </button>
                        </div>

                        {menuItems.length === 0 && (
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                                <p className="text-gray-500">
                                    No menu items yet.
                                </p>

                                <button type="button" onClick={addMenuItem} className="mt-3 text-orange-500 font-semibold">
                                    + Add your first menu
                                </button>
                            </div>
                        )}

                        <div className="space-y-5">
                            {menuItems.map((item, menuIndex) => (
                                <div key={menuIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="bg-gray-50 px-5 py-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {item.name || "New Menu"}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {item.type === "dropdown" ? "Dropdown menu" : "Link"}
                                            </p>
                                        </div>

                                        <button type="button" onClick={() => removeMenuItem(menuIndex)} className="text-red-500">
                                            Delete
                                        </button>
                                    </div>

                                    <div className="p-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Menu Name
                                                </label>

                                                <input
                                                    type="text"
                                                    value={item.name || ""}
                                                    onChange={(e) =>
                                                        updateMenuItem(
                                                            menuIndex,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Services"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Menu Type
                                                </label>

                                                <select
                                                    value={item.type || "link"}
                                                    onChange={(e) =>
                                                        updateMenuItem(
                                                            menuIndex,
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                                >
                                                    <option value="link">
                                                        Link
                                                    </option>
                                                    <option value="dropdown">
                                                        Dropdown
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {item.type === "link" && (
                                            <div className="mt-5">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Path / URL
                                                </label>

                                                <input
                                                    type="text"
                                                    value={item.link || ""}
                                                    onChange={(e) =>
                                                        updateMenuItem(
                                                            menuIndex,
                                                            "link",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="/about"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                                />
                                            </div>
                                        )}

                                        {item.type === "dropdown" && (
                                            <div className="mt-6 bg-gray-50 rounded-xl p-5">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-gray-800">
                                                        Submenu Items
                                                    </h3>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addSubItem(menuIndex)
                                                        }
                                                        className="text-orange-500 font-semibold"
                                                    >
                                                        + Add Submenu
                                                    </button>
                                                </div>

                                                <div className="space-y-3">
                                                    {(item.subItems || []).map(
                                                        (
                                                            subItem,
                                                            subIndex
                                                        ) => (
                                                            <div
                                                                key={subIndex}
                                                                className="bg-white border border-gray-200 rounded-lg p-4"
                                                            >
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            subItem.name ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateSubItem(
                                                                                menuIndex,
                                                                                subIndex,
                                                                                "name",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        placeholder="Submenu name"
                                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                                                                    />

                                                                    <input type="text" value={ subItem.link || ""}
                                                                        onChange={(e) =>updateSubItem(menuIndex,subIndex,"link",e.target.value)}
                                                                        placeholder="/services/example"
                                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                                                                    />
                                                                </div>

                                                                <button type="button" onClick={() => removeSubItem(menuIndex,subIndex)} className="mt-3 text-red-500">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {menuItems.length > 0 && (
                            <button type="button" onClick={addMenuItem} className="w-full mt-5 border-2 border-dashed border-gray-200 rounded-xl py-4">
                                + Add Another Menu
                            </button>
                        )}

                        <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                            <button type="submit" disabled={saving || !navbarId} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50">
                                {saving ? "Saving..." : "Save Navbar"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Navbar;