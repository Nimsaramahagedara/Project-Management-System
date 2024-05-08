import * as React from 'react';
import Typography from '@mui/material/Typography';
import { getSemester } from '../utils/usefulFunctions';

export default function ActiveAssignments() {
  return (
    <>
      <h5>Current Semester</h5>
      <Typography component="p" variant="h4">
        {getSemester()}/2
      </Typography>
    </>
  );
}