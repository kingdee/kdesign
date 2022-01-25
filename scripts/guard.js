const chalk = require('chalk')

function gurad() {
  const npmArgv = process.env.npm_config_argv
  const PUB_ENV = process.env.PUB_ENV
  if (npmArgv && npmArgv.indexOf('--force') > 0) {
    // forbidden use `npm publish --force`
    console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'))
    console.log(chalk.bgRed('!!!!!this package cannot use --force for publish!!!!!'))
    console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'))
  } else if (npmArgv && npmArgv.indexOf('--no-np') > 0) {
    // not use `npm run np`
    console.log(chalk.bold.redBright('Warning: use `npm run pub` instead.'))
  } else if (PUB_ENV !== 'pub') {
    console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'))
    console.log(chalk.bgRed('!!!!!`npm publish` is forbidden for this package!!!!!'))
    console.log(chalk.bgRed('!!!!!Use `npm run pub` instead.                 !!!!!'))
    console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'))
    process.exit(1)
  }
}

gurad()
