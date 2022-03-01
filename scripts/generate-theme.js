const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const defaultVars = require('./default-vars.js')
const sortWeightRegs = [
  // less文件名计算权重用正则表达式数组，索引越大权重越高
  /.*\\mixin\.less/,
  /components\\style\\.*\.less/,
  /components\\style\\themes\\.*\.less/,
  /components\\style\\themes\\default\.less/,
  /components\\style\\themes\\index\.less/,
]

function generateThemeFileContent(theme) {
  return `const { ${theme}ThemeSingle } = require('./theme');\nconst defaultTheme = require('./default-theme');\n
module.exports = {
  ...defaultTheme,
  ...${theme}ThemeSingle
}`
}

// We need compile additional content for kdesign user
function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, '../lib'))) {
    // Build a entry less file to dist/kdesign.less
    const componentsPath = path.join(process.cwd(), 'components')
    let componentsLessContent = ''
    // Build components in one file: lib/style/components.less
    fs.readdir(componentsPath, (err, files) => {
      if (err) {
        throw new Error(err)
      }
      files.forEach((file) => {
        if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
          componentsLessContent += `@import "../${path.join(file, 'style', 'index.less')}";\n`
        }
      })
      fs.writeFileSync(path.join(process.cwd(), 'lib', 'style', 'components.less'), componentsLessContent)
    })
  }
}

function buildThemeFile(theme, vars) {
  // Build less entry file: dist/kdesign.${theme}.less
  if (theme !== 'default') {
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', `kdesign.${theme}.less`),
      `@import "../lib/style/${theme}.less";\n@import "../lib/style/components.less";`,
    )
    // eslint-disable-next-line no-console
    console.log(`Built a entry less file to dist/kdesign.${theme}.less`)
  } else {
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'default-theme.js'),
      `module.exports = ${JSON.stringify(vars, null, 2)};\n`,
    )
    return
  }

  // Build ${theme}.js: dist/${theme}-theme.js, for less-loader

  fs.writeFileSync(
    path.join(process.cwd(), 'dist', 'theme.js'),
    `const ${theme}ThemeSingle = ${JSON.stringify(vars, null, 2)};\n`,
    {
      flag: 'a',
    },
  )

  fs.writeFileSync(path.join(process.cwd(), 'dist', `${theme}-theme.js`), generateThemeFileContent(theme))

  // eslint-disable-next-line no-console
  console.log(`Built a ${theme} theme js file to dist/${theme}-theme.js`)
}

/**
 * 根据样式文件权重优先级排序样式文件顺序
 * @author wanhang_huang
 * @param {Array} lessFilePaths 所有less文件全路径名数组
 */
function sortLessFilesPaths(lessFilePaths) {
  const sortWeightArr = []
  lessFilePaths.forEach((lessFilePath) => {
    let sortWeight = -1
    sortWeightRegs.forEach((sortWeightReg, index) => {
      if (sortWeightReg.test(lessFilePath)) {
        sortWeight = index
      }
    })
    sortWeightArr.push({ lessFilePath, sortWeight })
  })
  sortWeightArr.sort((a, b) => {
    return b.sortWeight - a.sortWeight
  })
  return sortWeightArr
}
/**
 * 获取目标路径下的所有less文件路径(按文件名权重处理过顺序)
 * @author wanhang_huang
 * @param {string} targetPath 目标路径
 * @returns {Array} 目标路径下的所有less文件路径(按文件名权重处理过顺序)
 */
function getLessFilesPaths(targetPath) {
  const lessFilesPaths = []
  function findPathFile(filePath) {
    const files = fs.readdirSync(filePath)
    files.forEach(function (item, index) {
      const fPath = path.join(filePath, item)
      const stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        findPathFile(fPath)
      }
      if (stat.isFile() === true && path.extname(fPath) === '.less') {
        lessFilesPaths.push(fPath)
      }
    })
  }
  findPathFile(targetPath)
  return sortLessFilesPaths(lessFilesPaths)
}
/**
 * 将多个less文件整合写成一个完整的less文件
 * @author wanhang_huang
 * @param {Array} lessFilesPath 需要写到一起的less文件路径数组
 */
function writeCompleteLessFile(lessFilesPath) {
  let allLessContent = ''
  lessFilesPath.forEach((filePathObj) => {
    let data = fs.readFileSync(filePathObj.lessFilePath, 'utf-8')
    data = data.replace(/@import\s['"].*?['"];?/g, '')
    allLessContent += data + '\n'
  })
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'kdesign-complete.less'), allLessContent)
}

function finalizeDist() {
  const filesPath = getLessFilesPaths(path.join(process.cwd(), 'components'))
  writeCompleteLessFile(filesPath)
  if (fs.existsSync(path.join(__dirname, '../dist'))) {
    // Build less entry file: dist/kdesign.less
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'kdesign.less'),
      '@import "../lib/style/index.less";\n@import "../lib/style/components.less";',
    )
    // eslint-disable-next-line no-console
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'theme.js'),
      "const defaultTheme = require('./default-theme.js');\n",
    )
    // eslint-disable-next-line no-console
    console.log(chalk.blue('Built a entry less file to dist/kdesign.less'))
    buildThemeFile('default', defaultVars)
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'theme.js'),
      `
function getThemeVariables(options = {}) {
  let themeVar = {
    'hack': \`true;@import "\${require.resolve('kdesign/lib/style/color/colorPalette.less')}";\`,
    ...defaultTheme
  };
  return themeVar;
}

module.exports = {
  getThemeVariables
}`,
      {
        flag: 'a',
      },
    )

    console.log(chalk.blue('Built a theme js file to dist/theme.js'))
  }
}

module.exports = {
  finalizeCompile,
  finalizeDist,
  generateThemeFileContent,
}
