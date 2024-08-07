import mongoose from "mongoose";


export const connectDB = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@first-project.dkbbjak.mongodb.net/?retryWrites=true&w=majority&appName=First-Project`,{
            dbName: "chat-app"
        })
            .then(res => {
                // console.log(res)
                console.log(("DB Connected"));
            })
    } catch (error) {
        
    }
   
}