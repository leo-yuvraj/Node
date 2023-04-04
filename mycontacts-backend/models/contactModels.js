const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true,"Please add your contact Name"]
    },
    email:{
        type:String,
        required:[true,"Please add your contact email address"]
    },
    phone:{
        type:String,
        required:[true,"Please add your contact phone no"]
    },
},
{
    timestamps:true,
});

module.exports=mongoose.model("Contact",contactSchema);