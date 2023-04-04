const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add username"]
    },
    email:{
        type:String,
        required:[true,"Please add your contact email address"],
        unique:[true,"Email id already used"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
},
{
    timestamps:true,
});

module.exports=mongoose.model("User",userSchema)