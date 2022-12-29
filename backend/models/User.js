const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
},
{
    timestamps: true,
} 
);

module.exports=mongoose.model("User",UserSchema);