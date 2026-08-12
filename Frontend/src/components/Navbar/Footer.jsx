import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiFacebookFill } from "react-icons/ri";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { useSelector } from "react-redux";

function Footer() {
    const [footer, setFooter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token, role, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/footer");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to fetch footer");
                }
                setFooter(data);

            } catch (error) {
                console.error("Footer fetch error:", error);
                setError("Failed to load footer");
            } finally {
                setLoading(false);
            }
        };

        fetchFooter();
    }, []);

    if (loading) {
        return (
            <footer className="bg-white py-10">
                <div className="text-center">
                    <p className="text-gray-500">
                        Loading footer...
                    </p>
                </div>
            </footer>
        );
    }

    if (error) {
        return (
            <footer className="bg-white py-10">
                <div className="text-center">
                    <p className="text-red-500">
                        {error}
                    </p>
                </div>
            </footer>
        );
    }

    if (!footer) {
        return null;
    }

    const logoUrl = footer.logo ? `http://localhost:8000${footer.logo}` : null;

    return (
        <footer className="bg-white">

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

                    <div className="text-center sm:text-left">

                        <div className="flex items-center justify-center gap-3 sm:justify-start">

                            {logoUrl && (
                                <img src={logoUrl} alt={footer.company_name || "Company Logo"} className="w-12 sm:w-14 object-contain" />
                            )}

                            <div>
                                <h2 className="text-3xl font-extrabold uppercase tracking-wide text-black sm:text-4xl">{footer.company_name} </h2>
                                <p className="text-xs font-semibold uppercase tracking-wider text-black sm:text-sm">{footer.company_tagline}</p>
                            </div>

                        </div>

                        <p className="mt-5 text-sm leading-7 text-black sm:mt-6">{footer.company_description}</p>


                        <div className="mt-6 flex justify-center gap-3 sm:justify-start sm:gap-4">

                            <p href={"/facebook"} target="_blank" rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ff7a00] transition duration-300 hover:scale-105 hover:bg-orange-600"
                            >
                                <RiFacebookFill size={24} />
                            </p>

                            <p
                                href={footer.linkedin_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ff7a00] transition duration-300 hover:scale-105 hover:bg-orange-600"
                            >
                                <FaLinkedinIn size={20} />
                            </p>

                            <p href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                                className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ff7a00] transition duration-300 hover:scale-105 hover:bg-orange-600"
                            >
                                <FaTwitter size={20} />
                            </p>

                        </div>

                    </div>

                    <div className="border-t border-gray-300 pt-8 text-center sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-left lg:pl-8">

                        <h3 className="mb-5 text-xl font-bold uppercase text-black sm:text-2xl">
                            {footer.quick_links_title}
                        </h3>

                        <ul className="space-y-3 text-sm sm:space-y-4 sm:text-base">

                            <li>
                                <Link
                                    className="text-black transition duration-300 hover:text-[#ff7a00]"
                                    to="/"
                                >
                                    {footer.quick_home}
                                </Link>
                            </li>

                            
                            <li>
                                {token ? (
                                     <Link
                                    className="text-black transition duration-300 hover:text-[#ff7a00]"
                                    to="/dashboard"
                                >
                                    {footer.quick_dashboard}
                                </Link>
                                ) : (
                                     <Link
                                    className="text-black transition duration-300 hover:text-[#ff7a00]"
                                    to="/Login"
                                >
                                   Dashboard
                                </Link>
                                )}
                               
                            </li>

                            <li>
                                <Link
                                    className="text-black transition duration-300 hover:text-[#ff7a00]"
                                    to="/support"
                                >
                                    {footer.quick_support}
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div className="border-t border-gray-300 pt-8 text-center sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-left lg:pl-8">

                        <h3 className="mb-5 text-xl font-bold uppercase text-black sm:text-2xl">
                            {footer.resources_title}
                        </h3>

                        <ul className="space-y-3 text-sm sm:space-y-4 sm:text-base">

                            <li>
                                <Link
                                    className="text-black transition hover:text-[#ff7a00]"
                                    to="/privacy"
                                >
                                    {footer.resource_privacy}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-black transition hover:text-[#ff7a00]"
                                    to="/terms"
                                >
                                    {footer.resource_terms}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-black transition hover:text-[#ff7a00]"
                                    to="/documentation"
                                >
                                    {footer.resource_documentation}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="text-black transition hover:text-[#ff7a00]"
                                    to="/help"
                                >
                                    {footer.resource_help}
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div className="border-t border-gray-300 pt-8 text-center sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:text-left lg:pl-8">

                        <h3 className="mb-5 text-xl font-bold uppercase text-black sm:text-2xl">
                            {footer.contact_title}
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-start justify-center gap-3 sm:justify-start">

                                <FaLocationDot className="mt-1 shrink-0 text-black" />

                                <p className="text-sm leading-6 text-black sm:text-base">
                                    {footer.contact_address}
                                </p>

                            </div>

                            <div className="flex items-center justify-center gap-3 sm:justify-start">

                                <FaPhone className="shrink-0 text-black" />

                                <p className="break-all text-sm text-black sm:text-base">
                                    {footer.contact_phone}
                                </p>

                            </div>

                            <div className="flex items-start justify-center gap-3 sm:justify-start">

                                <MdEmail className="mt-1 shrink-0 text-black" />

                                <p className="break-all text-sm text-black sm:text-base">
                                    {footer.contact_email}
                                </p>

                            </div>

                            <div className="flex items-start justify-center gap-3 sm:justify-start">

                                <BsGlobe className="mt-1 shrink-0 text-black" />

                                <p className="break-all text-sm text-black sm:text-base">
                                    {footer.contact_website}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="border-t border-gray-300 pt-8 text-center sm:col-span-2 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-left lg:col-span-1 lg:pl-8">

                        <h3 className="mb-6 text-xl font-bold uppercase text-black sm:text-2xl">
                            {footer.certification_title}
                        </h3>

                        <div className="space-y-6">

                            <div className="flex items-center justify-center gap-4 sm:justify-start">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-black text-sm font-bold text-black sm:h-16 sm:w-16">
                                    ISO
                                </div>

                                <div className="text-left">

                                    <h4 className="text-sm font-semibold text-black sm:text-base">
                                        {footer.certification_one_title}
                                    </h4>

                                    <p className="text-xs text-black sm:text-sm">
                                        {footer.certification_one_description}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center justify-center gap-4 sm:justify-start">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-black text-xl font-bold text-black sm:h-16 sm:w-16">
                                    ✓
                                </div>

                                <div className="text-left">

                                    <h4 className="text-sm font-semibold text-black sm:text-base">
                                        {footer.certification_two_title}
                                    </h4>

                                    <p className="text-xs text-black sm:text-sm">
                                        {footer.certification_two_description}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                <div className="mt-12 border-t border-gray-300 pt-6 sm:mt-14 sm:pt-8">

                    <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">

                        <p className="text-xs text-black sm:text-sm">
                            {footer.copyright_text}
                        </p>

                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:gap-x-8">

                            <Link
                                to="/privacy"
                                className="text-xs text-black transition hover:text-[#ff7a00] sm:text-sm"
                            >
                                {footer.privacy_text}
                            </Link>

                            <Link
                                to="/terms"
                                className="text-xs text-black transition hover:text-[#ff7a00] sm:text-sm"
                            >
                                {footer.terms_text}
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;