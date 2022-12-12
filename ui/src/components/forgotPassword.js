import React from 'react'
import { Grid,Paper, TextField, Button } from '@material-ui/core'


const ForgotPasswordPage=()=>{

    const paperStyle={padding :20,height:350,width:300, margin:"20px auto"}
    const btnstyle={margin:'10px 10px'}
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Forgot Password</h2>
                </Grid>
                <h3>Details will be sent to your email</h3>
                <TextField label='Email' placeholder='Enter email' variant="outlined" fullWidth required/>                    
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Send</Button>
                
            </Paper>
        </Grid>
    )
}

export default ForgotPasswordPage