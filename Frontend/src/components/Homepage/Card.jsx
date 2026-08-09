import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUsers,
  FaGraduationCap,
  FaFileAlt,
  FaPlane,
  FaHandshake,
  FaAnchor,
} from "react-icons/fa";

import { GiCargoShip } from "react-icons/gi";

const iconMap = {
  users: <FaUsers />,
  graduation: <FaGraduationCap />,
  file: <FaFileAlt />,
  plane: <FaPlane />,
  handshake: <FaHandshake />,
  anchor: <FaAnchor />,
  ship: <GiCargoShip />,
};

function Card() {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/Services/aa"
        );

        console.log("Services from backend:", response.data);

        // Make sure services is always an array
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else if (Array.isArray(response.data.data)) {
          setServices(response.data.data);
        } else {
          setServices([]);
        }

      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="text-center">
          <p className="text-lg text-gray-600">
            Loading services...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="text-center">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">

      <div className="mx-auto px-20 mb-6">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-orange-500 uppercase">
            Our Services
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            End-to-end maritime solutions
            tailored to your needs
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">
              No services available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            {services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 p-10 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              >

                <div className="text-4xl text-orange-500 flex justify-center mb-6">
                  {iconMap[service.icon] || <FaAnchor />}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-8">
                  {service.description}
                </p>

                <button
                  type="button"
                  className="mt-8 text-orange-500 font-semibold cursor-pointer hover:text-orange-600"
                >
                  Learn More →
                </button>

              </div>
            ))}

          </div>
        )}
      </div>

    </section>
  );
}

export default Card;