const express = require("express");
const dotenv = require("dotenv");
const notes = require("../Data/Data");
const userRouter = require("../routes/UserRouter");
const noteRouter = require("../routes/noteRouter");
const connectiondb = require("../congif/db");
var cors = require("cors");
const { userAdd } = require("../controllers/userController");
const { patch } = require("../routes/UserRouter");
const path = require("path");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({ origin: "https://notezipperapi.onrender.com", credentials: true })
);

connectiondb();

const server = http.createServer(app, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

dotenv.config();

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });
app.post("/api", (req, res) => {
  res.json(notes);
});

app.use("/user", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Api running...");
});

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "frontend", "build", "index.html"),
//       function (err) {
//         res.status(500).send(err);
//       }
//     );
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Api running...");
//   });
// }

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

server.listen(PORT, console.log(`server Started to port ${PORT} `));
