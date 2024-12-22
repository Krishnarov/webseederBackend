import StickNots from "../Models/sticky_models.js";

export const createStick = async (req, res) => {
  try {

    const user = req.user;
    if (!user) return res.status(403).json({ message: "User nahi hai" });
    const { title, content ,date,category} = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newStick = new StickNots({
      title,
      content,
      date,
      category,
      createdBy:user._id,

    });

    await newStick.save();
    return res
      .status(201)
      .json({ message: "Stick created successfully", newStick });
  } catch (error) {
console.log(error);

    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllSticks = async (req, res) => {
  try {
    const sticks = await StickNots.find();
   return res.status(200).json({message:"feching data successful",sticks});
  } catch (error) {
    res.status(500).json({ message: "Error fetching sticks", error });
  }
};
export const getAllSticksbyId = async (req, res) => {
  try {
    const user = req.user;   
    if (!user) return res.status(404).json({ message: "User nahi hai" });
    const sticks = await StickNots.find({createdBy:user._id}).sort({createdAt:-1});
    
    if (!sticks) {
      return res.status(404).json({ message: "Sticks नहीं मिले" ,sticks});
    }
   return res.status(200).json({message:"feching data successful",sticks});
  } catch (error) {
    res.status(500).json({ message: "Error fetching sticks", error });
  }
};
export const deletesticky=async (req,res) => {

  const {id}=req.params
  try {
    if(!id){
      return res.status(400).json({ message: "ID is required" });
    }
    const deletadStickNots = await StickNots.findByIdAndDelete(id);
    if (!deletadStickNots) {
      return res.status(404).json({ message: "StickNots not found" });
    }
    return res.status(200).json({ message: "StickNots deleted successfully" });

  } catch (error) {
    res.status(500),json({message:"Internal server error", error})
  }
}
export const TaskDone=async (req,res) => {

  const {id}=req.params
  try {
    if(!id){
      return res.status(400).json({ message: "ID is required" });
    }
    const StickNots = await StickNots.findById(id);
    if (!StickNots) {
      return res.status(404).json({ message: "StickNots not found" });
    }
    StickNots.isDone=true;
    StickNots.save();
    return res.status(200).json({ message: "StickNots deleted successfully" });

  } catch (error) {
    res.status(500),json({message:"Internal server error", error})
  }
}