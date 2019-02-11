const exec = require('child_process').exec;

async function run() {
  // const advisor = await exec('node ./file2db/advisor.js', function(error, stdout, stderr){
  //   console.log('stdout: ' + stdout);
  //   console.log('stderr: ' + stderr);
  //   if( error !== null){
  //     console.log('exec error: ' + error);
  //   }
  // });
  // const bounty = await exec('node ./file2db/bounty.js', function(error, stdout, stderr){
  //   console.log('stdout: ' + stdout);
  //   console.log('stderr: ' + stderr);
  //   if( error !== null){
  //     console.log('exec error: ' + error);
  //   }
  // });
  const fuzex_airdrop = await exec('node ./file2db/fuzex_airdrop.js', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
run();