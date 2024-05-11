import React, { useState, useEffect } from 'react';
import {
    Button,
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
    Typography,
    TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useParams } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import axios from 'axios';

const Notice = () => {

    const { id } = useParams();
    const [openDialogIndex, setOpenDialogIndex] = useState(null);
    const [notices, setNotices] = useState([]);
    const [marksValue, setMarksValue] = useState('');

    const handleCloseDialog = () => {
        setOpenDialogIndex(null);
    };

    const handleMarksChange = (event) => {
        setMarksValue(event.target.value);
    };

    const handleSaveMarks = async (row) => {
        console.log(row._id);
        console.log(marksValue);
        try {
            const resp = await axios.put(`${apiUrl}/submission/${row._id}`,{ marks: marksValue})
            if (resp){
                fetchData()
                toast.success('Marks updated')
            }
          } catch (error) {
            console.log(error);
          }
        handleCloseDialog();
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/submission/submissionByAsses/${id}`);
            const data = await response.json();
            setNotices(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    return (
        <div>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Reg No</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell>File</TableCell>
                            <TableCell>Marks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices && notices.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.assId ? `${row.assId.title}` : 'N/A'}</TableCell>
                                <TableCell>{row.stdId ? `${row.stdId.regNo}` : 'N/A'}</TableCell>
                                <TableCell>{row.stdId ? `${row.stdId.firstName} ${row.stdId.lastName}` : 'N/A'}</TableCell>
                                <TableCell><Link to={row.file} target='_blank'>{row.file ? 'Download File' : 'File Not Available'}</Link></TableCell>
                                <TableCell>
                                    {row.marks === 'Pending' ?
                                        <div>
                                            <Button
                                                variant="outlined"
                                                startIcon={<VisibilityIcon />}
                                                color="secondary"
                                                onClick={() => setOpenDialogIndex(index)}
                                                sx={{ marginRight: 2 }}
                                            >
                                                Give Marks
                                            </Button>
                                            <Dialog
                                                open={openDialogIndex === index}
                                                onClose={handleCloseDialog}
                                                sx={{ border: '2px solid #ccc' }}
                                            >
                                                <DialogTitle sx={{ textAlign: 'center' }}>Add Marks</DialogTitle>
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
                                                        <TextField
                                                            fullWidth
                                                            type='number'
                                                            margin='normal'
                                                            label='Marks'
                                                            value={marksValue}
                                                            onChange={handleMarksChange}
                                                        />
                                                        <DialogActions style={{ justifyContent: 'center' }}>
                                                            <Button size="small" startIcon={<SaveIcon />} variant="contained" color="primary" onClick={() => (handleSaveMarks(row))}>
                                                                Save
                                                            </Button>
                                                            <Button size="small" startIcon={<CancelIcon />} variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
                                                        </DialogActions>
                                                    </Box>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        :
                                        `${row.marks}`
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Notice;
