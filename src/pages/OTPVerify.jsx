// import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';

// export default function OTPVerify() {

//     const [otp, setOtp] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const signInButtonOnAction = async (event) => {

//         try {
//             event.preventDefault();
//             // const formData = new FormData(event.target);
//             // const email = formData.get('email');
//             // const password = formData.get('password');
//             // getOneStudent(memberId);
//             console.log(email, password);

//             const response = await axios.post("http://localhost:8080/auth/sign-in", {
//                 email,
//                 password,
//             });


//             if (response.data === "login Success") {
//                 console.log("correct password");
//                 navigate("/generate-reports");


//             } else {
//                 console.log("incorrect password");
//             }

//         } catch (error) {
//             console.error("Error while loging:", error);

//         }
//     }




//     return (

//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//                 sx={{
//                     marginTop: 8,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                 }}
//             >
//                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//                     <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Verify OTP
//                 </Typography>
//                 <Box component="form" noValidate sx={{ mt: 1 }}>
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="OTP "
//                         value={otp}
//                         onChange={(e) => setEmail(e.target.value)}
//                         label="OTP"
//                         name="otp"
//                         autoComplete="number"
//                         autoFocus
//                     />


//                     <Button
//                         onClick={signInButtonOnAction}
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Verify
//                     </Button>

//                 </Box>
//             </Box>
//             <Box mt={8}>

//             </Box>
//         </Container>

//     );
// }
