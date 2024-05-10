const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema= new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
    },

})
const User = mongoose.model('user',UserSchema);
module.exports =User;
