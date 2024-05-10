import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from "../../utils/Constants";
import { uploadFileToCloud } from "../../utils/CloudinaryConfig";

export default function Research() {
    const [students, setStudents] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [isUploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        student1: "",
        student2: "",
        student3: "",
        student4: "",
        supervisor1: "",
        supervisor2: "",
        // coSupervisor1: "",
        // coSupervisor2: "",
        journalName: "",
        issnNumber: "",
        h5IndexLink: "",
        hIndexLink: "",
        scopusSiteLink: "",
        imageLinkOfAcceptanceLetter: previewImage,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            imageLinkOfAcceptanceLetter: previewImage
        }));
    }, [previewImage])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            console.log(previewImage);
            if (!formData.imageLinkOfAcceptanceLetter) {
                throw Error('Image is required')
            }
            const response = await axios.post(`${apiUrl}/research/`, formData);

            console.log("Research Paper Submitted successfully!");
            toast.success("Research Paper Submitted successfully!");
            // Redirect to '/dashboard/studentDash'
            <Link to="/dashboard/studentDash">Go to Student Dashboard</Link>

        } catch (error) {
            console.error("Error submitting research paper:", error);
            toast.error("Error submitting research paper. Please try again later.");
        }
    };

    const handleImageUpload = async (event) => {
        console.log('file change');
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setUploading(true)
                const resp = await uploadFileToCloud(file)
                setPreviewImage(resp)
                setUploading(false)
            } else {
                alert('Please select an image file.');
            }
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/group/stdGroup`);
            const studentIds = res.data.students.map(student => student.studentId);
            setStudents(studentIds);
            console.log(studentIds);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const fetchSupervisors = async () => {
        try {
            const data = await authAxios.get(`${apiUrl}/admin/get-all-supervisors`);
            setSupervisors(data.data);
            console.log(data)
        } catch (error) {
            toast.error("You need to enroll for the class");
        }
    };

    useEffect(() => {
        getUserDetails();
        fetchSupervisors(); // Call fetchSupervisors here
    }, []);

    return (
        <>
            <div className="main_container w-full h-full">
                <div className="item fw-bold text-center">
                    <h2 className="pageName" style={{ fontSize: '2em' }}>Research Paper Submission</h2>
                </div>

                <div className="card p-5">
                    <div className="smallcard row max-w-5xl mx-auto border rounded-md py-10 px-10">
                        <div className="col-md-6">
                            <form id="itemForm" className="ml-7" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2">
                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="title"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Title"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="block min-w-[885px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-10">



                                    {/*Students */}
                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="student1"
                                        >
                                            Student 1
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="student1"
                                                value={formData.student1}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Student 1</option>
                                                {students.map(studentId => (
                                                    <option key={studentId.regNo} value={studentId._id}>{`${studentId.firstName} ${studentId.lastName}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="student2"
                                        >
                                            Student 2
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="student2"
                                                value={formData.student2}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Student 2</option>
                                                {students.map(studentId => (
                                                    <option key={studentId.regNo} value={studentId._id}>{`${studentId.firstName} ${studentId.lastName}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="student3"
                                        >
                                            Student 3
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="student3"
                                                value={formData.student3}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Student 3</option>
                                                {students.map(studentId => (
                                                    <option key={studentId.regNo} value={studentId._id}>{`${studentId.firstName} ${studentId.lastName}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="student4"
                                        >
                                            Student 4
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  bg-white  border-slate-300 shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="student4"
                                                value={formData.student4}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Student 4</option>
                                                {students.map(studentId => (
                                                    <option key={studentId.regNo} value={studentId._id}>{`${studentId.firstName} ${studentId.lastName}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                {/*Students */}
                                <div className="flex flex-wrap">
                                    <div className="col mt-10 flex-1">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="supervisor1"
                                        >
                                            Supervisor1
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="supervisor1"
                                                value={formData.supervisor1}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Supervisor 1</option>
                                                {supervisors.map((supervisor, index) => (
                                                    <option key={index} value={supervisor._id}>
                                                        {`${supervisor.firstName} ${supervisor.lastName}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col mt-10 flex-1">
                                        <label
                                            className="block text-sm font-medium text-slate-500"
                                            htmlFor="supervisor2"
                                        >
                                            Supervisor2
                                        </label>
                                        <div className="relative h-10 w-72 min-w-[425px]">
                                            <select
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                                name="supervisor2"
                                                value={formData.supervisor2}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Supervisor 2</option>
                                                {supervisors.map((supervisor, index) => (
                                                    <option key={index} value={supervisor._id}>
                                                        {`${supervisor.firstName} ${supervisor.lastName}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                {/* Journal name input starts here */}
                                <div className="grid grid-cols-2">
                                    <div className="col mt-10">
                                        <label className="block text-sm font-medium text-slate-500" htmlFor="journalName">
                                            Journal Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter the journalName"
                                            className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="journalName"
                                            value={formData.journalName}
                                            onChange={handleChange}
                                        />
                                    </div>




                                    {/* ISSN number input starts here */}
                                    <div className="col mt-10">
                                        <label className="block text-sm font-medium text-slate-500" htmlFor="ISSNNumber">
                                            ISSN Number
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter the ISSN Number here"
                                            className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="issnNumber"
                                            value={formData.issnNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                                {/* H5-IndexLink input starts here */}
                                <div className="grid grid-cols-2">
                                    <div className="col mt-10">
                                        <label className="block text-sm font-medium text-slate-500" htmlFor="h5IndexLink">
                                            H5-Index Link
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter the h5IndexLink here"
                                            className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="h5IndexLink"
                                            value={formData.h5IndexLink}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    {/* H-IndexLink input starts here */}
                                    <div className="col mt-10">
                                        <label className="block text-sm font-medium text-slate-500" htmlFor="hIndexLink">
                                            H-Index Link
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter the H-Index here"
                                            className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="hIndexLink"
                                            value={formData.hIndexLink}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                                {/* Scopus Site Link input starts here */}
                                <div className="grid grid-cols-2">
                                    <div className="col mt-10">
                                        <label className="block text-sm font-medium text-slate-500" htmlFor="scopusSiteLink">
                                            Scopus Site Link
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter the Scopus Site Link here"
                                            className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="scopusSiteLink"
                                            value={formData.scopusSiteLink}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    {/* Image Link input starts here */}
                                    <div className="col mt-10">


                                        <label className="block text-sm font-medium text-slate-500" htmlFor="acceptanceLetterUpload">
                                            Upload Acceptance Letter
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-72 min-w-[425px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
        placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                            name="acceptanceLetterUpload"
                                            onChange={handleImageUpload} // Call function to handle image upload
                                        />
                                        <div className="w-20 h-20">
                                            <img src={previewImage} alt={isUploading ? 'Uploading....' : 'Image'} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                                <br /><br />

                                <div>
                                    <div>

                                        {/* Submission buttons part */}
                                        <div style={{ display: 'flex', marginBottom: '20px', marginLeft: '284px' }}>
                                            <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                                                <Button
                                                    style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }}
                                                    variant="contained"
                                                    type="submit"
                                                >
                                                    Add
                                                </Button>
                                                <div style={{ width: '50px' }}></div> {/* This adds space between buttons */}
                                                <Button
                                                    style={{ backgroundColor: '#f44336', color: 'white' }}
                                                    variant="contained"
                                                    fullWidth
                                                    component={Link}
                                                    to="/inventory"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}
