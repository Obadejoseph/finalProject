const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        required: true,

    },
    phoneNumber:{
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    profilePicture:{
        imageUrl:{type:String, required:true},
        publicId:{type:String, required:true}
    }
    

},{timestamps: true})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel