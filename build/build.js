require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var swPrecache = require('sw-precache');
var DIST_DIR = 'dist';
var spinner = ora('building for production...')
spinner.start()



rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    writeServiceWorkerFile(DIST_DIR, true, () => {
      console.log('sw.js created')
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    });

  })
})

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: 'inverse',
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    // logger: $.util.log,
   
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /^https?:\/\/fonts\.gstatic\.com.*/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 12,
          name: 'runtime-cache1'
        }
      }
    }, {
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /^https?:\/\/fonts\.googleapis\.com.*/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 4,
          name: 'runtime-cache2'
        }
      }
    }, {
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /^https?:\/\/ajax\.googleapis\.com.*/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 2,
          name: 'runtime-cache3'
        }
      }
    },{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /^https?:\/\/www\.google-analytics\.com\/analytics\.js/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 1,
          name: 'runtime-cache4'
        }
      }
    }],
    staticFileGlobs: [
      rootDir + '/index.html',
      rootDir + '/static/**/**.*',
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'sw.js'), config, callback);
}
