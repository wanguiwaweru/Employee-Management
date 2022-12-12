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


export default function AllEmployees() {
    const [employeeList, showEmployeeList] = useState([]);
    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:5000/employees/deleteemployee/${id}`).then(() => {
            window.location.reload(false);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/employees/all").then((allEmployees) => {
            showEmployeeList(allEmployees.data);
        });
    }, []);

    return (
        <>
            <h1 style={{ margin:"20px 0 20px 50px" }}>All Employees</h1>
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
                                Title
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Department
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeList.map((employee, key) => (
                            <TableRow key={employee.key}>
                                <TableCell align="center" component="th" scope="row">{employee.name}</TableCell>
                                <TableCell align="center">{employee.email}</TableCell>
                                <TableCell align="center">{employee.title}</TableCell>
                                <TableCell align="center">{employee.department}</TableCell>
                                <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} component={Link} to={`/updateemployee/${employee._id}`} > Edit Details</TableCell>
                                <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} onClick={() => deleteEmployee(employee._id)} > Delete</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}