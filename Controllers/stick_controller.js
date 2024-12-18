import StickNots from "../Models/sticky_models.js";

export const createStick = async (req, res) => {
  try {
    const tkon=req.headers.authorization?.split(" ")[1];
    const user = req.user;
    if (!user) return res.status(403).json({ message: "User nahi hai" });
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newStick = new StickNots({
      title,
      content,
    });

    await newStick.save();
    return res
      .status(201)
      .json({ message: "Stick created successfully", newStick ,tkon});
  } catch (error) {

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