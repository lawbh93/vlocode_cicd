const core = require('@actions/core');
const github = require('@actions/github');

try {
  /* Target Branch*/
  const Destino = core.getInput('Head_Branch');
  /* Origin Branch*/
  const Origen= core.getInput('Origin_Branch');
  /* Comma separated*/ 
  const protectedBranches = core.getInput('protectedBranches');
  
  console.log(`Rama Destino: ${Destino}`);
  console.log(`Rama Origen: ${Origen}`);
  console.log(`Ramas protegidas: ${protectedBranches}`);
  core.setOutput("Destino", Destino);
  core.setOutput("Origen", Origen);
  core.setOutput("protectedBranches", protectedBranches);
  if(Destino) {
    /*Init */
    var execProcess = require("./exec_process.js");
    execProcess.result(`Destino=${Destino} Origen=${Origen} protectedBranches=${protectedBranches} bash .sh/init.sh`, function(err, response){
        if(!err){
            console.log(response);
        }else {
            console.log(err);
        }
    });
    

    /*Fin */

  }

} catch (error) {
  core.setFailed(error.message);
}
