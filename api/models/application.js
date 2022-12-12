const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true,
    },
    leaveDays: {
        type: Number,
    },
    leaveStartDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    leaveEndDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    handOverStaff: {
        type: String
    },
    handOverStaffReport: {
        type: String
    },
    comments: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Application', applicationSchema)