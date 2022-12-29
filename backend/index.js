const express=require("express");
const mongoose=require("mongoose");
const app= express();

const dotenv=require("dotenv");
dotenv.config();
app.use(express.json());

const pinRoute= require("./routes/pins");
const userRoute= require("./routes/users");
mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("MongoDB connected");
    })
    .catch((err)=> console.log(err));
app.use("/api/pins",pinRoute);
app.use("/api/users",userRoute);
app.listen(8800,function(){
    console.log("Backend on coldd!!!")
} );
