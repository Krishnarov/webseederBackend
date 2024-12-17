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


const StickNots = mongoose.model("StickNots", stickSchama);

export default StickNots;