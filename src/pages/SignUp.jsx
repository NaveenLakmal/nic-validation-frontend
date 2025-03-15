import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const theme = createTheme();



export default function SignUp() {

    const [otp, setOtp] = useState("");
    const [component, setComponent] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        Password: '',
    });


    const signUpButtonOnAction = async (event) => {
        setLoading(true);
        console.log(user.firstName, user.lastName, user.email, user.password);

        try {
            event.preventDefault();


            const response = await axios.post("http://localhost:8080/auth/sign-up", {
                fullName: user.firstName + " " + user.lastName,
                email: user.email,
                password: user.Password

            });

            if (response.data === "Email already registered") {
                console.log("Email already registered");
                //navigate("/generate-reports");


            } else {
                setComponent(2);
                console.log("otp send Sucess");

            }

        } catch (error) {
            console.error("Error while loging:", error);

        } finally {
            setLoading(false);
        }
    }

    const verifyOtpOnAction = async (event) => {

        try {
            event.preventDefault();


            const response = await axios.post("http://localhost:8080/auth/verify-otp", {
                email: user.email,
                otp,
            });


            if (response.data === "otp verified") {
                
                Swal.fire({
                    title: "Good job!",
                    text: "You Account Created Success..!",
                    icon: "success"
                });
                navigate("/generate-reports");


            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Otp or Expired..!",
                    //timer: 6000
                });
                console.log("Can't Verified !,Invalid Otp..!");
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

                    {/* Step 1: Sign Up Component */}
                    {component === 1 && (
                        <>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            value={user.firstName}
                                            onChange={(e) =>
                                                setUser({ ...user, firstName: e.target.value })
                                            }
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            value={user.lastName}
                                            onChange={(e) =>
                                                setUser({ ...user, lastName: e.target.value })
                                            }
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            value={user.email}
                                            onChange={(e) =>
                                                setUser({ ...user, email: e.target.value })
                                            }
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={user.password}
                                            onChange={(e) =>
                                                setUser({ ...user, password: e.target.value })
                                            }
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={signUpButtonOnAction}
                                    loading={loading}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link onClick={() => setComponent(4)} variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )}

                    {/* Step 2: OTP Verification Component */}
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
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    label="OTP"
                                    name="otp"
                                    autoComplete="number"
                                    autoFocus

                                />
                                <Button
                                    onClick={verifyOtpOnAction}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Verify
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </ThemeProvider>



    );
}

