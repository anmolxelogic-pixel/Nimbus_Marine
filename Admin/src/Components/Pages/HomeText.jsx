import React, { useEffect, useState } from "react";
import axios from "axios";
import banner from "../../assets/banner.png";

function HomeText() {
    const [formData, setFormData] = useState({
        heading: "",
        subtitle: "",
        primaryButton: "",
        secondaryButton: "",
        experienceNumber: "",
        experienceText: "",
        isoNumber: "",
        isoText: "",
        countriesNumber: "",
        countriesText: "",
    });

    const [heroImage, setHeroImage] = useState("");
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const fetchHomeContent = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/home"
            );

            if (response.data.success) {
                setFormData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching homepage content:", error);
            alert("Failed to load homepage content");
        }
    };

    const fetchHeroImage = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/files/hero"
            );

            if (response.data.success) {
                setHeroImage(response.data.data.url);
            }
        } catch (error) {
            console.log("No hero image found");
        }
    };

    useEffect(() => {
        fetchHomeContent();
        fetchHeroImage();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const response = await axios.put(
                "http://localhost:8000/api/home",
                formData
            );

            if (response.data.success) {
                setFormData(response.data.data);
                alert("Home page text updated successfully!");
            }
        } catch (error) {
            console.error("Error updating homepage content:", error);
            alert(
                error.response?.data?.message ||
                "Failed to update homepage content"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            alert("Only PNG, JPG and WEBP images are allowed");
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select an image first");
            return;
        }

        try {
            setUploading(true);

            const data = new FormData();
            data.append("hero", file);

            const response = await axios.put(
                "http://localhost:8000/api/files/hero",
                data
            );

            setHeroImage(response.data.data.url);
            setFile(null);

            alert("Hero image updated successfully!");
        } catch (error) {
            console.error("Hero upload error:", error);
            alert(
                error.response?.data?.message ||
                "Failed to update hero image"
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Home Text
                </h1>
                <p className="mt-2 text-gray-500">
                    Update the text and hero image displayed on your website homepage.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="mb-6 text-xl font-bold text-gray-800">
                        Homepage Content
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Main Heading
                            </label>
                            <textarea
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                rows="3"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Primary Button Text
                                </label>
                                <input
                                    type="text"
                                    name="primaryButton"
                                    value={formData.primaryButton}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Secondary Button Text
                                </label>
                                <input
                                    type="text"
                                    name="secondaryButton"
                                    value={formData.secondaryButton}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                                Homepage Statistics
                            </h3>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Experience Number
                                    </label>
                                    <input type="text" name="experienceNumber" value={formData.experienceNumber} onChange={handleChange}
                                        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                                    />

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">  Experience Text</label>
                                    <input type="text" name="experienceText" value={formData.experienceText} onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500" />
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        ISO Number
                                    </label>
                                    <input type="text" name="isoNumber" value={formData.isoNumber} onChange={handleChange}
                                        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"/>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        ISO Text
                                    </label>
                                    <input type="text" name="isoText" value={formData.isoText} onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div className="rounded-lg border border-gray-200 p-4">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Countries Number
                                    </label>
                                    <input  type="text"  name="countriesNumber"  value={formData.countriesNumber}  onChange={handleChange}
                                        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                                    />

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Countries Text
                                    </label>
                                    <input type="text" name="countriesText" value={formData.countriesText} onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-gray-200 pt-5">
                            <button
                                type="submit" disabled={saving} className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-2 text-xl font-bold text-gray-800">
                            Hero Image
                        </h2>

                        <p className="mb-5 text-sm text-gray-500">
                            Replace the homepage hero image.
                        </p>

                        <div className="mb-5 overflow-hidden rounded-lg">
                            <img src={heroImage || banner} alt="Current hero" className="h-48 w-full object-cover"/>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Select New Image
                            </label>

                            <label className="block cursor-pointer rounded-lg border border-dashed border-gray-300 bg-white px-4 py-4 transition hover:border-orange-500">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                                        📁
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-700">
                                            Choose hero image
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            PNG, JPG or WEBP
                                        </p>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>

                            {file && (
                                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                                    <p className="text-sm font-medium text-green-700">
                                        Selected file
                                    </p>
                                    <p className="mt-1 truncate text-xs text-green-600">
                                        {file.name}
                                    </p>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="mt-4 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {uploading ? "Updating..." : "Update Image"}
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-bold text-gray-800">
                            Content Preview
                        </h2>

                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={heroImage || banner}
                                alt="Hero preview"
                                className="h-[500px] w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/50"></div>

                            <div className="absolute inset-0 flex flex-col justify-center p-8">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange-400">
                                    Homepage Hero
                                </p>

                                <h3 className="text-2xl font-extrabold leading-tight text-white">
                                    {formData.heading || "Your homepage heading"}
                                </h3>

                                <p className="mt-4 max-w-xl text-sm leading-6 text-gray-200">
                                    {formData.subtitle ||
                                        "Your homepage subtitle will appear here."}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <span className="rounded bg-orange-500 px-3 py-2 text-xs font-semibold text-white">
                                        {formData.primaryButton || "Primary Button"}
                                    </span>

                                    <span className="rounded border border-white/50 px-3 py-2 text-xs font-semibold text-white">
                                        {formData.secondaryButton || "Secondary Button"}
                                    </span>
                                </div>

                                <div className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-white/30 pt-5">
                                    <div>
                                        <p className="text-xl font-bold text-white">
                                            {formData.experienceNumber || "0"}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-300">
                                            {formData.experienceText || "Experience"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xl font-bold text-white">
                                            {formData.isoNumber || "0"}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-300">
                                            {formData.isoText || "ISO"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xl font-bold text-white">
                                            {formData.countriesNumber || "0"}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-300">
                                            {formData.countriesText || "Countries"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeText;