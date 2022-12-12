const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    department:{
        type:String,
        required: true
    },
    admin:{
        type: Boolean,
        required:true
    }

  },
  
)

module.exports = mongoose.model('Employee', employeeSchema)