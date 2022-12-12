import React, { useState } from 'react';
import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import axios from "axios";

export default function SignUpPage(){
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    const [employee,setEmployee] = useState({
        name:"",
        email:"",
        password: ""
        })
    
    const createEmployee = ()=>{
        const {name,email,password} = employee
        if (name && email && password){

            axios.post("http://localhost:5000/employees/register",employee )
            .then(res=>console.log(res))
        }
        else{
            alert("invalid input")
       }}
   
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='name' placeholder='Enter name' variant="outlined" fullWidth required value={employee.name} onChange={(e) => setEmployee({...employee, name: e.target.value })}/>
                <TextField label='email' placeholder='Enter email' variant="outlined" fullWidth required value={employee.email} onChange={(e) => setEmployee({...employee, email: e.target.value })}/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required value={employee.password} onChange={(e) => setEmployee({...employee, password: e.target.value })}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} component={Link} onClick={createEmployee} to={'/employees'} fullWidth required>Sign In</Button>
                
                <Typography component={Link} to ={`/signup`}> Don't have an account ? Sign Up</Typography>
                <Typography component={Link} to ={`/forgotpassword`}> Forgot Password?</Typography>


            </Paper>
        </Grid>
    )
}
    