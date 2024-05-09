import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Radio,
    FormControlLabel,
    FormGroup,
    Typography,
    Divider,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

// Additional imports
import { RadioGroup, FormLabel } from '@mui/material';

const SupProjectGroups = () => {

    const publishedBy = "teacher";
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState({
        title: '',
        description: '',
        audience: '',
        publishedBy: publishedBy,
    });


    const [updateFormData, setUpdateFormData] = useState({
        _id: '',
        title: '',
        description: '',
        audience: '',
        publishedBy: publishedBy,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleUpdateNotice = (row) => {
        setOpen2(true);
        setUpdateFormData({
            _id: row._id,
            title: row.title,
            description: row.description,
            audience: row.audience,
        });
    };

    const refreshPage = () => {
        setRefresh((prev) => !prev);
    };

    useEffect(() => {

        const getUserDetails = async () => {
            try {
                const response = await authAxios.get(`${apiUrl}/group/supProj`);
                setNotices(response.data);
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 404) {
                    toast.error('user profile not found.');
                } else {
                    toast.error(error.response?.data?.message || 'An error occurred');
                }
            }
        };
        getUserDetails();
    }, []);

    const handleCreateNotice = (field, value) => {
        setNewNotice((prevData) => ({ ...prevData, [field]: value }));
    };

    const publishNotice = async () => {
        try {
            const result = await fetch(`${apiUrl}/notices/create-notice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotice),
            });
            const data = await result.json();

            if (result.ok) {
                console.log('Notice Published successfully:', data);
                toast.success(data.message);
                refreshPage();
                handleClose();
            } else {
                console.error('Error creating teacher:', data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error creating teacher:', error);
            toast.error('An error occurred while creating the teacher.');
        }
    };

    const handleDeleteNotice = async (id) => {
        try {
            const result = await authAxios.delete(`${apiUrl}/notices/delete-notice/${id}`);

            if (result) {
                handleClose2();
                toast.warning('Notice Deleted Successfully');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            refreshPage();
        }
    };

    const handleUpdate = async () => {
        try {
            const result = await authAxios.put(`${apiUrl}/notices/update-notice/${updateFormData._id}`, updateFormData);

            if (result) {
                toast.success('Notice Updated Successfully');
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
                            <TableCell>specialization</TableCell>
                            <TableCell>projectTitle</TableCell>
                            <TableCell>researchArea</TableCell>
                            <TableCell>Supervisor</TableCell>
                            <TableCell>Cosupervisor</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.specialization ? `${row.specialization.specialization}` : 'N/A'}</TableCell>
                                <TableCell>{row.projectTitle}</TableCell>
                                <TableCell>{row.researchArea}</TableCell>
                                <TableCell>{row.supervisor ? `${row.supervisor.firstName} ${row.supervisor.lastName}` : 'N/A'}</TableCell>
                                <TableCell>{row.coSupervisor ? `${row.coSupervisor.firstName} ${row.coSupervisor.lastName}` : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                                        onClick={() => handleUpdateNotice(row)}
                                        sx={{ marginRight: 2 }}
                                    > View </Button>

                                    <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                                        <DialogTitle sx={{ textAlign: 'center' }}>Student Details</DialogTitle>
                                        <DialogContent>
                                            {row.students.map((std, index) => (
                                                <div key={index}>
                                                    <Typography variant="h6" gutterBottom>
                                                        Student {index + 1}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        <strong>Student Name: </strong> {std.studentId.firstName} {std.studentId.lastName}
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        <strong>Registration No: </strong> {std.studentId.regNo}
                                                    </Typography>
                                                    <Divider />
                                                </div>
                                            ))}
                                            <DialogActions style={{ justifyContent: 'center' }}>
                                                <Button size="small" startIcon={<CancelIcon />} variant='outlined' onClick={handleClose2}>Cancel</Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SupProjectGroups