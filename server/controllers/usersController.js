import User from "../Models/userModel.js";

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -email")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Serval Error", message: error.message });
    }
}


export { getUsersForSidebar }