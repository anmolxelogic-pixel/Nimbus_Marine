import React from 'react'
import banner from "../../assets/banner.png"

function Contact() {
  return (
    <div className="relative h-full">
     <img src={banner} alt="Contact Banner" className="min-h-screen"/>
    <div className="absolute inset-0  text-white bg-black/40">
        <h6 className="text-lg uppercase tracking-widest">
            Get in Touch
        </h6>
        <h1 className="text-4xl font-bold">
            Contact Us - Nimbus Marine
        </h1>
    </div>
</div>
  )
}

export default Contact
