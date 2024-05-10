import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';

export default function ProjectGroup() {
    const [data, setData] = useState({});
    const [statusData, setStatusData] = useState({});

    const getUserDetails = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/group/stdGroup`);
            setData(res.data);
            if (res){
            const stat = await authAxios.get(`${apiUrl}/research/std`);
            setStatusData(stat.data.status);
            console.log(statusData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 mt-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            <div className="mb-2">
                <label className="font-semibold">Topic: </label>
                <span>{data.projectTitle}</span>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Research Area: </label>
                <span>{data.researchArea}</span>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Specialization: </label>
                <span>{data.specialization ? data.specialization.specialization : 'N/A'}</span>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Supervisor: </label>
                <span>{data.supervisor ? `${data.supervisor.firstName} ${data.supervisor.lastName}` : 'N/A'}</span>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Co-Supervisor: </label>
                <span>{data.coSupervisor ? `${data.coSupervisor.firstName} ${data.coSupervisor.lastName}` : 'N/A'}</span>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Students:</label>
                <div className="ml-2">
                    {data.students && data.students.map((student) => (
                        <div key={student.id}>
                            {student.studentId ? `${student.studentId.regNo}` : 'N/A'} {student.studentId ? `${student.studentId.firstName} ${student.studentId.lastName}` : 'N/A'} 
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-2">
                <label className="font-semibold">Research Status: </label>
                <span>{statusData ? (statusData === true ? 'Approved' : 'Declined') : 'Pending'}</span>
            </div>
        </div>
    );
}
