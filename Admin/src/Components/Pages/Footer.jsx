import React, { useEffect, useState } from "react";
import axios from "axios";

function Footer() {
    const [footer, setFooter] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFooter();
    }, []);

    const fetchFooter = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/footer"
            );

            setFooter(response.data);
        } catch (error) {
            console.error("Get footer error:", error);
        }
    };

    const handleChange = (e) => {
        setFooter({
            ...footer,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setLogoFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            Object.keys(footer).forEach((key) => {
                if (
                    key !== "id" &&
                    key !== "logo" &&
                    key !== "updated_at"
                ) {
                    formData.append(key, footer[key] ?? "");
                }
            });

            if (logoFile) {
                formData.append("logo", logoFile);
            }

            const response = await axios.put(
                "http://localhost:8000/api/footer",
                formData
            );

            console.log("Footer update response:", response.data);

            alert("Footer updated successfully");

            setLogoFile(null);

            await fetchFooter();
        } catch (error) {
            console.error("Footer update error:", error);

            alert(
                error.response?.data?.message ||
                    "Failed to update footer"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!footer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Footer Editor
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage all footer content displayed on the website.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-8 rounded-xl bg-white p-8 shadow"
            >
                <div>
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Company Information
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block font-semibold">
                                Footer Logo
                            </label>

                            {footer.logo && (
                                <div className="mb-4">
                                    <img
                                        src={`http://localhost:8000${footer.logo}`}
                                        alt="Footer Logo"
                                        className="h-20 w-auto object-contain"
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleLogoChange}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold">
                                Company Name
                            </label>

                            <input
                                name="company_name"
                                value={footer.company_name || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold">
                                Company Tagline
                            </label>

                            <input
                                name="company_tagline"
                                value={footer.company_tagline || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold">
                                Company Description
                            </label>

                            <textarea
                                name="company_description"
                                value={footer.company_description || ""}
                                onChange={handleChange}
                                rows="4"
                                className="w-full rounded border p-3"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Social Media
                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block font-semibold">
                                Facebook URL
                            </label>

                            <input
                                name="facebook_url"
                                value={footer.facebook_url || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                                placeholder="Facebook URL"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold">
                                LinkedIn URL
                            </label>

                            <input
                                name="linkedin_url"
                                value={footer.linkedin_url || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                                placeholder="LinkedIn URL"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold">
                                Twitter URL
                            </label>

                            <input
                                name="twitter_url"
                                value={footer.twitter_url || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                                placeholder="Twitter URL"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Quick Links
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block font-semibold">
                                Quick Links Title
                            </label>

                            <input
                                name="quick_links_title"
                                value={footer.quick_links_title || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Home
                                </label>

                                <input
                                    name="quick_home"
                                    value={footer.quick_home || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Dashboard
                                </label>

                                <input
                                    name="quick_dashboard"
                                    value={footer.quick_dashboard || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Profile
                                </label>

                                <input
                                    name="quick_profile"
                                    value={footer.quick_profile || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Support
                                </label>

                                <input
                                    name="quick_support"
                                    value={footer.quick_support || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Resources
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block font-semibold">
                                Resources Title
                            </label>

                            <input
                                name="resources_title"
                                value={footer.resources_title || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Privacy Policy
                                </label>

                                <input
                                    name="resource_privacy"
                                    value={footer.resource_privacy || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Terms & Conditions
                                </label>

                                <input
                                    name="resource_terms"
                                    value={footer.resource_terms || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Documentation
                                </label>

                                <input
                                    name="resource_documentation"
                                    value={
                                        footer.resource_documentation || ""
                                    }
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Help Center
                                </label>

                                <input
                                    name="resource_help"
                                    value={footer.resource_help || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Contact Information
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block font-semibold">
                                Contact Title
                            </label>

                            <input
                                name="contact_title"
                                value={footer.contact_title || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold">
                                Address
                            </label>

                            <textarea
                                name="contact_address"
                                value={footer.contact_address || ""}
                                onChange={handleChange}
                                rows="3"
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Phone
                                </label>

                                <input
                                    name="contact_phone"
                                    value={footer.contact_phone || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Email
                                </label>

                                <input
                                    name="contact_email"
                                    value={footer.contact_email || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Website
                                </label>

                                <input
                                    name="contact_website"
                                    value={footer.contact_website || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Certifications
                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="rounded-lg bg-gray-50 p-5">
                            <p className="font-semibold text-gray-800">
                                {footer.certification_one_title}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {footer.certification_one_description}
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-5">
                            <p className="font-semibold text-gray-800">
                                {footer.certification_two_title}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {footer.certification_two_description}
                            </p>
                        </div>
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        Certification information is displayed here and is
                        not editable from this section.
                    </p>
                </div>

                <div className="border-t pt-8">
                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                        Bottom Footer
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block font-semibold">
                                Copyright Text
                            </label>

                            <input
                                name="copyright_text"
                                value={footer.copyright_text || ""}
                                onChange={handleChange}
                                className="w-full rounded border p-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-semibold">
                                    Privacy Text
                                </label>

                                <input
                                    name="privacy_text"
                                    value={footer.privacy_text || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Terms Text
                                </label>

                                <input
                                    name="terms_text"
                                    value={footer.terms_text || ""}
                                    onChange={handleChange}
                                    className="w-full rounded border p-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <button type="submit" disabled={loading} className="rounded bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? "Updating..." : "Update Footer"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Footer;