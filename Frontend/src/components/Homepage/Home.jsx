import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Video from "./Video";

function Home() {
    const navigate = useNavigate();
    const [homeData, setHomeData] = useState(null);
    const [heroImage, setHeroImage] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchHomeContent = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/home");
            if (response.data.success) {
                setHomeData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching homepage content:", error);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/files/get");

            console.log("Image API:", response.data);

            console.log("Hero image:", heroImage);

            if (response.data.success && response.data.data?.url) {
                setHeroImage(response.data.data.url);
            }
        } catch (error) {
            console.error("Image fetch error:", error);
        }
    };

    useEffect(() => {
        const loadHome = async () => {
            await Promise.all([fetchHomeContent(), fetchImage()]);
            setLoading(false);
        };

        loadHome();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!homeData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Unable to load homepage content.
            </div>
        );
    }

    return (
        <>
            <section
                className="relative min-h-[700px] w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroImage})`
                }}
            >
                <div className="relative right-18 mx-auto flex min-h-[600px] max-w-[1220px] items-center px-6">
                    <div className="w-full max-w-[700px] pt-2 md:ml-[5%] lg:ml-[7%]">
                        <h3 className="text-xl font-bold leading-[1.2] tracking-tight text-white sm:text-5xl md:text-[54px] whitespace-pre-line">
                            {homeData.heading}
                        </h3>

                        <p className="mt-4 text-lg font-medium text-white sm:text-xl">
                            {homeData.subtitle}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-1">
                            <button
                                onClick={() => navigate("/")}
                                className="cursor-pointer bg-orange-500 px-5 py-4 font-poppins text-base font-medium text-white transition"
                            >
                                {homeData.primaryButton}
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="cursor-pointer bg-orange-500 px-5 py-4 font-poppins text-base font-medium text-white transition"
                            >
                                {homeData.secondaryButton}
                            </button>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center gap-3 gap-y-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-orange-500 text-3xl text-orange-500">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="font-montserrat text-2xl font-bold text-white">
                                        {homeData.experienceNumber}
                                    </h3>

                                    <p className="font-poppins text-lg text-white">
                                        {homeData.experienceText}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 text-2xl font-bold text-orange-500">
                                    ISO
                                </div>

                                <div>
                                    <h3 className="font-montserrat text-2xl font-bold text-white">
                                        {homeData.isoNumber}
                                    </h3>

                                    <p className="font-poppins text-lg text-white">
                                        {homeData.isoText}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-orange-500 text-3xl text-orange-500">
                                    ◎
                                </div>

                                <div>
                                    <h3 className="font-montserrat text-2xl font-bold text-white">
                                        {homeData.countriesNumber}
                                    </h3>

                                    <p className="font-poppins text-lg text-white">
                                        {homeData.countriesText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Card />
            <Video />
        </>
    );
}

export default Home;