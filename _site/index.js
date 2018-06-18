const {exec} = require('child_process');
exec('pwd', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`${stdout}`);
  console.log(`${stderr}`);
});
