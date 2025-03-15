import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Swal from 'sweetalert2';

const theme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



export default function ForgetPassword() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        otp: '',
        newPasswordOne: '',
        newPasswordTwo: '',
    });

    const [component, setComponent] = useState(1);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePassword = () => setShowPassword(!showPassword);
    const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


    //send email api
    const forgetPasswordVerify = async (event) => {

        try {
            setLoading(true);
            event.preventDefault();

            console.log(email)
            const response = await axios.post(`http://localhost:8080/auth/forget-password/${user.email}`);

            console.log(response)


            if (response.data === "This Email have not an account..!") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sorry, This Email have not an account..!",
                    //timer: 6000
                });
                console.log("This Email have not an account..!");

            } else {
                console.log("Otp is send..");
                setComponent(2);
            }

        } catch (error) {
            console.error("Error while loging:", error);

        }finally{
            setLoading(false);
        }
    }

    //verify OTP api
    const verifyOtpOnAction = async (event) => {

        try {
           // setLoading(true);
            event.preventDefault();

            console.log()
            const response = await axios.post("http://localhost:8080/auth/forget-password/verify-otp", {
                email: user.email,
                otp: user.otp,
            });

            console.log(response)
            if (response.data === "Otp Verfied Success..!") {
                console.log("Otp Verfied Success..!");
                setComponent(3);


            } else {
                console.log("Can't Verified !,Invalid Otp..!");
            }

        } catch (error) {
            console.error("Error while loging:", error);

        }finally{
            setLoading(false);
        }
    }


    const addNewPassword = async (event) => {

        try {
            event.preventDefault();


            const response = await axios.post("http://localhost:8080/auth/forget-password/new-password", {
                email: user.email,
                confirmPassword
            });
            console.log("api called..!");


            if (response.data === "Otp Verfied Success..!") {
                console.log("Otp Verfied Success..!");
                Swal.fire({
                    title: "Good job!",
                    text: "You Account Reset Success..!",
                    icon: "success"
                });
                navigate("/generate-reports")


            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password and Confirm Password is not same..!",
                    //timer: 6000
                });
            }

        } catch (error) {
            console.error("Error while loging:", error);

        }






    }




    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    {/* Step 1: Forget Password */}
                    {component === 1 && (
                        <>
                            <Typography component="h1" variant="h5">
                                Forget Password
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setEmail({...user, email:e.target.value})}
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />

                                <Button
                                    onClick={forgetPasswordVerify}
                                    fullWidth
                                    variant="contained"
                                    loading={loading}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Send OTP
                                </Button>
                            </Box>
                        </>
                    )}

                    {/* Step 2: OTP Verification */}
                    {component === 2 && (
                        <>
                            <Typography component="h1" variant="h5">
                                Verify OTP
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    value={user.otp}
                                    onChange={(e) =>
                                        setUser({ ...user, otp: e.target.value })
                                    }
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />


                                <Button
                                    onClick={verifyOtpOnAction}
                                    fullWidth
                                    variant="contained"
                                    disabled={user.otp === ""}
                                    loading={loading}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Verify OTP
                                </Button>
                            </Box>
                        </>
                    )}
                    {component === 3 && (
                        <>
                            <Typography component="h1" variant="h5">
                                Reset Password
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            fullWidth
                                            margin="normal"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleTogglePassword} edge="end">
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Confirm Password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            fullWidth
                                            margin="normal"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            error={password !== confirmPassword && confirmPassword.length > 0}
                                            helperText={password !== confirmPassword && confirmPassword.length > 0 ? "Passwords do not match" : ""}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleToggleConfirmPassword} edge="end">
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={password === "" || confirmPassword === "" || password !== confirmPassword}
                                    onClick={addNewPassword}
                                // loading={loading}
                                >
                                    Submit
                                </Button>

                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}



{/* <Typography component="h1" variant="h5">
                        Forget Password
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />


                        <Button
                            onClick={forgetPasswordVerify}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Otp
                        </Button> */}