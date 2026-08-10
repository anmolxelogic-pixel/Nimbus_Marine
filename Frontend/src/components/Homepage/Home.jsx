import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../features/Auth/authSlice";
import hero from "../../assets/hero-image.png";
import Card from './Card';
import Video from './Video'

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState("");

  const fetchHomeContent = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/home");

      console.log("Home content from backend:", response.data);

      if (response.data.success) {
        setHomeData(response.data.data);
      }

    } catch (error) {
      console.error("Error fetching homepage content:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async()=>{
    try {
     const response = await axios.get("http://localhost:8000/api/files");

      console.log("Image content from backend:", response.data);

      if (response.data.success) {
        setHeroImage(response.data.data);
      }

       
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchHomeContent(),
    fetchImage()
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

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
        className="relative min-h-[700px] w-full  lg:grid-cols-3 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero})` }}
      >

        <div className="relative right-18 mx-auto flex min-h-[600px] max-w-[1220px] items-center px-6">
          <div className="w-full max-w-[700px] pt-2 md:ml-[5%] lg:ml-[7%]">

            <h3 className="font-bold text-xl font-bold leading-[1.2] tracking-tight text-white sm:text-5xl md:text-[54px] whitespace-pre-line">
              {homeData.heading}
            </h3>

            <p className="mt-4 text-lg font-medium text-white sm:text-xl">
              {homeData.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-1">

              <button
                onClick={() => navigate("/")}
                className="bg-orange-500 px-5 py-4 font-poppins text-base font-medium text-white transition cursor-pointer"
              >
                {homeData.primaryButton}
              </button>

              <button
                onClick={() => navigate("/")}
                className="bg-orange-500 px-5 py-4 font-poppins text-base font-medium cursor-pointer text-white transition"
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

                <div className="flex h-14 w-14 items-center rounded-full border-4 justify-center text-2xl font-bold text-orange-500">
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
      <Card/>
     <Video />
    </>
  );
}

export default Home;