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

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username and password" })
        }

        generateTokenAndSetCookie(user._id, res)


        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in Signin Controller", error)
        res.status(500).json({ error: "Internal Server Error", message: error.message })
    }
}


const logOutUser =  (req, res) => {
    try {

        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({message: "Log Out successfully"})
    } catch (error) {
        console.log("Error in Signin Controller", error)
        res.status(500).json({ error: "Internal Server Error", message: error.message })
    }
}


export { signupUser, loginUser, logOutUser }