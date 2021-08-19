const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.route");
const fileRouter = require("./routes/file.route");
const corsMiddleware = require("./middleware/cors.middleware");


const app = express();
const PORT = config.get("serverPort");
const dbURL = config.get("dbURL");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
    try {


        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err => console.log(err.reason));
            
        app.listen(PORT, () => {
            console.log("START server on", PORT);
        })
    }catch(e){
        console.log("error", e);
    }
}
start();