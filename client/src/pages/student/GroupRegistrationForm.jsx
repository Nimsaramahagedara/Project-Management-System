import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Container, FormLabel, Divider, Typography } from '@mui/material';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

const GroupRegistrationForm = () => {

    const [supervisors, setSupervisors] = useState([]);
    const [spec, setSpec] = useState([]);
    const [formData, setFormData] = useState({
        projectTitle: '',
        researchArea: '',
        specialization: '',
        students: [],
        supervisor: '',
        coSupervisor: '',
        studentFirstName: '',
        studentLastName: '',
        studentRegNo: '',
        studentContactNo: '',
        studentEmail: '',
        studentBatch: '',
        student2FirstName: '',
        student2LastName: '',
        student2RegNo: '',
        student2ContactNo: '',
        student2Email: '',
        student2Batch: '',
        student3FirstName: '',
        student3LastName: '',
        student3RegNo: '',
        student3ContactNo: '',
        student3Email: '',
        student3Batch: '',
        student4FirstName: '',
        student4LastName: '',
        student4RegNo: '',
        student4ContactNo: '',
        student4Email: '',
        student4Batch: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const registerData = createRegisterData(formData);
        try {
            const result = await authAxios.post(`${apiUrl}/registerTemp`, registerData);
            if (result) {
                toast.success('Registration Successfully');
                setFormData({});
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const data = await authAxios.get(`${apiUrl}/admin/get-all-supervisors`);
                setSupervisors(data.data);
                console.log(data)
            } catch (error) {
                setIsLoading(false);// modify this
                toast.error("You need to enroll for thr class");
            }
        };

        const fetchSpec = async () => {
            try {
                const data = await authAxios.get(`${apiUrl}/class/`);
                setSpec(data.data);
                console.log(data)
            } catch (error) {
                setIsLoading(false);// modify this
                toast.error("You need to enroll for thr class");
            }
        };

        fetchSpec();
        fetchSupervisors();
    }, []);

    // Function to create data for mongoose
    const createRegisterData = (formData) => {
        return {
            projectTitle: formData.projectTitle,
            researchArea: formData.researchArea,
            specialization: specialization,
            students: [
                {
                    firstName: formData.studentFirstName,
                    lastName: formData.studentLastName,
                    regNo: formData.studentRegNo,
                    contactNo: formData.studentContactNo,
                    email: formData.studentEmail,
                    batch: formData.studentBatch
                },
                {
                    firstName: formData.student2FirstName,
                    lastName: formData.student2LastName,
                    regNo: formData.student2RegNo,
                    contactNo: formData.student2ContactNo,
                    email: formData.student2Email,
                    batch: formData.student2Batch
                },
                {
                    firstName: formData.student3FirstName,
                    lastName: formData.student3LastName,
                    regNo: formData.student3RegNo,
                    contactNo: formData.student3ContactNo,
                    email: formData.student3Email,
                    batch: formData.student3Batch
                },
                {
                    firstName: formData.student4FirstName,
                    lastName: formData.student4LastName,
                    regNo: formData.student4RegNo,
                    contactNo: formData.student4ContactNo,
                    email: formData.student4Email,
                    batch: formData.student4Batch
                }
            ],
            supervisor: formData.supervisor,
            coSupervisor: formData.coSupervisor
        };
    };

    return (
        <Container component="main" maxWidth="md" className='shadow-lg bg-white pt-1 pb-5' sx={{ marginTop: 5, marginBottom: 5 }}>

            <Box
                margin={5}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h4" gutterBottom>Research Group Registration</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <div>
                    {/* Project Title */}
                    <TextField
                        required
                        id="outlined-required"
                        label="Project Title"
                        fullWidth
                        margin="normal"
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {/* Research Area */}
                    <FormControl margin="normal" sx={{ minWidth: 300, marginRight: 5 }}>
                        <InputLabel>Research Area</InputLabel>
                        <Select
                            name="researchArea"
                            value={formData.researchArea}
                            onChange={handleChange}
                        >
                            <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                            <MenuItem value="Natural Language Processing">Natural Language Processing</MenuItem>
                            <MenuItem value="Intelligent Systems">Intelligent Systems</MenuItem>
                            <MenuItem value="Robotics">Robotics</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Specialization */}
                    <FormControl margin="normal" sx={{ minWidth: 300 }}>
                        <InputLabel>Specialization</InputLabel>
                        <Select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                        >
                        {spec.map((row) => (
                            <MenuItem value={row._id}>{row.specialization} : Y{row.year}S{row.semester}</MenuItem>
                        ))}
                            
                        </Select>
                    </FormControl>
                </div>
                <div>
                    {/* Supervisor */}
                    <FormControl margin="normal" sx={{ minWidth: 300, marginRight: 5 }}>
                        <InputLabel>Supervisor</InputLabel>
                        <Select
                            name="supervisor"
                            value={formData.supervisor}
                            onChange={handleChange}
                        >
                            {supervisors.map((row) => (
                                <MenuItem value={row._id}>{row.firstName} {row.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Co-Supervisor */}
                    <FormControl margin="normal" sx={{ minWidth: 300 }}>
                        <InputLabel>Co-Supervisor</InputLabel>
                        <Select
                            name="coSupervisor"
                            value={formData.coSupervisor}
                            onChange={handleChange}
                        >
                            {supervisors.map((row) => (
                                <MenuItem value={row._id}>{row.firstName} {row.lastName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    {/* Student 1 */}
                    <div className='mt-5'>
                        <Divider sx={{ marginBottom: 2 }} />
                        <FormLabel>Student 1 (Leader)</FormLabel>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="First Name"
                            margin="normal"
                            name="studentFirstName"
                            value={formData.studentFirstName}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Last Name"
                            margin="normal"
                            name="studentLastName"
                            value={formData.studentLastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Registration Number"
                            margin="normal"
                            name="studentRegNo"
                            value={formData.studentRegNo}
                            onChange={handleChange}
                        />
                        <FormControl margin="normal" sx={{ minWidth: 300 }}>
                            <InputLabel>Batch</InputLabel>
                            <Select
                                name="studentBatch"
                                value={formData.studentBatch}
                                onChange={handleChange}
                            >
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="June">June</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            name="studentEmail"
                            value={formData.studentEmail}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Contact Number"
                            type='number'
                            margin="normal"
                            name="studentContactNo"
                            value={formData.studentContactNo}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div>
                    {/* Student 2 */}
                    <div className='mt-5'>
                        <Divider sx={{ marginBottom: 2 }} />
                        <FormLabel>Student 2</FormLabel>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="First Name"
                            margin="normal"
                            name="student2FirstName"
                            value={formData.student2FirstName}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Last Name"
                            margin="normal"
                            name="student2LastName"
                            value={formData.student2LastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Registration Number"
                            margin="normal"
                            name="student2RegNo"
                            value={formData.student2RegNo}
                            onChange={handleChange}
                        />
                        <FormControl margin="normal" sx={{ minWidth: 300 }}>
                            <InputLabel>Batch</InputLabel>
                            <Select
                                name="student2Batch"
                                value={formData.student2Batch}
                                onChange={handleChange}
                            >
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="June">June</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            name="student2Email"
                            value={formData.student2Email}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Contact Number"
                            type='number'
                            margin="normal"
                            name="student2ContactNo"
                            value={formData.student2ContactNo}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div>
                    {/* Student 3 */}
                    <div className='mt-5'>
                        <Divider sx={{ marginBottom: 2 }} />
                        <FormLabel>Student 3</FormLabel>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="First Name"
                            margin="normal"
                            name="student3FirstName"
                            value={formData.student3FirstName}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Last Name"
                            margin="normal"
                            name="student3LastName"
                            value={formData.student3LastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Registration Number"
                            margin="normal"
                            name="student3RegNo"
                            value={formData.student3RegNo}
                            onChange={handleChange}
                        />
                        <FormControl margin="normal" sx={{ minWidth: 300 }}>
                            <InputLabel>Batch</InputLabel>
                            <Select
                                name="student3Batch"
                                value={formData.student3Batch}
                                onChange={handleChange}
                            >
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="June">June</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            name="student3Email"
                            value={formData.student3Email}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Contact Number"
                            type='number'
                            margin="normal"
                            name="student3ContactNo"
                            value={formData.student3ContactNo}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div>
                    {/* Student 4 */}
                    <div className='mt-5'>
                        <Divider sx={{ marginBottom: 2 }} />
                        <FormLabel>Student 4</FormLabel>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="First Name"
                            margin="normal"
                            name="student4FirstName"
                            value={formData.student4FirstName}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Last Name"
                            margin="normal"
                            name="student4LastName"
                            value={formData.student4LastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Registration Number"
                            margin="normal"
                            name="student4RegNo"
                            value={formData.student4RegNo}
                            onChange={handleChange}
                        />
                        <FormControl margin="normal" sx={{ minWidth: 300 }}>
                            <InputLabel>Batch</InputLabel>
                            <Select
                                name="student4Batch"
                                value={formData.student4Batch}
                                onChange={handleChange}
                            >
                                <MenuItem value="Regular">Regular</MenuItem>
                                <MenuItem value="June">June</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            sx={{ minWidth: 300, marginRight: 5 }}
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            name="student4Email"
                            value={formData.student4Email}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ minWidth: 300 }}
                            required
                            id="outlined-required"
                            label="Contact Number"
                            type='number'
                            margin="normal"
                            name="student4ContactNo"
                            value={formData.student4ContactNo}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }}>Submit</Button>
            </Box>
        </Container>

    );
};

export default GroupRegistrationForm;
