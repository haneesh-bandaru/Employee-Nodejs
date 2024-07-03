const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 2000;

const db = require("./src/config/config");

const empRoutes = require("./src/routes/employee.routes");
const proRoutes = require("./src/routes/project.routes");
const login = require("./src/controllers/login");
const verifyToken = require("./src/middlewares/authMiddleware");

app.use(express.json());
app.use(cookie());
app.use(cors());
app.use("/protected", verifyToken);
app.use("/protected/employee", empRoutes);
app.use("/protected/project", proRoutes);
app.use("/", login);

app.get("/check", (req,res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
