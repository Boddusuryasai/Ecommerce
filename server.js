import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
const app = express()
dotenv.config()
connectToDB()

app.use(express.json())
app.use(cors())
app.use("/api/v1/auth" , authRoutes)
app.get("/" ,
(req,res)=>{
res.send("server home")
}
);

app.listen(process.env.PORT , ()=>{
    console.log("server started running "+ process.env.PORT);
})