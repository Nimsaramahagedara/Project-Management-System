import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box
} from '@mui/material';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

export default function StdAssignment() {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [newNotice, setNewNotice] = useState({
        title: '',
        description: '',
        audience: ''
    });

    const getDetails = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/assignment/`);
            setData(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateNotice = (field, value) => {
        setNewNotice((prevData) => ({ ...prevData, [field]: value }));
    };


    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {data.map((assignment, index) => (
                    <div key={index} className="bg-white p-6 rounded-md shadow-md mt-3 mb-3">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                            <p className="text-gray-600 mb-4">{assignment.description}</p>
                            <p className="text-gray-500">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button color="primary" onClick={handleClickOpen}>Add Submission</button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Submit</DialogTitle>
                                <DialogContent>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': {
                                                m: 1,
                                                width: 500,
                                                maxWidth: '100%',
                                            },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                id="notice-title"
                                                label="Title"
                                                fullWidth
                                                onChange={(e) => handleCreateNotice('title', e.target.value)}
                                                value={newNotice.title}
                                            />
                                        </div>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={console.log()} variant='outlined'>Submit</Button>
                                    <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
