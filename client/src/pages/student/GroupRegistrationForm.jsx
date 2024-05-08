import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Container, FormLabel, Divider } from '@mui/material';

const GroupRegistrationForm = () => {
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
        studentBatch: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Submit logic here
    };

    return (
        <Container component="main" maxWidth="md" className='shadow-lg bg-white pt-1 pb-5' sx={{ marginTop: 5, marginBottom: 5 }}>
            <form onSubmit={handleSubmit}>
                <Box
                    margin={5}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Project Title"
                            fullWidth
                            margin="normal"
                        />
                    </div>
                    <div>
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
                        <FormControl margin="normal" sx={{ minWidth: 300 }}>
                            <InputLabel>Specialization</InputLabel>
                            <Select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                            >
                                <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                                <MenuItem value="Natural Language Processing">Natural Language Processing</MenuItem>
                                <MenuItem value="Intelligent Systems">Intelligent Systems</MenuItem>
                                <MenuItem value="Robotics">Robotics</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl margin="normal" sx={{ minWidth: 300, marginRight: 5 }}>
                            <InputLabel>Supervisor</InputLabel>
                            <Select
                                name="supervisor"
                                value={formData.supervisor}
                                onChange={handleChange}
                            >
                                <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                                <MenuItem value="Natural Language Processing">Natural Language Processing</MenuItem>
                                <MenuItem value="Intelligent Systems">Intelligent Systems</MenuItem>
                                <MenuItem value="Robotics">Robotics</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" sx={{ minWidth: 300 }}>
                            <InputLabel>Cosupervisor</InputLabel>
                            <Select
                                name="coSupervisor"
                                value={formData.coSupervisor}
                                onChange={handleChange}
                            >
                                <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                                <MenuItem value="Natural Language Processing">Natural Language Processing</MenuItem>
                                <MenuItem value="Intelligent Systems">Intelligent Systems</MenuItem>
                                <MenuItem value="Robotics">Robotics</MenuItem>
                            </Select>
                        </FormControl>

                        <div className='mt-5'>
                            <Divider sx={{marginBottom: 2}} />
                            <FormLabel>Student 1 (Leader)</FormLabel>
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="First Name"
                                margin="normal"
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Last Name"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="Registration Number"
                                margin="normal"
                            />
                            <FormControl margin="normal" sx={{ minWidth: 300 }}>
                                <InputLabel>Batch</InputLabel>
                                <Select
                                    name="studentBatch"
                                    value={formData.studentBatch}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Machine Learning">Regular</MenuItem>
                                    <MenuItem value="Natural Language Processing">June</MenuItem>
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
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Contact Number"
                                type='number'
                                margin="normal"
                            />
                        </div>
                        <div className='mt-5'>
                            <Divider sx={{marginBottom: 2}} />
                            <FormLabel>Student 2</FormLabel>
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="First Name"
                                margin="normal"
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Last Name"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="Registration Number"
                                margin="normal"
                            />
                            <FormControl margin="normal" sx={{ minWidth: 300 }}>
                                <InputLabel>Batch</InputLabel>
                                <Select
                                    name="studentBatch"
                                    value={formData.studentBatch}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Machine Learning">Regular</MenuItem>
                                    <MenuItem value="Natural Language Processing">June</MenuItem>
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
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Contact Number"
                                type='number'
                                margin="normal"
                            />
                        </div>
                        <div className='mt-5'>
                            <Divider sx={{marginBottom: 2}} />
                            <FormLabel>Student 3</FormLabel>
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="First Name"
                                margin="normal"
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Last Name"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="Registration Number"
                                margin="normal"
                            />
                            <FormControl margin="normal" sx={{ minWidth: 300 }}>
                                <InputLabel>Batch</InputLabel>
                                <Select
                                    name="studentBatch"
                                    value={formData.studentBatch}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Machine Learning">Regular</MenuItem>
                                    <MenuItem value="Natural Language Processing">June</MenuItem>
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
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Contact Number"
                                type='number'
                                margin="normal"
                            />
                        </div>
                        <div className='mt-5'>
                            <Divider sx={{marginBottom: 2}} />
                            <FormLabel>Student 4</FormLabel>
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="First Name"
                                margin="normal"
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Last Name"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                sx={{ minWidth: 300, marginRight: 5 }}
                                required
                                id="outlined-required"
                                label="Registration Number"
                                margin="normal"
                            />
                            <FormControl margin="normal" sx={{ minWidth: 300 }}>
                                <InputLabel>Batch</InputLabel>
                                <Select
                                    name="studentBatch"
                                    value={formData.studentBatch}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Machine Learning">Regular</MenuItem>
                                    <MenuItem value="Natural Language Processing">June</MenuItem>
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
                            />
                            <TextField
                                sx={{ minWidth: 300 }}
                                required
                                id="outlined-required"
                                label="Contact Number"
                                type='number'
                                margin="normal"
                            />
                        </div>
                    </div>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </form>
        </Container>
    );
};

export default GroupRegistrationForm;
