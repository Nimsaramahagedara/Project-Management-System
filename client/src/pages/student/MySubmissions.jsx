import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { Link } from 'react-router-dom';

export default function MySubmissions() {

  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await authAxios.get(`${apiUrl}/get-user`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getUser(); // Fetch user data when component mounts
  }, []);

  useEffect(() => {
    if (user._id) { // Check if user._id is available
      getAllNotices(); // If available, fetch notices
    }
  }, [user._id]); // Execute when user._id changes

  const getAllNotices = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/submission/subByStd/${user._id}`);
      setNotices(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error("Loading");
    }
  }

  const deleteSubmition = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/submission/${id}`);

      if (result) {
        toast.warning('Deleted Successfully');
        if (user._id) { // Check if user._id is available
          getAllNotices(); // If available, fetch notices
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };
  return (
    <div className='m-8'>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Submission</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices && notices.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.assId ? `${row.assId.title}` : 'N/A'}</TableCell>
                <TableCell>{row.submission}</TableCell>
                <TableCell><Link to={row.file} target='_blank'>{row.file ? 'Download File' : 'File Not Available'}</Link></TableCell>
                <TableCell>{row.remark}</TableCell>
                {row.marks === 'Pending' ?
                  <>
                    
                    <TableCell>{row.marks}</TableCell>
                    <TableCell>
                      <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                        onClick={() => deleteSubmition(row._id)}
                        sx={{ marginRight: 2 }}
                      > Delete </Button>
                    </TableCell>
                  </>

                  : <TableCell>{row.marks}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
