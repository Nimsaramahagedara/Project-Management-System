import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import AbcIcon from '@mui/icons-material/Abc';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors } from '@mui/material';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import Loader from '../../components/Loader/Loader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { styled } from '@mui/material/styles';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StudentMarks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [term1Marks, setTerm1Marks] = useState([]);
  const [term2Marks, setTerm2Marks] = useState([]);

  const getAllMarks = async () => {
    try {
      const marksResponse = await authAxios.get(`${apiUrl}/marks/get-marks-by-student`);
      const allMarks = marksResponse.data;
      const term1MarksData = allMarks.filter(mark => mark.semester === 1);
      const term2MarksData = allMarks.filter(mark => mark.semester === 2);
      setTerm1Marks(term1MarksData);
      setTerm2Marks(term2MarksData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching marks:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMarks();
  }, []);

  return (
    <ContainerStudent>
      <PageTitle title={'Students Marks'} icon={<AbcIcon fontSize='large' />} bgColor='bg-red-500' />
      {isLoading ? (
        <Loader />
      ) : (
        <div className='px-5 space-y-5'>
          <div className='w-full overflow-auto'>
            <Typography color={colors.red[900]}>Semester 1</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table' size='small'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align='right'>Student Name</StyledTableCell>
                    <StyledTableCell align='right'>Marks</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {term1Marks.map((mark, index) => (
                    <StyledTableRow key={mark._id}>
                      <StyledTableCell component='th' scope='row'>
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align='right'>{mark.studentName}</StyledTableCell>
                      <StyledTableCell align='right'>{mark.marks}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className='w-full overflow-auto'>
            <Typography color={colors.red[700]}>Semester 2</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table' size='small'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align='right'>Student Name</StyledTableCell>
                    <StyledTableCell align='right'>Marks</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {term2Marks.map((mark, index) => (
                    <StyledTableRow key={mark._id}>
                      <StyledTableCell component='th' scope='row'>
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align='right'>{mark.studentName}</StyledTableCell>
                      <StyledTableCell align='right'>{mark.marks}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </ContainerStudent>
  );
};

export default StudentMarks;
