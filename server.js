const express = require("express");
const connectDB = require("./db");
const errorHandler = require("./middlewares/errorHandler");
const auth = require("./routes/auth");
const contact = require("./routes/contact");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/contacts", contact);

app.use(errorHandler);

app.listen(5000, console.log("The server started at port 5000"));
