const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://localhost:27017/contactkeeper", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Database connected"))
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = connectDB;
