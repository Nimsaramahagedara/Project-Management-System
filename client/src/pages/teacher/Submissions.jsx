import { useParams } from 'react-router-dom';
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
import { apiUrl } from '../../utils/Constants';

const Notice = () => {

    const { id } = useParams();
    const [openDialogIndex, setOpenDialogIndex] = useState(null);
    const [notices, setNotices] = useState([]);

    const handleCloseDialog = () => {
        setOpenDialogIndex(null);
    };

    useEffect(() => {
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
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notices && notices.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.assId ? `${row.assId.title}` : 'N/A'}</TableCell>
                                <TableCell>{row.stdId ? `${row.stdId.regNo}` : 'N/A'}</TableCell>
                                <TableCell>{row.stdId ? `${row.stdId.firstName} ${row.stdId.lastName}` : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        startIcon={<VisibilityIcon />}
                                        color="secondary"
                                        onClick={() => setOpenDialogIndex(index)}
                                        sx={{ marginRight: 2 }}
                                    >
                                        View Submission
                                    </Button>

                                    <Dialog
                                        open={openDialogIndex === index}
                                        onClose={handleCloseDialog}
                                        sx={{ border: '2px solid #ccc' }}
                                    >
                                        <DialogTitle sx={{ textAlign: 'center' }}>Submission</DialogTitle>
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
                                                <div className="mb-2">
                                                    <label className="font-semibold">Submission: </label>
                                                    <span>{row.submission}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="font-semibold">Remark: </label>
                                                    <span>{row.remark}</span>
                                                </div>
                                                <TextField
                                                    fullWidth
                                                    margin='normal'
                                                    label='Marks'
                                                />

                                                <DialogActions style={{ justifyContent: 'center' }}>
                                                    <Button size="small" startIcon={<SaveIcon />} variant="contained" color="primary">
                                                        Save
                                                    </Button>
                                                    <Button size="small" startIcon={<CancelIcon />} variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
                                                </DialogActions>
                                            </Box>
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

export default Notice;
