import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
   
},
Fullname:{
    type:String,
    required:true,

    trim:true,
   
    index:true
},
avatar:{
    type:String,//cloudinary ury
    required:true

},
coverImage:{
    type:String,//cloudinary url
   
},
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
],
password:{
    type:String,
    required:[true,'Password is required']
},
refreshToken:{
    type:String
}
},
{
    timestamps:true
})

userSchema.pre("save",async function(next){
if(!this.isModified("password")) return next();

this.password = bcrypt.hash(this.password,10)
next()
})


userSchema.methods.isPasswordCorrect = async function (password){
  return await  bcrypt.compare(password,this.password)

}

const jwt = require('jsonwebtoken');

// Replace 'your_jwt_secret' with your actual secret key
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.JWT_SECRET || 'your_jwt_secret', // Use env var in production
        { expiresIn: '1h' } // Optional: token expiration time
    );
};


const jwt = require('jsonwebtoken');

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_REFRESH_SECRET || 'your_refresh_token_secret',
        { expiresIn: '7d' } // Longer expiration for refresh tokens
    );
};


export const User  = mongoose.model("User",userSchema)