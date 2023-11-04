const spawner= require('child_process').spawn;
const data_to_pass_in='800';
console.log(data_to_pass_in)
const python_process= spawner('python',['./project.py',data_to_pass_in]);

python_process.stdout.on('data', (data)=>{
    console.log(data.toString())
});

// const { spawn } = require('child_process');
// const data_to_pass_in = ['900']; // Pass data as an array
// console.log(data_to_pass_in);

// const python_process = spawn('python', ['./project.py', JSON.stringify(data_to_pass_in)]);

// python_process.stdout.on('data', (data) => {
//     const result = JSON.parse(data.toString());
//     console.log(result);
// });

