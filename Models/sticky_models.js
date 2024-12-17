import mongoose from "mongoose";

const stickSchama=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true,

    }
},{timestamps:true})


const Stick = mongoose.model("stick", stickSchama);

export default Stick;