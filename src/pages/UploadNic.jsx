import React, { useState } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, Snackbar, Card } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import axios from 'axios';

function UploadNic() {

    const [files, setFiles] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            setFiles((prevFiles) => [...prevFiles, ...fileArray]);
        }
    };

    // Handle file upload action (can integrate with actual API upload logic later)
    const handleUpload = async () => {
        console.log("success method call")
        if (files.length !== 4) {
            // Simulate file upload (This is where you can integrate with your upload API)
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("csv", file); // Change "files" to "csv" to match backend
            });
            console.log("success method if call")



            try {
                const response = await axios.post("http://localhost:8080/nic", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    setOpenSnackbar(true);
                    console.log("success")
                    setFiles([]); // Clear selected files after successful upload
                }
            } catch (error) {
                console.error("Error uploading files:", error);
                alert("Failed to upload files. Please check the backend logs.");
            }

            setOpenSnackbar(true);
            // Clear the selected files after upload
            setFiles([]);
        }
    };

    // Handle close of snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };





    // const handleUpload = async () => {
    //     if (files.length !== 4) {
    //         alert("Please select exactly 4 CSV files to upload.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     files.forEach((file) => {
    //         formData.append("csv", file); // Change "files" to "csv" to match backend
    //     });



    //     try {
    //         const response = await axios.post("http://localhost:8080/nic", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         if (response.status === 200) {
    //             setOpenSnackbar(true);
    //             setFiles([]); // Clear selected files after successful upload
    //         }
    //     } catch (error) {
    //         console.error("Error uploading files:", error);
    //         alert("Failed to upload files. Please check the backend logs.");
    //     }
    // };



    return (
        <Box sx={{ width: '100%', maxWidth: 500, margin: 'auto', padding: 2, marginTop: 5 }}>
            <Typography variant="h6" align="center" gutterBottom>
                Upload CSV Files
            </Typography>

            {/* File input button */}
            <Box sx={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ marginBottom: 2 }}
                >
                    Choose CSV Files
                    <input
                        type="file"
                        accept=".csv"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
            </Box>

            {/* Preview the uploaded file names */}
            {files.length > 0 && (
                <Card sx={{ padding: 2, margin: 2, boxShadow: 5, }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body1">Uploaded Files:</Typography>
                        <List>
                            {files.map((file, index) => (
                                <ListItem key={index}>
                                    < InsertDriveFileIcon sx={{ color: "#1976d2", marginRight: 1 }} /> <ListItemText primary={file.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Card>
            )}

            {/* Upload button */}
            <Box sx={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={files.length === 0}
                >
                    Upload Files
                </Button>
            </Box>

            {/* Snackbar for upload success notification */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Files uploaded successfully!"
            />
        </Box>
    );
}

export default UploadNic;