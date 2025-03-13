import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, MenuItem } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';


const GenerateReports = () => {

    const [fileName, setFileName] = React.useState("");
    const [data, setData] = React.useState([]); // Store API response

    const [error, setError] = React.useState(null); // Store error message
    const [loading, setLoading] = React.useState(false); // Loading state
    const [exsitFileName, setExsitsFileName] = React.useState([]);

    console.log(data);



    //this is use for get the nic by file name 
    const getNicsByFileName = async (fileName) => {
        setLoading(true);
        setError(null);
        try {

            const response = await axios.get(`http://localhost:8080/nic/get-file/${fileName}`)
            console.log("this is Responese" + response.data.nic);
            setData(response.data); // Set API response to state
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching NICs");
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (fileName) {
            getNicsByFileName(fileName);
        }
    }, [fileName]);

    //this is use for get the all files name
    React.useEffect(() => {
        axios.get('http://localhost:8080/file/get-all')
            .then((response) => {
                setExsitsFileName(response.data);
            })
            .catch((error) => {
                console.error('Error fetching file names:', error);
            });

    }, []);



    const handleDownloadPDF = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/nic/export/pdf/${fileName}`, {
                responseType: 'blob', // Important: ensures we receive binary data
            });

            // Create a blob from the PDF response
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.pdf`; // Set the filename
            document.body.appendChild(a);
            a.click(); // Trigger download

            // Cleanup
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the PDF:", error);
        }
    };

    const handleDownloadXLSX = async () => {
        console.log("hello xscel")
        try {
            const response = await axios.get(`http://localhost:8080/nic/export/excel/${fileName}`, {
                responseType: 'blob', // Ensures binary data
            });
    
            // Create a blob from the XLSX response
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);
    
            // Create a temporary anchor element
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.xlsx`; // Set the filename
            document.body.appendChild(a);
            a.click(); // Trigger download
    
            // Cleanup
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the XLSX file:", error);
        }
    };

    







    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24),
        createData('Ice cream sandwich', 237, 9.0, 37),
        createData('Eclair', 262, 16.0, 24),
        createData('Cupcake', 305, 3.7, 67),
        createData('Gingerbread', 356, 16.0, 49),
    ];

    const fileNames = ['nn', 'file2'];

    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    p: 3,
                    marginTop: 5,
                    justifyContent: 'space-around',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 3, sm: 5 }  // Increase gap between TextField and buttons on small screens
                }}
            >
                <Autocomplete
                    disablePortal
                    options={exsitFileName}
                    onChange={(event, value) => setFileName(value)}
                    sx={{
                        width: { xs: '100%', sm: 300 },  // 100% width on mobile, 300px on larger screens
                        height: '40px',
                        marginBottom: { xs: 3, sm: 0 }  // Add bottom margin for mobile to create more space
                    }}
                    renderInput={(params) => <TextField {...params} label="File Name" />}
                />



                {/* <Button variant="contained" color="primary" onClick={getNicsByFileName} disabled={loading}>
                    {loading ? "Loading..." : "Fetch NICs"}
                </Button> */}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 5 },
                        width: '100%'
                    }}
                >
                    <Button
                        variant="outlined"
                        color="error"

                        sx={{
                            width: { xs: '100%', sm: '120px' },  // 100% width on mobile, 120px on larger screens
                            fontWeight: 'bold',
                            height: '45px',
                            fontSize: '14px',
                            gap: 2
                        }}
                        onClick={handleDownloadPDF}
                    >
                        PDF <DownloadIcon />
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"

                        sx={{
                            width: { xs: '100%', sm: '120px' },
                            fontWeight: 'bold',
                            height: '45px',
                            fontSize: '14px',
                            gap: 2
                        }}
                        onClick={handleDownloadXLSX}

                    >
                        XLSX <DownloadIcon />
                    </Button>
                    <Button
                        variant="outlined"

                        sx={{
                            width: { xs: '100%', sm: '120px' },
                            fontWeight: 'bold',
                            height: '45px',
                            fontSize: '14px',
                            color: '#fc9357',
                            gap: 2
                        }}
                        
                    >
                        CSV <DownloadIcon />
                    </Button>
                </Box>
            </Container>


            <Container sx={{ mt: 4 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, overflowX: 'auto' }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ fontWeight: "bold", fontSize: 16 }}>Id</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: 16 }}>Nic Number</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} align="right">BirthDay</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} align="right">Age</TableCell>
                                <TableCell sx={{ fontWeight: "bold", fontSize: 16 }} align="right">Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {/* <TableCell component="th" scope="row">{row.} </TableCell> */}
                                    <TableCell component="th" scope="row">{row.nicNumber}</TableCell>
                                    <TableCell align="right">{row.birthday}</TableCell>
                                    <TableCell align="right">{row.age}</TableCell>
                                    <TableCell align="right">{row.gender}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default GenerateReports;
