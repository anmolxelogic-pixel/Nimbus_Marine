import React, { useEffect, useMemo, useState } from "react";
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



const API_URL = "http://localhost:8000/api/admin/services";


const iconMap = {
    users: <FaUsers />,
    graduation: <FaGraduationCap />,
    file: <FaFileAlt />,
    plane: <FaPlane />,
    handshake: <FaHandshake />,
    anchor: <FaAnchor />,
    ship: <GiCargoShip />,
};

function Service() {

    const [services, setServices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [editingService, setEditingService] = useState(null);

    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "",
    });


    const fetchServices = async () => {

        try {

            setLoading(true);

            const response = await axios.get(API_URL);

            console.log(
                "Services:",
                response.data
            );

            setServices(response.data);

        } catch (error) {

            console.error(
                "Error fetching services:",
                error
            );

            alert("Failed to load services");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchServices();

    }, []);


    const totalServices = services.length;

    const activeServices = services.length;

    const inactiveServices = 0;


    const filteredServices = useMemo(() => {

        const value = search
            .toLowerCase()
            .trim();


        return services.filter((service) => {

            return (

                service.title
                    ?.toLowerCase()
                    .includes(value)

                ||

                service.description
                    ?.toLowerCase()
                    .includes(value)

            );

        });

    }, [services, search]);


    const handleAddService = () => {

        setEditingService(null);

        setFormData({
            title: "",
            description: "",
            icon: "",
        });

        setShowModal(true);

    };

    const handleEditService = (service) => {

        setEditingService(service);

        setFormData({

            title: service.title || "",

            description:
                service.description || "",

            icon: service.icon || "",

        });

        setShowModal(true);

    };


    // ==================================================
    // CLOSE MODAL
    // ==================================================

    const handleCloseModal = () => {

        setShowModal(false);

        setEditingService(null);

        setFormData({
            title: "",
            description: "",
            icon: "",
        });

    };

    const handleChange = (e) => {

        const {name,value} = e.target;

        setFormData((prev) => ({...prev,[name]: value,}));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (
            !formData.title.trim() ||
            !formData.description.trim()
        ) {
            alert(
                "Please enter title and description."
            );
            return;
        }
        try {

            if (editingService) {
                const response = await axios.put(

                    `${API_URL}/${editingService.id}`,

                    {
                        title:
                            formData.title.trim(),

                        description:
                            formData.description.trim(),

                        icon:
                            formData.icon || null,
                    }

                );
                console.log("Update response:",response.data);
                alert("Service updated successfully!");
            }
            else {
                const response = await axios.post(
                    API_URL,
                    {
                        title:
                            formData.title.trim(),
                        description:
                            formData.description.trim(),
                        icon:
                            formData.icon || null,
                    }
                );
                console.log("Add response:",response.data);
                alert("Service added successfully!");
            }

            handleCloseModal();
            await fetchServices();
        } catch (error) {
            console.error("Save service error:",error);
            alert(error.response?.data?.message || "Failed to save service");
        }
    };

    const handleDelete = async (id) => {
        const service =
            services.find(
                (item) =>
                    item.id === id
            );
        const confirmed =
            window.confirm(  `Are you sure you want to delete "${service?.title}"?`);

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/${id}`
            );
            alert("Service deleted successfully!");
            await fetchServices();
        } catch (error) {
            console.error("Delete service error:",error);
            alert("Failed to delete service");
        }

    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <p className="text-slate-600">
                    Loading services...
                </p>
            </div>

        );
    }


    return (

        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="mx-auto max-w-[1400px]">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Services Editor</h1>
                        <p className="mt-1 text-sm text-slate-500"> Manage your website services</p>

                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                            <span className="text-xs text-slate-500">Total</span>
                            <span className="ml-2 font-semibold text-slate-900">{totalServices}</span>
                        </div>


                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                            <span className="text-xs text-slate-500">Active</span>
                            <span sclassName="ml-2 font-semibold text-emerald-500">{activeServices}</span>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                            <span className="text-xs text-slate-500">Inactive</span>
                            <span className="ml-2 font-semibold text-red-500">{inactiveServices}</span>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900">Service List</h2>
                            <p className="mt-1 text-xs text-slate-500"> Manage services stored in database</p>
                        </div>
                        <button onClick={handleAddService} className="rounded-lg bg-slate-900 px-4 py-2.5  text-sm  font-medium  text-white  transition hover:bg-slate-800">+ Add New Service</button>
                    </div>

                     {/* serach box */}
                    <div className="border-b border-slate-200 p-4 ">
                        {/* <input type="text" placeholder="Search services..." value={search} onChange={(e) =>setSearch(e.target.value)}
                            className=" w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white"/> */}
                    </div> 

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 text-left">
                                    <th className=" w-14 px-5 py-3 text-xs font-semibold uppercase text-slate-500">NO.</th>
                                    <th className="w-24 px-3 py-3 text-xs font-semibold uppercase text-slate-500">Icon</th>
                                    <th className="px-3 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                                    <th className="px-3 py-3 text-xs font-semibold uppercase text-slate-500">Description</th>
                                    <th className="w-40 px-3 py-3 text-xs font-semibold uppercase text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredServices.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-12 text-center text-sm text-slate-500">No services found.</td>
                                    </tr>

                                ) : (

                                    filteredServices.map(
                                        (service, index) => (
                                            <tr key={service.id} className=" group transition hover:bg-slate-50/70">
                                                <td className="px-5 py-4 text-sm text-slate-500">{index + 1}</td>
                                                <td className="px-3 py-4">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-2xl text-orange-500">
                                                        {iconMap[service.icon] || <FaAnchor />}
                                                    </div>

                                                </td>

                                                <td className="px-3 py-4">
                                                    <div className="max-w-[250px]font-medium text-slate-800">{service.title}</div>
                                                </td>

                                                <td className="px-3 py-4">
                                                    <div className="max-w-[500px] text-sm leading-6 text-slate-600">
                                                        {service.description}
                                                    </div>
                                                </td>

                                                <td className="px-3 py-4">
                                                    <div className="flex items-center gap-2">

                                                        <button onClick={() =>handleEditService(service)}
                                                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                                                        >
                                                            Edit
                                                        </button>


                                                        <button onClick={() =>handleDelete(service.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-100">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-500">
                            Showing{" "}
                            <span className="font-medium text-slate-700">{filteredServices.length}</span>
                            {" "}of{" "}
                            <span className=" font-medium text-slate-700">{totalServices}</span>{" "}services
                        </p>
                    </div>
                </div>
            </div>

            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                        <div
                            className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    {editingService ? "Edit Service" : "Add New Service"}</h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {editingService
                                        ? "Update service information."
                                        : "Create a new website service."}

                                </p>
                            </div>
                            <button type="button" onClick={handleCloseModal} className=" text-xl text-slate-400 hover:text-slate-700">×</button>

                        </div>

                        <form onSubmit={handleSubmit} className=" space-y-5 p-6">
                            <div>
                                <label className=" mb-1.5 block text-sm font-medium text-slate-700">Service Title</label>
                                <input type="text"  name="title"  placeholder="e.g. Crew Management"  value={formData.title}  onChange={handleChange}  className="  w-full  rounded-lg  border  border-slate-200  px-4 py-2.5  text-sm  outline-none  focus:border-slate-400 " required/>
                            </div>

                            <div>
                                <label className=" mb-1.5 block text-sm font-medium  text-slate-700">Description</label>
                                <textarea rows="4" name="description" placeholder="Enter service description..." value={formData.description}  onChange={handleChange} className="  w-full resize-none  rounded-lg  border  border-slate-200  px-4  py-2.5  text-sm  outline-none focus:border-slate-400" required  />
                            </div>

                            <div>
                                <label className="  mb-1.5 block text-sm font-medium text-slate-700">Icon</label>
                                <select name="icon" value={formData.icon} onChange={handleChange} className=" w-full rounded-lg border border-slate-200  bg-white  px-4  py-2.5  text-sm  outline-none focus:border-slate-400  " >
                                    <option value=""> Select Icon </option>
                                    <option value="users">Users</option>
                                    <option value="graduation">Graduation </option>
                                    <option value="file"> File</option>
                                    <option value="plane">Plane</option>
                                    <option value="handshake">  Handshake</option>
                                    <option value="anchor">Anchor</option>
                                    <option value="ship"> Ship</option>
                                </select>
                            </div>

                            <div className="flexjustify-end gap-3 border-t border-slate-200pt-5">
                                <button type="button" onClick={handleCloseModal} className="  rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium  text-slate-600  hover:bg-slate-50 " >Cancel</button>
                                <button  type="submit"  className="  rounded-lg  bg-slate-900  px-5  py-2.5  text-sm font-medium text-white  hover:bg-slate-800">
                                    {editingService  ? "Update Service" : "Create Service"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Service;