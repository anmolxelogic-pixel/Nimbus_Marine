import React, { useState } from "react";
import video from "../../assets/video.png";
import { CiPlay1 } from "react-icons/ci";
import { TbXboxXFilled } from "react-icons/tb";

function Video() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      className="relative min-h-[500px] sm:grid-cols-2 lg:grid-cols-3 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-6 text-center"
      style={{   backgroundImage: `url(${video})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>


      <div className="relative z-10 flex flex-col items-center">
        {
          !isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center bg-black rounded-full  justify-center w-20 h-20"
            >
              <CiPlay1 className="text-6xl text-white"   />
            </button>
          ) : (
            <div className="w-full bg-black mt-4">
              <iframe
                className="w-full p-4 max-w-4xl aspect-video rounded-xl shadow-2xl"
                src="https://www.youtube.com/embed/mCnVsaoHnp8?autoplay=1"
                title="YouTube video"
                allowFullScreen
              ></iframe>
              <button onClick={() => setIsPlaying(false)} className="absolute top-5 right-5 text-white bg-black/70 rounded-full w-8 h-8 flex items-center justify-around hover:bg-black" >
                <TbXboxXFilled />
              </button>

            </div>
          )
        }

        <div className="mt-10 max-w-3xl ">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Who We Are
          </h2>

          <p className="text-lg md:text-xl text-gray-200 leading-8">
            Since 2008, we have placed over 2,500 seafarers on-board from
            various locations around the world. We stand out with excellence
            in crew management, flag state, and agency solutions for the
            offshore and maritime industries.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Video;