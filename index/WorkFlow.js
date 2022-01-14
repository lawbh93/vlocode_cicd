const core = require('@actions/core');
const github = require('@actions/github');

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
  /** datapackFilePath */
  const datapackFilePath = core.getInput('datapackFilePath');
  /** vlocityMetadata */
  const vlocityMetadata = core.getInput('vlocityMetadata');
  /** eventAction */
  const eventAction= core.getInput('eventAction');
  /** FilePathsJson */
  const FilePathsJson= core.getInput('FilePathsJson');

  core.setOutput("Destino", Destino);
  core.setOutput("Origen", Origen);
  core.setOutput("protectedBranches", protectedBranches);
  core.setOutput("username", username);
  core.setOutput("passToken", passToken);
  core.setOutput("client_id", client_id);  
  try {
    if(Destino) {
      /*Init */
      var execProcess = require("./exec_process.js");
      execProcess.result(`Destino=${Destino} Origen=${Origen} protectedBranches=${protectedBranches} username=${username} client_secret=${client_secret} client_id=${client_id} url=${url} passToken=${passToken} datapackFilePath=${datapackFilePath} vlocityMetadata=${vlocityMetadata} eventAction=${eventAction} FilePathsJson=${FilePathsJson} bash .sh/init.sh`, function(err, response) {
        if(!err){
            console.log(response);
        } else {
            console.log(err);
        }
      });
    /*Fin */
    }
  } catch (error) {
  core.setFailed(error.message);
}
