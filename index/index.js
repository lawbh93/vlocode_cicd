const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const branchname = core.getInput('branch-name');
  console.log(`Hello ${branchname}!`);
  core.setOutput("branchHead", branchname);
} catch (error) {
  core.setFailed(error.message);
}
