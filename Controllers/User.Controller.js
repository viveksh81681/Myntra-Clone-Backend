
const express = require("express");
// const router = express.Router();

const User = require("../models/Users.model");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const newToken = (user) => {

    return jwt.sign({user},process.env.JWT_SECRET_KEY)
}


// ------------------------------------------- SignUp ---------------------------------------------------



const register = async(req,res) => {

    let user = await User.findOne({email : req.body.email}).lean().exec()

    if(user){
        return res.send("Please try another email")
    }

    user = await User.create(req.body)

    const token = newToken(user)

    return res.send({user,token})

}



// --------------------------------------------- Login -----------------------------------------------------


const login = async(req,res) => {

    let user = await User.findOne({email : req.body.email})

    if(!user){
        return res.send("Please try another email password")
    }

    const match = user.checkPassword(req.body.password);

    if(!match){
        return res.send("please try another email or password")
    }

    const token = newToken(user)

    return res.send({user,token})
}




// router.get("/", async(req, res) => {
//     try{
//         const Users = await User.find().populate("cart").lean().exec();
//         return res.status(200).send(Users);
//     }catch(err){
//         return res.status(500).send(err.message);
//     }
// });

// router.post("/", async(req, res) => {
//     try{
//         const Users = await User.create(req.body);
//         return res.status(200).send(Users);
//     }catch(err){
//         return res.status(500).send(err.message);
//     }
// });

// router.get("/:id/", async(req, res) => {
//     try{
//         const Users = await User.findById(req.params.id).populate({path: "cart"}).lean().exec();
//         return res.status(200).send(Users);
//     }catch(err){
//         return res.status(500).send(err.message);
//     }
// });

// router.get("/users/:number/", async(req, res) => {
//     try{
//         const Users = await User.findOne({number: req.params.phone_num}).lean().exec();
//         return res.status(200).send(Users);
//     }catch(err){
//         return res.status(500).send(err.message);
//     }
// });

// router.patch("/:id/", async(req, res) => {
//     try{
//         const Users = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         return res.status(200).send(Users);
//     }catch(err){
//         return res.status(500).send(err.message);
//     }
// });

// router.delete("/:id/", async(req, res) => {
//     try{
//         const Users = await User.findByIdAndDelete(req.params.id);
//         return res.status(200).send(Users);
//     }catch(err){
//         return res.status(500).send(err.message);
//     }
// });

module.exports = {register,login}

