const express = require("express");
const morgan = require("morgan");

const taskRoutes = require("./routes/tasks.routes");
const app = express();
const port = 3000;

app.listen(port);

app.use(morgan("dev"));
app.use(express.json());

app.use(taskRoutes);

console.log(`server on port ${port}`);
