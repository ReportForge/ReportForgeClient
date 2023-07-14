import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core';
import { useApi } from '../../api'; // replace './api' with the actual path to your api.js file
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const api = useApi();
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const loginResult = await api.login(username, password);
            console.log(loginResult);
            // Save login result to local storage
            localStorage.setItem('loginResult', JSON.stringify(loginResult));
            // handle success (e.g. redirect to another page)
            navigate('/Home');
        } catch (error) {
            console.error(error);
            // handle error (e.g. show error message)
            alert('Login failed: ' + error.message);
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper style={{ padding: 20, marginTop: 50 }}>
                    <Typography variant="h4" align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required fullWidth 
                            label="Username" 
                            value={username} 
                            onChange={handleUsernameChange} 
                            style={{marginTop: 20}}
                        />
                        <TextField 
                            variant="outlined" 
                            margin="normal" 
                            required fullWidth 
                            label="Password" 
                            type="password" 
                            value={password} 
                            onChange={handlePasswordChange}
                        />
                        <Button 
                            type="submit" 
                            fullWidth variant="contained" 
                            color="primary" 
                            style={{marginTop: 20}}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;
