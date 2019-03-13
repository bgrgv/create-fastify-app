'use strict'

const log = require('../../lib/log')
const path = require('path')
const inquirer = require('inquirer')
const { generatePlugin } = require('./generator')
const {
  stop,
  parseArgs,
  isValidFastifyProject,
  readFile
} = require('../../lib/utils')

async function showHelp () {
  const file = await readFile(path.join(__dirname, '..', '..', 'help', 'usage.txt'), 'utf8')
  log('info', file)
  return module.exports.stop()
}

async function generate (args, cb) {
  let opts = parseArgs(args)
  if (opts.help) {
    return showHelp()
  }

  const dir = opts.directory || process.cwd()
  const pluginPath = path.join(dir, 'app', 'plugins')

  try {
    await isValidFastifyProject(dir, null)
  } catch (e) {
    return cb(e)
  }

  const prompt = inquirer.createPromptModule()
  const answers = await prompt([{
    type: 'checkbox',
    name: 'methods',
    message: 'What methods do you want to enable for cors',
    choices: [
      {
        name: 'DELETE',
        checked: true
      },
      {
        name: 'GET',
        checked: true
      },
      'HEAD',
      'PATCH',
      {
        name: 'POST',
        checked: true
      },
      {
        name: 'PUT',
        checked: true
      },
      'OPTIONS'
    ],
    validate: answers => {
      if (answers.length < 1) {
        return 'You must choose at least one method.'
      }
      return true
    }
  }])

  try {
    await generatePlugin(pluginPath, answers)
  } catch (e) {
    return cb(e)
  }

  log('success', 'CORS plugin correctly configured with given information')
}

function cli (args) {
  generate(args, module.exports.stop)
}

module.exports = { cli, stop, generate }
