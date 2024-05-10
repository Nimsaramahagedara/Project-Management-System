import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Input
} from '@mui/material';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { uploadFileToCloud } from '../../utils/CloudinaryConfig';

export default function StdAssignment() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null); // State to store the currently selected assignment
    const [newSubmission, setNewSubmission] = useState({
        submission: '',
        remark: '',
        file:''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState("");
    const [isUploading, setUploading] = useState(false);

    const addSubmission = async () => {
        try {
            const response = await authAxios.post(`${apiUrl}/submission`, {
                ...newSubmission,
                assId: selectedAssignment._id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response) {
                toast.success('Successfully added');
                handleClose();
            } else {
                toast.error('Error');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred.');
        }
    };

    const getAssignments = async () => {
        try {
            const res = await authAxios.get(`${apiUrl}/assignment/`);
            setData(res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getAssignments();
    }, []);

    const handleClickOpen = (assignment) => {
        setSelectedAssignment(assignment); // Set the selected assignment
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewSubmission({
            assId: '',
            submission: '',
            remark: ''
        })
    };

    const handleInputChange = (field, value) => {
        setNewSubmission((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleUpload = async (event) => {
        console.log('file change');
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedFile(file);
                setUploading(true)
                const resp = await uploadFileToCloud(file)
                setPreviewFile(resp)
                setUploading(false)
            } else {
                alert('Please select an image file.');
            }
        }
    };
    useEffect(()=>{
        setNewSubmission((prevFormData) => ({
            ...prevFormData,
            file: previewFile
        }));
    },[previewFile])

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {data.map((assignment, index) => (
                    <div key={index} className="bg-white p-6 rounded-md shadow-md mt-3 mb-3 min-w-96">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                            <p className="text-gray-600 mb-4">{assignment.description}</p>
                            <p className="text-gray-500">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button color="primary" onClick={() => handleClickOpen(assignment)}>Add Submission</button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedAssignment ? `${selectedAssignment.title} Submission` : ''}</DialogTitle>
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
                                id="submission"
                                label="Submission"
                                fullWidth
                                onChange={(e) => handleInputChange('submission', e.target.value)}
                                value={newSubmission.submission}
                            />
                        </div>
                        <div>
                           
                            <TextField
                                id="remark"
                                label="Remark"
                                fullWidth
                                onChange={(e) => handleInputChange('remark', e.target.value)}
                                value={newSubmission.remark}
                            />
                        </div>
                        <div>
                        <label className='text-blue-500 font-semibold' htmlFor="file">{isUploading ? 'Uploading....'  :'Done'}</label>
                            <Input
                                type='file'
                                id="file"
                                label="file"
                                fullWidth
                                onChange={handleUpload}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addSubmission} variant='outlined'>Submit</Button>
                    <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
