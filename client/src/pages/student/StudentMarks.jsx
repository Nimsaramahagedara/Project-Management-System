import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import AbcIcon from '@mui/icons-material/Abc';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors } from '@mui/material';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import Loader from '../../components/Loader/Loader';
import StarIcon from '@mui/icons-material/Star';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StudentMarks = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([])
  const [term1Marks, setTerm1Marks] = useState([])
  const [term2Marks, setTerm2Marks] = useState([])

  const getAllProjects = async () => {
    try {
      const proj = await authAxios.get(`${apiUrl}/group`);
      console.log(proj.data);
      setProjects(proj.data)
      setIsLoading(false)
    } catch (error) {
      throw error.response.data.message;
    }
  };
  

  useEffect(() => {
    setIsLoading(true)
    getAllProjects();
  }, []);

  return (
    <ContainerStudent>
      <PageTitle title={'Your Marks'} icon={<AbcIcon fontSize='large' />} bgColor='bg-red-500' />
      {
        !isLoading ?
          <div className='px-5 space-y-5'>
            <div className='flex items-center justify-evenly flex-wrap'>
              {/* <ColorCard name={'Your Current Average'} count={55.5} bgColor={'#eafce8'} icon={<FunctionsIcon />} /> */}
              {/* <ColorCard name={'Highest Mark'} count={highestMarks} bgColor={'#eafce8'} icon={<StarIcon />} />
              <ColorCard name={'Best Performed Subject'} count={highestMarksSubject} bgColor={'#eafce8'} icon={<MenuBookIcon />} />
              <ColorCard name={'Best Performed Term'} count={termWithHighestSum + '/2'} bgColor={'#eafce8'} icon={<AcUnitIcon />} /> */}

            </div>

            <Typography color={colors.red[900]}>Semester 1</Typography>
            <div className='w-full overflow-auto'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="right">Subject Name</StyledTableCell>
                      {/* <StyledTableCell align="right">Subject Code</StyledTableCell> */}
                      <StyledTableCell align="right">Makrs</StyledTableCell>
                      <StyledTableCell align="right">Average</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {term1Marks?.map((row, index) => (
                      <StyledTableRow key={row.subId.subName}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.subId.subName}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                        <StyledTableCell align="right">{`${sum[0]}`}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Typography color={colors.red[700]} >Semester 2</Typography>
            <div className='w-full overflow-auto'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="right">Subject Name</StyledTableCell>
                      {/* <StyledTableCell align="right">Subject Code</StyledTableCell> */}
                      <StyledTableCell align="right">Makrs</StyledTableCell>
                      <StyledTableCell align="right">Average</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {term2Marks?.map((row, index) => (
                      <StyledTableRow key={row.subId.subName}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.subId.subName}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                        <StyledTableCell align="right">{`${sum[1]}`}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          : <Loader />}
    </ContainerStudent>


  )
}

export default StudentMarks