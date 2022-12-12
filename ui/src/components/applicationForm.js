import React,{useState} from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import axios from "axios";
import Select from '@material-ui/core/Select';


const leaveTypes = [
    {
        label: "Sick Leave",
        value:"0"
    },

    {
        label: "Monthly leave",
        value:"1"
    },
];
const handOverStaffs = [
    {
        label: "Manager",
        value: "0"
    },
    {
        label: "Supervisor",
        value: "1"
    },
];
export default function ApplicationForm() {
    const paperStyle = { padding: '30px 20px', height: '800px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight:"800" }
    const marginTop = { marginTop: 25 }
    const [application, setApplication] = useState({
        name: "",
        email: "",
        leaveType:"",
        leaveStartDate:"",
        leaveDays: "",
        leaveEndDate:"",
        handOverStaff:"",
        handOverReport:"",
        comments: "",
       
    });

    const createApplication= () => {
        axios.post("http://localhost:5000/employees/applicationform", application).then(() => {
            window.alert("Your request has been received.Successfully applied for Leave.")
            window.location.reload(false);
        })
    };


    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                <h2 style={headerStyle}>Application Form</h2>
                    <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" value={application.name} onChange={(e) => setApplication({...application, name: e.target.value })}
                        fullWidth label='Name' placeholder="Enter your name" />

                    <TextField style={marginTop} id="email" value={application.email} onChange={(e) => setApplication({ ...application,email: e.target.value })}
                        fullWidth label='Email' placeholder="Enter your email" />
                    
                    <Select style={marginTop} id="leaveType" value={application.leaveType} onChange={(e) => setApplication({ ...application,leaveType: e.target.value })} fullWidth label='Name'>
                            {leaveTypes.map((leaveType) => (
                                <option value={leaveType.value}>{leaveType.label}</option>
                            ))}
                    </Select>

                    <TextField style={marginTop} id="leaveStartDate" type="datetime-local" defaultValue="2017-05-24" InputLabelProps={{shrink: true,}} value={application.leaveStartDate} onChange={(e) => setApplication({ ...application,leaveStartDate: e.target.value })} fullWidth label='Start Date' />

                    <TextField style={marginTop} id="leaveDays" value={application.leaveDays} onChange={(e) => setApplication({...application,leaveDays: e.target.value })}
                        fullWidth label='Leave Days' placeholder="0" />
                    
                    <TextField style={marginTop} id="leaveEndDate" type="datetime-local" defaultValue="2022-05-24" InputLabelProps={{shrink: true,}} value={application.leaveEndDate} onChange={(e) => setApplication({ ...application,leaveEndDate: e.target.value })} fullWidth label='End Date' />

                    <Select style={marginTop} id="handoverStaff" value={application.handOverStaff} onChange={(e) => setApplication({ ...application,handOverStaff: e.target.value })} fullWidth label='Name' >
                            {handOverStaffs.map((handOverStaff) => (<option value={handOverStaff.value}>{handOverStaff.value}</option>))}
                    </Select>
                    
                    <Button variant="contained" component="label" style={marginTop} value={application.handOverReport} onChange={(e) => setApplication({ ...application,handOverReport: e.target.value })}fullWidth label='Leave Days'> handoverReport
                        <input type="file" style={marginTop} value={application.handOverReport} onChange={(e) => setApplication({ ...application,handOverReport: e.target.value })} />
                    </Button>

                    <TextField style={marginTop} id="comments" value={application.comments} onChange={(e) => setApplication({...application, comments: e.target.value })}
                        fullWidth label='comments' placeholder="Comments" />
                    
                    <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={createApplication}>Send Application</Button>
                </form>
            </Paper>
        </Grid>
    )
}