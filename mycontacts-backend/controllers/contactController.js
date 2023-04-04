const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModels");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts 
//@access private
const createContacts = asyncHandler(async (req,res)=>{
    console.log("The request body is : ",req.body);
    const{name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(201).json(contacts);
});

//@desc Get all contacts
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(400);
        throw new Error("Contact not found!");
    }
    res.status(200).json(contacts);
});

//@desc Update contact
//@route put /api/contacts/:id
//@access private
const updateContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(400);
        throw new Error("Contact not found!");
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other users info");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        res.status(400);
        throw new Error("Contact not found!");
    }

    if(contacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete other users info");
    }

    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contacts);
});

module.exports={ getContacts,getContact,createContacts,updateContacts,deleteContacts };