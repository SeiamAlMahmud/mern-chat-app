// import React, { useState } from 'react'
// import toast from 'react-hot-toast';

// const useSignUp = async () => {
//     const [Loading, setLoading] = useState(false)

//     const signup = async ({ fullName, username, email, gender, password, confirmPassword }) => {
//         const success = handleInputErrors({ fullName, username, email, gender, password, confirmPassword })
//         if (!success) return;
//     }

//     setLoading(true);
//     try {
//         const res = await fetch(`http://localhost:3000/api/auth/signup`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ fullName, username, email, gender, password, confirmPassword })
//         })
//     } catch (error) {
//         toast.error(error.message);
//     } finally {
//         setLoading(false);
//     }


// }

// export default useSignUp


// const handleInputErrors = ({ fullName, username, email, gender, password, confirmPassword }) => {
//     if (!fullName || !username || !email || !gender || !password || !confirmPassword) {
//         toast.error("Please fill in all fields");
//         return false;
//     }

//     if (password !== confirmPassword) {
//         toast.error("Password do not match.");
//         return false;
//     }

//     if (password.length > 6) {
//         toast.error("Password must be at least 6 characters long.");
//         return false;
//     }

//     return true;
// }