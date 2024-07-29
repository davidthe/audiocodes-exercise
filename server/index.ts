const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const reportRoutes = require("./routes/reportRoutes");
const fileRoutes = require("./routes/fileRoutes");
const verifyToken = require("./middleware/authMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api/users", userRoutes);
app.use("/api/data", verifyToken, dataRoutes);
app.use("/api/report", verifyToken, reportRoutes);
app.use("/api/file", verifyToken, fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;