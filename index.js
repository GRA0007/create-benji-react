#!/usr/bin/env node
const { execSync } = require('child_process')

const TEMPLATE_REPO = 'https://github.com/GRA0007/benjis-react-template.git'

// Passed in name of new project
const name = process.argv[2]

// Run a bash command
const run = (cmd, showOutput = false, inFolder = true) => {
  try {
    execSync(cmd, {
      cwd: inFolder ? `./${name}` : '.',
      stdio: showOutput ? 'inherit' : 'pipe'
    })
  } catch (e) {
    console.error(`Error occurred when running ${cmd}`, e)
    process.exit(-1)
  }
}

// Clone the repo
console.log(`Making ${name} from the template...`)
run(`git clone --depth 1 ${TEMPLATE_REPO} ${name}`, true, false)
run(`rm -rf .git`)

// Update package.json
console.log(`\nInstalling dependencies...`)
run(`sed -i '' 's/benjis-react-template/${name}/' package.json`)
run(`yarn upgrade --latest`, true)

// Setup a new repo
run(`git init`)
run(`git add .`)
run(`git commit -m "Setup repo from template"`)

console.log(`\nYour project has been created!\nRun \`yarn start\` to start the development server`)
