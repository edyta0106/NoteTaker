const express = require("express");
const api = require("./routes/api");
const html = require("./routes/html");

// Added additional PORT
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Any routes defined in a variable will prefix with / for html and /api for api
app.use("/", html);
app.use("/api", api);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
