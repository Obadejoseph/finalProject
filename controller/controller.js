const userModel = require('../model/userModel')

const cloudinary = require('../config/cloudinary')

const fs = require('fs')

const bcrypt = require('bcrypt');
const { response } = require('express');


exports.register = async (req,res) => {
    try {
        const{fullName, email, password, age, phoneNumber}= req.body;
        const file = req.file;
        let response;
        console.log(file);
        
        const existEmail =await userModel.findOne({email:email.toLowerCase()});
        const existphoneNumber = await userModel.findOne({phoneNumber: phoneNumber});

        if(existEmail || existphoneNumber) {
            fs.unlinkSync(file.path)
            return res.status(400).json({
                message:`user already exist`
            })
        };
        if (file && file.path) {
             response  = await cloudinary.uploader.upload(file.path);
         
             
            console.log("response from coudinary",response);
            fs.unlinkSync(file.path)
        
        }

        const saltRound  = await bcrypt.genSalt(10);
        console.log(saltRound);
        

        const hashPassword = await bcrypt.hash(password, saltRound)
        console.log(hashPassword);


        

        const user = new userModel({
            fullName,
            email,
            password:hashPassword,
            age,
            phoneNumber,
            profilePicture: {
                publicId: response.public_id,
                imageUrl: response.secure_url
            }
        })
        await user.save();
        res.status(200).json({
            message:`registed successfully`,
            data:user
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:`internal server error`,
            error: error.message
        })
    }
    
}
exports.getaAll = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message:`internal server error`,
            error: error.message
        })
    }
    
}

exports.getOne =async (req,res) => {
    try {
        const{id}= req.params

        const data = await userModel.findById(id)
        res.status(200).json({
            message:`get one is successfull`,
            data:data
        })
    } catch (error) {
        res.status(500).json({
            message:`internal server error`,
            error:error.message
       })
    }
}

exports.update = async (req,res) => {
    
    try {
        const {fullName,age}= req.body;
        const {id} = req.params;
        const file = req.file;
        let response ;
        const user = await userModel.findById(id)
        if (!user){
            fs.unlinkSync(file.path) ;
            return res.status(404).json({
                message:`user not found`
            }) 
        }
        if(file && file.path){
            await cloudinary.uploader.destroy(user.profilePicture.publicId);
            response = await cloudinary.uploader.upload(file.path);
            fs.unlinkSync(file.path);

        }
        const userData = {
            fullName:fullName?? user.fullName,
            age:age?? user.age,
            profilePicture:{
                imageUrl: response?.secure_url,
                publicId:response?.public_id
            }
        }

        const newData = Object.assign(user,userData)
        const update = await userModel.findByIdAndUpdate(user._id, 
            newData, {new:true}
        )

        res.status(200).json({
            message:'user updated successfully',
            data: update
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:`internal server Error`,
            error: error.message
        })
        
    }
}
