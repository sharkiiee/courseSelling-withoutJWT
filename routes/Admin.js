const {Router} = require('express');
const { Admin, Course } = require('../db/database');
const adminMiddleware = require('../middlewares/Admin');
const router = Router();

// Admin can signup 
//Use async await to await the promises
//Check no admin with same username is available
//username and password
router.get('/signup', async function(req, res) {
    try {
        const { username, password } = req.body;

        // Check if username exists using async/await
        const existingUser = await Admin.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: "Username is not available" });
        }

        // Create new admin using async/await
        await Admin.create({ username, password });

        res.json({ msg: "Admin is created" });
    } catch (error) {
        res.status(500).json({ 
            msg: "Something is wrong with the server",
            error: error.message 
        });
    }
});


//signin endpoint for the admin
router.post('/signin',function(req,res){

})

//admin can add courses
//check if the admin is valid admin
router.post('/addCourse',adminMiddleware,async function(req,res){
    try {
        const {title, description, imageLink, price} = req.body;
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        msg:"Course is been created successfully ",
        courseId:newCourse._id
    })
    } catch (error) {
        res.status(500).json({ 
            msg: "Something is wrong with the server",
        });
    }
})

//admin can see all the courses
//Authentication
router.get('/courses',adminMiddleware,async function(req,res){
    const ALL_COURSES = await Course.find({})

    res.json({
        Courses:ALL_COURSES
    })
})

module.exports = router;