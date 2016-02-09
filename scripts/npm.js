const spawn = require('child_process').spawn;
const command = process.argv[2];

const client = spawn('npm', ['run', command], { cwd: './client' });
const server = spawn('npm', ['run', command], { cwd: './server' });

[client, server].forEach((p)=> {
  p.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  p.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  p.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
});
