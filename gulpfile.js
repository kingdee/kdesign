const path = require('path')
const gulp = require('gulp')
const through2 = require('through2')
const merge2 = require('merge2')
const stripCode = require('gulp-strip-code')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const tsDefaultReporter = ts.reporter.defaultReporter()
const cloneDeep = require('lodash/cloneDeep')

const { finalizeCompile } = require('./scripts/generate-theme')
const babelBaseConfig = require('./babel.config')
const tsConfig = require('./tsconfig.json')
const transformLess = require('./scripts/transformLess')
const rimraf = require('rimraf')
const libDir = path.join(__dirname, './lib')
const esDir = path.join(__dirname, './es')

function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css')
}

function babelify(js, modules) {
  const babelConfig = cloneDeep(babelBaseConfig)
  babelConfig.presets[0] = ['@babel/preset-env', {}] // bisheng官网使用@babel/plugin, 组件库使用@babel/runtime
  babelConfig.plugins[0] = ['@babel/plugin-transform-runtime', { corejs: 3 }]
  if (modules === false) {
    babelConfig.presets[0] = ['@babel/preset-env', { modules: false }]
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone())
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding)
        if (content.indexOf("'react-native'") !== -1) {
          next()
          return
        }

        file.contents = Buffer.from(cssInjection(content))
        file.path = file.path.replace(/index\.js/, 'css.js')
        this.push(file)
        next()
      } else {
        next()
      }
    }),
  )
  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      }),
    )
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir))
}

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir)
  const assets = gulp.src(['components/**/*.@(png|svg|woff|css)']).pipe(gulp.dest(modules === false ? esDir : libDir))
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone())
        if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
          transformLess(file.path)
            .then((css) => {
              file.contents = Buffer.from(css)
              file.path = file.path.replace(/\.less$/, '.css')
              this.push(file)
              next()
            })
            .catch((e) => {
              console.error(e)
            })
        } else {
          next()
        }
      }),
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir))
  let error = 0
  const source = [
    'components/**/*.tsx',
    'components/**/*.ts',
    'components/**/*.js',
    'typings/**/*.d.ts',
    '!components/**/__tests__/**',
  ]
  // allow jsx file in components/xxx/
  if (tsConfig.compilerOptions && tsConfig.compilerOptions.allowJs) {
    source.unshift('components/**/*.jsx')
  }
  const tsResult = gulp.src(source).pipe(
    ts(tsConfig.compilerOptions, {
      error(e) {
        tsDefaultReporter.error(e)
        error = 1
      },
      finish: tsDefaultReporter.finish,
    }),
  )

  function check() {
    // eslint-disable-next-line no-undef
    if (error && !argv['ignore-error']) {
      process.exit(1)
    }
  }

  tsResult.on('finish', check)
  tsResult.on('end', check)
  const tsFilesStream = babelify(tsResult.js, modules)
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir))
  return merge2([less, tsFilesStream, tsd, assets])
}

gulp.task('compile-with-es', (done) => {
  console.log('[Parallel] Compile to es...')
  compile(false).on('finish', done)
})

gulp.task('compile-with-lib', (done) => {
  console.log('[Parallel] Compile to js...')
  compile().on('finish', done)
})

gulp.task('compile-finalize', (done) => {
  finalizeCompile()
  done()
})

gulp.task('compile', gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib'), 'compile-finalize'))
