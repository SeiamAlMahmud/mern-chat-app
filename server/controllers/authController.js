import User from "../Models/userModel.js";

const signupUser = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        // HASHING PASSWORD

        // https://avatar-placeholder.iran.liara.run/document

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })


    } catch (error) {
        console.log("Error in Signup Controller")
        res.status(500).json({error: "Internal Server Error"})
    }
}

const loginUser = (req, res) => {
    res.send("loginUser")
}


const logOutUser = (req, res) => {
    res.send("logout User")
}


export { signupUser, loginUser, logOutUser }