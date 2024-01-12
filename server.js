const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


//Routes
const userRoutes = require("./routes/userRoutes");
const { invalidPathHandler, errorResponserHandler } = require("./middleware/errorHandler");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get('/', function(req, res) {
    res.send("Server is running...");
});

app.use("/api/users", userRoutes)

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);


const PORT = process.env.PORT || 5000;

app.listen(5000, function() {
    console.log("Server is running on port " + PORT);
});