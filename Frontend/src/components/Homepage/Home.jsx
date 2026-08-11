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
            const response = await axios.get(
                "http://localhost:8000/api/files/get"
            );
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
            <div className="flex min-h-screen items-center justify-center px-4 text-center">
                Loading...
            </div>
        );
    }

    if (!homeData) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4 text-center">
                Unable to load homepage content.
            </div>
        );
    }

    return (
        <>

            <section
                className="relative min-h-[600px] w-full bg-cover bg-center bg-no-repeat sm:min-h-[650px] lg:min-h-[700px]"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >

                <div className="relative mx-auto flex min-h-[600px] w-full max-w-[1220px] items-center px-5 py-12 sm:min-h-[650px] sm:px-8 lg:min-h-[700px] lg:px-10">
                    <div className="w-full max-w-[700px] lg:ml-[5%]">
                        
                        <h3
                            className="
                                whitespace-pre-line
                                text-3xl
                                font-bold
                                leading-[1.15]
                                tracking-tight
                                text-white
                                sm:text-4xl
                                md:text-5xl
                                lg:text-[54px]
                            "
                        >
                            {homeData.heading}
                        </h3>

                        <p
                            className="
                                mt-4
                                max-w-[600px]
                                text-base
                                font-medium
                                leading-relaxed
                                text-white
                                sm:text-lg
                                md:text-xl
                            "
                        >
                            {homeData.subtitle}
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                onClick={() => navigate("/")}
                                className="
                                    w-full
                                    cursor-pointer
                                    bg-orange-500
                                    px-6
                                    py-3.5
                                    font-poppins
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-orange-600
                                    sm:w-auto
                                    sm:text-base
                                "
                            >
                                {homeData.primaryButton}
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="
                                    w-full
                                    cursor-pointer
                                    bg-orange-500
                                    px-6
                                    py-3.5
                                    font-poppins
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-orange-600
                                    sm:w-auto
                                    sm:text-base
                                "
                            >
                                {homeData.secondaryButton}
                            </button>
                        </div>

                        <div
                            className="
                                mt-10
                                grid
                                grid-cols-1
                                gap-6
                                sm:mt-12
                                sm:grid-cols-2
                                lg:grid-cols-3
                                lg:gap-5
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-orange-500 text-2xl text-orange-500 sm:h-14 sm:w-14 sm:text-3xl">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="font-montserrat text-xl font-bold text-white sm:text-2xl">
                                        {homeData.experienceNumber}
                                    </h3>

                                    <p className="font-poppins text-sm text-white sm:text-base lg:text-lg">
                                        {homeData.experienceText}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-orange-500 text-lg font-bold text-orange-500 sm:h-14 sm:w-14 sm:text-2xl">
                                    ISO
                                </div>

                                <div>
                                    <h3 className="font-montserrat text-xl font-bold text-white sm:text-2xl">
                                        {homeData.isoNumber}
                                    </h3>

                                    <p className="font-poppins text-sm text-white sm:text-base lg:text-lg">
                                        {homeData.isoText}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-orange-500 text-2xl text-orange-500 sm:h-14 sm:w-14 sm:text-3xl">
                                    ◎
                                </div>

                                <div>
                                    <h3 className="font-montserrat text-xl font-bold text-white sm:text-2xl">
                                        {homeData.countriesNumber}
                                    </h3>

                                    <p className="font-poppins text-sm text-white sm:text-base lg:text-lg">
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
