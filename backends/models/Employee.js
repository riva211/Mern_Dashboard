const mongoose = require('mongoose');
const { Schema } = mongoose;
const Employeeschema= new Schema({
    name:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
    },
    mobile:{
        type: 'number',
        required: true,
        
    },
    designation:{
        type: 'string',
        required: true,
    },
    gender:{
        type: 'string',
        required: true,
    },
    course:{
        type: 'string',
        required: true,
    },
    image:{
        type: 'string',
        required: true,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date:{
        type: Date,
        default: Date.now
    },

})
const Employee = mongoose.model('employee',Employeeschema);
module.exports =Employee;
