import express from "express"
import cors from "cors"
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./config/env";

import userRouter from "./routes/userRouter";

const app = express()


app.use(cors({origin: ENV.FRONTEND_URL, credentials: true}))
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({success:true})
})

app.use("/api/users", userRouter);

app.listen(ENV.PORT, () => {
  console.log(`Server is up and running on port:${ENV.PORT}`);
});