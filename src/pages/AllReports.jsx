import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container } from '@mui/material';

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

export default function AllReports() {
    return (
        <Container sx={{marginTop:5}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} >Id</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: 16 }}>Nic Number</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} align="right"> BirthDay</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} align="right">Age</TableCell>
                            <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} align="right">Gender</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.fat} </TableCell>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right" >{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
