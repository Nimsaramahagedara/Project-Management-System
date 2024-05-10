import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { colors, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Button,
  Divider,
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
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';

const Markings = () => {

  const [refresh, setRefresh] = useState(false);
  const [projects, setProjects] = useState([]);
  const [rowDialogOpen, setRowDialogOpen] = useState(Array(projects?.length).fill(false));
  const [maxStudent, setMaxStudent] = useState({});
  const [leastStudent, setLeastStudent] = useState({});
  const [selectedProject, setSelectedProject] = useState({});
  const [isOpen, setOpen] = useState(false)
  const [mark, setMark] = useState('');

  const handleClickOpen2 = (index) => {
    setSelectedProject(projects[index])
    setOpen(true)
  };

  const handleClose2 = () => {
    setRowDialogOpen(Array(projects.length).fill(false));
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));


  const getProjectList = async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/group/`);
      console.log(result.data);
      if (result) {

        setProjects(result.data);
        let mark = 0;
        let min = Infinity;
        let leastSt = {};
      } else {
        toast.error('Data Not Available');
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {

    getProjectList();
  }, [refresh]);

  const handleUpdateMarks = async()=>{
    try {
      const data = {
        ...selectedProject,
        marks:mark
      }
      const resp = await axios.put(`${apiUrl}/group/${selectedProject._id}`,data)
      setMark('')
      setOpen(false)
      getProjectList()
      toast.success('Marks updated')
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <Typography textAlign={'center'} variant='h5'>Marks for Projects</Typography>

      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Projects
          </Typography>

          <List>
            {Array.isArray(projects) && projects.map((subject, index) => (
              <>
                <ListItem
                  className='bg-white'
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete"
                      onClick={() => handleClickOpen2(index)}>
                      <VisibilityIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={subject.projectTitle}
                  />
                  <ListItemText
                    primary={'Spec : ' + subject?.specialization?.specialization}
                  />        <ListItemText
                    primary={'Year : ' + subject?.specialization?.year}
                  />
                  <ListItemText
                    primary={'Semester : ' + subject?.specialization?.semester}
                  />
                  <ListItemText
                    primary={'Supervisor : ' + subject?.supervisor?.firstName}
                  />
                  <ListItemText
                    primary={'Co-Sup : ' + subject?.coSupervisor?.firstName}
                  />
                  <ListItemText
                    primary={'Marks : ' + subject?.marks}
                  />


                </ListItem>
                <Divider />
              </>
            ))}
          </List>

        </Grid>
      </Box>

      <Dialog open={isOpen} onClose={() => setOpen(false)} className='p-5'>
        <Box className="p-10">
          <ListItemText
            primary={selectedProject.projectTitle}
          />
          <ListItemText
            primary={'Spec : ' + selectedProject?.specialization?.specialization}
          />        <ListItemText
            primary={'Year : ' + selectedProject?.specialization?.year}
          />
          <ListItemText
            primary={'Semester : ' + selectedProject?.specialization?.semester}
          />
          <ListItemText
            primary={'Supervisor : ' + selectedProject?.supervisor?.firstName}
          />
          <ListItemText
            primary={'Co-Sup : ' + selectedProject?.coSupervisor?.firstName}
          />
          <ListItemText
            primary={'Marks : ' + selectedProject?.marks}
          />
          <br />
          <h1>Give/Update Marks</h1>
          <TextField value={mark} onChange={(e)=>setMark(e.target.value)} ></TextField>
          <br />
          <br />
          <Button color='primary' variant='contained' onClick={handleUpdateMarks} >Submit</Button>
        </Box>
      </Dialog>


    </div>

  )
}

export default Markings