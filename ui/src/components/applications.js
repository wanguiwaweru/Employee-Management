import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from 'react-router-dom'


export default function ApplicationList() {
    const [applicationList, showApplicationList] = useState([]);
    const deleteApplication= (id) => {
        axios.delete(`http://localhost:5000/employees/leaveforms/${id}`).then(() => {
            window.location.reload(false);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/employees/leaveforms").then((allApplications) => {
            showApplicationList(allApplications.data);
        });
    }, []);

    return (
        <>
            <h1 style={{ margin:"20px 0 20px 50px" }}>All Applications</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" fontWeight="bold">
                                Name
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Email
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Type of Leave
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Leave Days
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                End Date
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Handover Staff
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Handover Report
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Comments
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicationList.map((application, key) => (
                            <TableRow key={application.key}>
                                <TableCell align="center" component="th" scope="row">{application.name}</TableCell>
                                <TableCell align="center">{application.email}</TableCell>
                                <TableCell align="center">{application.leaveType}</TableCell>
                                <TableCell align="center">{application.leaveDays} </TableCell>
                                <TableCell align="center">{application.leaveEndDate} </TableCell>
                                <TableCell align="center">{application.handoverStaff} </TableCell>
                                <TableCell align="center">{application.handoverReport} </TableCell>
                                <TableCell align="center">{application.comments} </TableCell>
                                <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} component={Link} to={`/leaveforms/${application._id}`} > Edit</TableCell>
                                <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} onClick={() => deleteApplication(application._id)} > Delete</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}