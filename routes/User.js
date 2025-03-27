const {Router} = require('express');
const { User, Course } = require('../db/database');
const userMiddleware = require('../middlewares/User');
const router = Router();

// User can insert his details 
// His username
// His password
//check that the username can't ne same while creating the database
router.post('/signup',async function(req,res){
    try {
        const {username, password} = req.body;
    const ispresent = await User.findOne({
        username,
        password
    })
    if(ispresent){
        return res.status(409).json({
            msg:"This username is not available"
        })
    }
    await User.create({
        username,
        password
    })
    res.json({
        msg:"User is created successfully"
    })
    } catch (error) {
        res.status(500).json({
            msg:"Server is not responding"
        })
    }
})

//User signin point 
router.post('/signin',function(req,res){

})

// User can see all the courses present

router.get('/courses',userMiddleware,async function(req,res){
    const courses = await Course.find({});
    res.json({
        courses:courses
    })
})

// User can purchase a course

router.put('/courses/:courseId',userMiddleware,async function(req,res){
    const courseId = req.params.courseId;
    const username = req.headers.username;
    console.log(courseId);
    console.log(username);

    await User.updateOne({
        username:username
    },{
        $push:{
            purchaseCourse:courseId
        }
    })

    res.json({
        msg:"Purchase Complete"
    })
})

// User can see all his purchased courses
router.get('/purchasedCourses',async function(req,res){
    const user = await User.findOne({
        username:req.headers.username
    });

    const courses = await Course.find({
        _id:{
            "$in":user.purchaseCourse
        }
    });

    res.json({
        courses:courses
    })
})

module.exports = router;