const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//requires function and executing it at the same time
require("./routing/html-routes.js")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/progressive-budget-db", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Mongodb connected")
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
    });
});