import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    // finally {
    //   setLoading(false);
    // }
  };

  
  useEffect(() => {
    fetchHomeContent();
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

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Home Text
        </h1>

        <p className="mt-2 text-gray-500">
          Update the text displayed on your website homepage.
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

                {/* Experience */}
                <div className="rounded-lg border border-gray-200 p-4">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Experience Number
                  </label>

                  <input
                    type="text"
                    name="experienceNumber"
                    value={formData.experienceNumber}
                    onChange={handleChange}
                    className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                  />

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Experience Text
                  </label>

                  <input
                    type="text"
                    name="experienceText"
                    value={formData.experienceText}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                  />

                </div>

                <div className="rounded-lg border border-gray-200 p-4">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    ISO Number
                  </label>

                  <input
                    type="text"
                    name="isoNumber"
                    value={formData.isoNumber}
                    onChange={handleChange}
                    className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                  />

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    ISO Text
                  </label>

                  <input
                    type="text"
                    name="isoText"
                    value={formData.isoText}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                  />

                </div>

                <div className="rounded-lg border border-gray-200 p-4">

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Countries Number
                  </label>

                  <input
                    type="text"
                    name="countriesNumber"
                    value={formData.countriesNumber}
                    onChange={handleChange}
                    className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                  />

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Countries Text
                  </label>

                  <input
                    type="text"
                    name="countriesText"
                    value={formData.countriesText}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
                  />

                </div>

              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-5">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>
        </div>


        {/* <div className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Content Preview
          </h2>

          <div className="rounded-lg bg-gray-900 p-6">

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-orange-500">
              Homepage Hero
            </p>

            <h3 className="text-2xl font-extrabold leading-tight text-white">
              {formData.heading}
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              {formData.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded bg-orange-500 px-3 py-2 text-xs font-semibold text-white">
                {formData.primaryButton}
              </span>

              <span className="rounded bg-orange-500 px-3 py-2 text-xs font-semibold text-white">
                {formData.secondaryButton}
              </span>

            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-gray-700 pt-5">

              <div>
                <p className="text-xl font-bold text-white">
                  {formData.experienceNumber}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formData.experienceText}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-white">
                  {formData.isoNumber}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formData.isoText}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-white">
                  {formData.countriesNumber}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formData.countriesText}
                </p>
              </div>

            </div>

          </div>
        </div> */}

      </div>
    </div>
  );
}

export default HomeText;