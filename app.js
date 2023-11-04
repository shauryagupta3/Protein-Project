const spawner = require("child_process").spawn;
const data_to_pass_in = "800";
console.log(data_to_pass_in);
const python_process = spawner("python", ["./project.py", data_to_pass_in]);

python_process.stdout.on("data", (data) => {
  console.log(data.toString());
});
