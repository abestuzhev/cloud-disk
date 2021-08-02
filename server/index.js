const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.route");


const app = express();
const PORT = config.get("serverPort");
const dbURL = config.get("dbURL");

app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
    try {


        await mongoose.connect(dbURL);
        app.listen(PORT, () => {
            console.log("START server");
        })
    }catch(e){

    }
}
start();