import Stick from "../Models/sticky_models.js";

export const createStick = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newStick = new Stick({
      title,
      content,
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
    const sticks = await Stick.find();
    res.status(200).json(sticks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sticks", error });
  }
};
