import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';

const ApproveResearch = () => {

    const [open2, setOpen2] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const [updateFormData, setUpdateFormData] = useState({
        _id: '',
        status: false
    });

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleUpdateStatus = (row) => {
        setOpen2(true);
        setUpdateFormData({
            _id: row._id,
            status: true
        });
    };

    const refreshPage = () => {
        setRefresh((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/research`);
                const data = await response.json();
                setNotices(data);

                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [refresh]);

    const handleDelete = async (id) => {
        try {
            const result = await authAxios.delete(`${apiUrl}/research/${id}`);

            if (result) {
                handleClose2();
                toast.warning('Declined Successfully');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            refreshPage();
        }
    };

    const handleUpdate = async () => {
        try {
            const result = await authAxios.put(`${apiUrl}/research/${updateFormData._id}`, updateFormData);

            if (result) {
                toast.success('Approved Successfully');
                handleClose2();
                refreshPage();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Discription</TableCell>
                            <TableCell>Document</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {!isLoading ? <TableBody>
                        {notices.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.journalName}</TableCell>
                                <TableCell><Link style={{textDecoration: 'underline'}} to={row.imageLinkOfAcceptanceLetter} target='_blank'>{row.imageLinkOfAcceptanceLetter ? 'Download File' : 'File Not Available'}</Link></TableCell>
                                <TableCell>{row.status ? `Approved` : 'Pending'}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                                        onClick={() => handleUpdateStatus(row)}
                                        sx={{ marginRight: 2 }}
                                    > View </Button>

                                    <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>{row.title}</DialogTitle>
                                        <DialogContent>
                                            <div>
                                                <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 mt-4 mb-4">
                                                    <h2 className="text-xl font-bold mb-4">Project Details</h2>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">Topic: </label>
                                                        <span>{row.title}</span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">Journal Name: </label>
                                                        <span>{row.journalName}</span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">issnNumber: </label>
                                                        <span>{row.issnNumber}</span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">h5IndexLink: </label>
                                                        <span>{row.h5IndexLink}</span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">Co-Supervisor: </label>
                                                        <span>{row.hIndexLink}</span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">scopusSiteLink: </label>
                                                        <span>{row.scopusSiteLink}</span>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label className="font-semibold">Students:</label>
                                                        <div className="ml-2">
                                                            {row.students && row.students.map((student) => (
                                                                <div key={student.id}>
                                                                    {student.studentId ? `${student.studentId.regNo}` : 'N/A'} {student.studentId ? `${student.studentId.firstName} ${student.studentId.lastName}` : 'N/A'}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogActions style={{ justifyContent: 'center' }}>
                                                {row.status === false ? (
                                                <>
                                                    <Button size="small" startIcon={<SaveIcon />} onClick={handleUpdate} variant="contained" color="primary">
                                                        Approve
                                                    </Button>
                                                    <Button size="small" startIcon={<DeleteIcon />} variant="contained" color="error" onClick={() => handleDelete(updateFormData._id)}>
                                                        Decline
                                                    </Button>
                                                </>
                                            ) : (
                                                <span>Approved</span>
                                            )}

                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> : <Loader />
                    }
                </Table>
            </TableContainer>
        </div>
    )
}

export default ApproveResearch