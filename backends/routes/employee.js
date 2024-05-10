const express = require('express');
const router =  express.Router();
const Employee = require('../models/Employee');
const fetchuser = require('../middleware/getuser');
const { body, validationResult } = require('express-validator');

router.post('/addemployee',fetchuser, async (req, res)=>{
    try {

        const {email,name,mobile,designation,gender,course,image} = req.body;
        const employee = new Employee({email,name,mobile,designation,gender,course,image,user:req.user.id});
        const savedEmployee= await employee.save();
        res.json("SuccessFully Saved");
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err})
    }
})

router.get('/getEmployee',fetchuser, async (req, res)=>{
    try {
        let employee = await Employee.find({ user: req.user.id});
        if(employee.length > 0) {
            res.json(employee);
        }
        else{
            {res.json({message:"no books"});}
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err})
    }
})

// router.post('/getby/:key',fetchuser, async (req, res)=>{
//     try {
//         let filter={``:""}
//         let books = await Employee.find({ req.param.: req.body.tag});
//         if(books.length > 0) {
//             res.json(books);
//         }
//         else{
//             {res.json({message:"no books"});}
//         }
//     }
//     catch (err) {
//         console.error(err);
//         res.status(400).json({ error: err})
//     }
// })

router.post('/deleteEmployee',fetchuser, async (req, res)=>{
    try {
        let employee=await Employee.findById(req.body.id);
        if(!employee)
        {
            res.status(404).send("Not Found");
        }
        else
        {
            employee=await Employee.findByIdAndDelete(req.body.id);
            res.json("Deleted Successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error})
    }
})

router.post('/edit',fetchuser, async (req, res)=> {
    try {
        const employeeId = req.body._id;
        const {email, name, mobile, designation, gender, course, image} = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            {
                $set: {email, name, mobile, designation, gender, course, image},
            },
        );

        if (!updatedEmployee) {
            return res.status(404).json({error: 'Employee not found'});
        }

        let employee = await Employee.find({ user: req.user.id});
        if(employee.length > 0) {
            res.json(employee);
        }
        else{
            {res.json({message:"employee"});}
        }
    } catch (error) {
        console.error('Update failed:', error);
        res.status(500).json({error: 'Server Error'});
    }
});

module.exports = router;
