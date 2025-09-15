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
        imageUrl:{type:String, required:false},
        publicId:{type:String, required:false}
    }
    

},{timestamps: true})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel