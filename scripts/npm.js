const spawn = require('child_process').spawn;
const target = process.argv[3];
const baseCommand = process.argv[4] === 'install' ? [] : ['run'];
const commands = baseCommand.concat(process.argv.slice(4));

const spawned = spawn('npm', commands, { cwd: `./${target}` });

spawned.stdout.on('data', (data) => {
  process.stdout.write(data);
});

spawned.stderr.on('data', (data) => {
  process.stderr.write(data);
});

spawned.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});
