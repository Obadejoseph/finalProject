const userModel = require('../model/userModel')

const bcrypt = require('bcrypt')


exports.register = async (req,res) => {
    try {
        const{fullName, email, password, age, phoneNumber}= req.body;
        const existEmail =await userModel.findOne({email:email.toLowerCase()});
        const existphoneNumber = await userModel.findOne({phoneNumber: phoneNumber});

        if(existEmail || existphoneNumber) {
            return res.status(400).json({
                message:`user already exist`
            })
        };

        const saltRound  = await bcrypt.genSalt(10);
        console.log(saltRound);
        

        const hashPassword = await bcrypt.hash(password, saltRound)
        console.log(hashPassword);

        

        const data =await userModel.create({
            fullName,
            email,
            password:hashPassword,
            age,
            phoneNumber
        })
        res.status(200).json({
            message:`registed successfully`,
            data: data
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

//