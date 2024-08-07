import User from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utlis/generateToken.js";

const signupUser = async (req, res) => {
    try {
        const { fullName, username, email, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "User is  already exists" })
        }
        const userAuthByEmail = await User.findOne({ email })
        if (userAuthByEmail && userAuthByEmail?.email == email) {
            return res.status(400).json({ error: "User is  already exists" })
        }

        // HASHING PASSWORD

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        // https://avatar-placeholder.iran.liara.run/document

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            // Generate Jwt Token
            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(200).json({ error: "Invalid user Data" })
        }


    } catch (error) {
        console.log("Error in Signup Controller", error)
        res.status(500).json({ error: "Internal Server Error", message: error.message })
    }
}

const loginUser = (req, res) => {
    res.send("loginUser")
}


const logOutUser = (req, res) => {
    res.send("logout User")
}


export { signupUser, loginUser, logOutUser }