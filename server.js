import express from "express"
import dotenv from "dotenv"
import connectToDB from "./config/db.js"
const app = express()
dotenv.config()
connectToDB()
app.get("/" ,
(req,res)=>{
res.send("server home")
}
);

app.listen(process.env.PORT || 8080 , ()=>{
    console.log("server started running ");
})