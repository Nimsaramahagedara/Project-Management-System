import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    ListItem,
} from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

const ApproveGroupRegistration = () => {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [openRowIndex, setOpenRowIndex] = useState(null); // Track the index of the open row
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const handleClose = () => {
        setOpenRowIndex(null); // Reset open row index when dialog is closed
    };

    const handleOpen = (index) => {
        setOpenRowIndex(index); // Set the index of the row whose dialog should be opened
    };

    const handleApproveProject = async (row) => {
        try {
            for (const student of row.students) {
                const studentSchema = {
                    'regNo': student.regNo,
                    'firstName': student.firstName,
                    'lastName': student.lastName,
                    'contactNo': student.contactNo,
                    'email': student.email,
                    'role': 'student',
                    'password': student.regNo,
                    'specialization': row.specialization ? `${row.specialization._id}` : 'N/A'
                }
                const response = await fetch(`${apiUrl}/student/create-student`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(studentSchema), // Send studentSchema instead of student
                });
                // Handle response as needed
                console.log('Student added:', response);
                toast.success('Student added');
            }

            const result = await authAxios.delete(`${apiUrl}/registerTemp/${row._id}`);
            console.log('Student deleted:', result);
            toast.success('Group approved successfully');
            handleClose();
            fetchData();
        } catch (error) {
            console.error('Error registering students:', error);
        }
    };


    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/registerTemp/`);
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Specialization</TableCell>
                            <TableCell>Project Title</TableCell>
                            <TableCell>Rsearch Area</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {!isLoading ? <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.projectTitle}</TableCell>
                                <TableCell>{row.projectTitle}</TableCell>
                                <TableCell>{row.researchArea}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                                        onClick={() => handleOpen(index)} // Pass the index of the clicked row
                                        sx={{ marginRight: 2 }}
                                    > View </Button>
                                    {openRowIndex === index && (
                                        <Dialog
                                            fullScreen
                                            open={openRowIndex === index} // Check if this dialog's index matches the openRowIndex
                                            onClose={handleClose}
                                            TransitionComponent={Transition}
                                        >
                                            <AppBar sx={{ position: 'relative' }}>
                                                <Toolbar>
                                                    <IconButton
                                                        edge="start"
                                                        color="inherit"
                                                        onClick={handleClose}
                                                        aria-label="close"
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                        {row.projectTitle}
                                                    </Typography>
                                                    <Button autoFocus color="inherit" onClick={() => handleApproveProject(row)}>
                                                        Approve Project
                                                    </Button>
                                                </Toolbar>
                                            </AppBar>
                                            <List>
                                                <ListItem>
                                                    <ListItemText primary="Project Title" secondary={row.projectTitle} />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemText primary="Specialization" secondary={row.specialization ? `${row.specialization.specialization}` : 'N/A'} />
                                                    <ListItemText primary="Research Area" secondary={row.researchArea} />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemText primary="Supervisor" secondary={row.supervisor ? `${row.supervisor.firstName} ${row.supervisor.lastName}` : 'N/A'} />
                                                    <ListItemText primary="Cosupervisor" secondary={row.coSupervisor ? `${row.coSupervisor.firstName} ${row.coSupervisor.lastName}` : 'N/A'} />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemText primary="Project Leader Name" secondary={row.projectLeader.name} />
                                                    <ListItemText primary="Registration Number" secondary={row.projectLeader.registrationNumber} />
                                                </ListItem>

                                                <Divider />

                                                {row.students.map((student, i) => (
                                                    <>
                                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                            Student {i + 1}
                                                        </Typography>
                                                        <ListItem>
                                                            <ListItemText primary="Student Name" secondary={`${student.firstName} ${student.lastName}`} />
                                                            <ListItemText primary="Registration Number" secondary={student.regNo} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemText primary="Batch" secondary={student.batch} />
                                                        </ListItem>
                                                        <ListItem>
                                                            <ListItemText primary="Email" secondary={student.email} />
                                                            <ListItemText primary="Contact Number" secondary={student.contactNo} />
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                ))}
                                            </List>
                                        </Dialog>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> : <Loader />
                    }
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default ApproveGroupRegistration;
