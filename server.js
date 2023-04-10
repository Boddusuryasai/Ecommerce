import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from 'body-parser';
import connectToDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express()
dotenv.config()
connectToDB()


app.use(express.json())
// Parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/" ,
(req,res)=>{
res.send("server home")
}
);
app.get("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
app.listen(process.env.PORT , ()=>{
    console.log("server started running "+ process.env.PORT);
})