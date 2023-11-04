const cors = require("cors");
const express = require("express");
var morgan = require("morgan");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
const child_process = require("child_process").spawn;
const PORT = 3001; // You can change this to any desired port

// app.use(express.static("public"));

app.get("/", (req, res) => res.send("<h1>Shaurya</h1>"));

app.get("/run-python-script", (req, res) => {
  const maxCalories = req.query.maxCalories;

  if (!maxCalories || maxCalories === "0") {
    res
      .status(400)
      .json({ error: "Please provide a valid number of calories." });
    return;
  }

  const pythonProcess = child_process("python", ["./project.py", maxCalories]);

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.json({ result: output }).end();
    } else {
      res
        .status(500)
        .json({ error: "Failed to execute the Python script." })
        .end();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
