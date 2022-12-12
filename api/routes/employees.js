const express = require('express')
const router = express.Router()
const Application = require('../models/application')
const User = require('../models/user')
const Employee = require('../models/employee')
const multer = require('multer')

// Creating one application form
router.post('/applicationform', async (req, res) => {

    const application = new Application({
        name: req.body.name,
        email: req.body.email,
        leaveType: req.body.leaveType,
        leaveDays: req.body.leaveDays,
        leaveStartDate: req.body.leaveStartDate,
        leaveEndDate: req.body.leaveEndDate,
        handOverStaff: req.body.handOverStaff,
        handOverStaffReport: req.body.handOverStaffReport,
        comments: req.body.comments

    })
    try {
        const newApplication = await application.save()
        res.status(201).json(newApplication)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Getting all applications
router.get('/leaveforms', async (req, res) => {
    try {
        const applications = await Application.find()
        res.json(applications)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One 
router.get('/leaveforms/:id', getApplication, (req, res) => {
    res.json(res.application)
})

// Updating One application form
router.patch('/leaveforms/:id', getApplication, async (req, res) => {
    if (req.body.name != null) {
        res.application.name = req.body.name
    }
    if (req.body.email != null) {
        res.application.email = req.body.email
    }
    if (req.body.leaveType != null) {
        res.application.leaveType = req.body.leaveType
    }
    if (req.body.leaveDays != null) {
        res.application.leaveDays = req.body.leaveDays
    }
    if (req.body.leaveStartDate != null) {
        res.application.leaveStartDate = req.body.leaveStartDate
    }
    if (req.body.leaveEndDate!= null) {
        res.application.leaveEndDate = req.body.leaveEndDate
    }
    if (req.body.handOverStaff!= null) {
        res.application.handOverStaff = req.body.handOverStaff
    }
    if (req.body.handOverStaffReport!= null) {
        res.application.handOverStaffReport = req.body.handOverStaffReport
    }
    if (req.body.comments != null) {
        res.application.comments = req.body.comments
    }
    try {
        const updatedApplication = await res.application.save()
        res.json(updatedApplication)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One application form
router.delete('/leaveforms/:id', getApplication, async (req, res) => {
    try {
        await res.application.remove()
        res.json({ message: 'Deleted application' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getApplication(req, res, next) {
    let application
    try {
        application = await Application.findById(req.params.id)
        if (application == null) {
            return res.status(404).json({ message: 'Cannot find application' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.application = application
    next()
}


// Creating an employee
router.post('/createemployee', async (req, res) => {

    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        department:req.body.department,
        admin: req.body.admin
    })
    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Getting employees
router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One employee
router.get('/employee/:id', getEmployee, (req, res) => {
    res.json(res.employee)
})

async function getEmployee(req, res, next) {
    let employee
    try {
        employee = await Employee.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.employee = employee
    next()
}

// Deleting One employee
router.delete('/deleteemployee/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.remove()
        res.json({ message: 'Deleted employee' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Updating employee
router.patch('/updateemployee/:id', getEmployee, async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name
    }
    if (req.body.email != null) {
        res.employee.email = req.body.email
    }
    if (req.body.title != null) {
        res.employee.title = req.body.title
    }
    if (req.body.leaveDays != null) {
        res.employee.department = req.body.department
    }
    if (req.body.admin != null) {
        res.employee.admin = req.body.admin
    }
   
    try {
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// login a user
router.post("/login",(req,res)=>{
    const {email,password} =req.body

    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find application' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}
// register a user
router.post("/register",(req,res)=>{
    console.log(req.body) 
    const {name,email,password} =req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessful"})
                }
            })
        }
    })


}) 

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})


module.exports = router