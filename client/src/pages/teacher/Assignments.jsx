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
  Paper
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/AuthContext';

const Assignments = () => {

  const { logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [assignments, setAssignment] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    title: '',
    description: ''
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

  const handleUpdateAssignment = (row) => {
    setOpen2(true);
    setUpdateFormData({
      _id: row._id,
      title: row.title,
      description: row.description
    });
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/assignment`);
        const data = await response.json();
        setAssignment(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleCreate = (field, value) => {
    setNewAssignment((prevData) => ({ ...prevData, [field]: value }));
  };


  const publishAssignment = async () => {
    try {
      const result = await fetch(`${apiUrl}/assignment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
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
      const result = await authAxios.delete(`${apiUrl}/assignment/${id}`);

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
      const result = await authAxios.put(`${apiUrl}/assignment/${updateFormData._id}`, updateFormData);

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
      <React.Fragment>
        {userRole == 'supervisor' ?
          <Button variant="outlined" onClick={handleClickOpen}>
            Publish an Assignment
          </Button>
          : ''}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Publish an Assignment</DialogTitle>
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
                  onChange={(e) => handleCreate('title', e.target.value)}
                  value={newAssignment.title}
                />
              </div>
              <div>
                <TextField
                  id="notice-discription"
                  label="Discription"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => handleCreate('description', e.target.value)}
                  value={newAssignment.description}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={publishAssignment} variant='outlined'>Publish</Button>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                    onClick={() => handleUpdateAssignment(row)}
                    sx={{ marginRight: 2 }}
                  > View </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<TaskIcon />} color="secondary"
                    onClick={() => navigate(`/dashboard/submissions/${row._id}`)}
                    sx={{ marginRight: 2 }}
                  > Check Submissions
                  </Button>
                </TableCell>

                <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                  <DialogTitle sx={{ textAlign: 'center' }}>Edit Assignment</DialogTitle>
                  <DialogContent>
                    <div>
                      <TextField
                        required
                        id="outlined-read-only-input"
                        label="Title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                        value={updateFormData.title}
                      />

                      <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                        value={updateFormData.description}
                        multiline
                        rows={4}
                      />
                    </div>

                    {userRole == 'supervisor' ?
                      <>
                        <DialogActions style={{ justifyContent: 'center' }}>
                          <Button size="small" startIcon={<SaveIcon />} onClick={handleUpdate} variant="contained" color="primary">
                            Update
                          </Button>

                          <Button size="small" startIcon={<DeleteIcon />} variant="contained" color="error" onClick={() => handleDeleteNotice(updateFormData._id)}>
                            Remove
                          </Button>
                          <Button size="small" startIcon={<CancelIcon />} variant='outlined' onClick={handleClose2}>Cancel</Button>
                        </DialogActions>
                      </>
                      : ''}
                  </DialogContent>
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Assignments