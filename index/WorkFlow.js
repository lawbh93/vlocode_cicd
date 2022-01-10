const core = require('@actions/core');
const github = require('@actions/github');

try {
  /* Target Branch*/
  const Destino = core.getInput('Head_Branch');
  /* Origin Branch*/
  const Origen= core.getInput('Origin_Branch');
  /* Comma separated*/ 
  const protectedBranches = core.getInput('protectedBranches');
  /** username */
  const username = core.getInput('username');
  /** client_secret */
  const client_secret = core.getInput('client_secret');
  /** password */
  const passToken = core.getInput('passToken');
  /** client_id */
  const client_id = core.getInput('client_id');
  /** url */
  const url = core.getInput('url');

  /*username */
  
  console.log(`Rama Destino: ${Destino}`);
  console.log(`Rama Origen: ${Origen}`);
  console.log(`Ramas protegidas: ${protectedBranches}`);
  console.log(`username: ${username}`);
  console.log(`client_secret: ${client_secret}`);
  console.log(`passToken: ${passToken}`);
  console.log(`client_id: ${client_id}`);
  console.log(`url: ${url}`);

  core.setOutput("Destino", Destino);
  core.setOutput("Origen", Origen);
  core.setOutput("protectedBranches", protectedBranches);
  core.setOutput("username", username);
  core.setOutput("passToken", passToken);
  core.setOutput("client_id", client_id);

  if(Destino) {
    /*Init */
    var execProcess = require("./exec_process.js");
    execProcess.result(`Destino=${Destino} Origen=${Origen} protectedBranches=${protectedBranches} username=${username} client_secret=${client_secret} client_id=${client_id} url=${url} passToken=${passToken} bash .sh/init.sh`, function(err, response) {
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
