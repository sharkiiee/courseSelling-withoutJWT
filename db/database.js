const mongoose = require('mongoose');
mongoose.connect(''URL);

const adminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchaseCourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
})

const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number
});

const Admin = mongoose.model('Admin',adminSchema);
const User = mongoose.model('User',userSchema)
const Course = mongoose.model('Course',courseSchema);


module.exports = {
    Admin,
    User,
    Course
}